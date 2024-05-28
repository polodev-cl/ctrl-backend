import { ConflictException, GatewayTimeoutException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                                                  from '@nestjs/typeorm';

import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { AxiosService }  from './axios.service';
import { UserEntity }    from './entities/user.entity';
import { UserQueryDto }  from './dto/user-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
    private readonly axiosService: AxiosService
  ) {
    this.logger = new Logger(UserService.name);
  }

  public async list(queryParams?: UserQueryDto) {
    const whereFilter: FindOptionsWhere<UserEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${ queryParams[key] }%`);
      return acc;
    }, {});

    if (queryParams.activo !== undefined) whereFilter['activo'] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter['id'] = Equal(queryParams.id);

    return await this._userRepository.find({
      where: whereFilter,
      relations: [ 'empresa' ],
    });
  }

  public async create(createUserDto: CreateUserDto) {
    this.logger.log(`createUserDto: ${ JSON.stringify(createUserDto) }`);


    const queryRunner = this._userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const count = await queryRunner.manager.count(UserEntity, {
        where: [ {rut: createUserDto.rut}, {email: createUserDto.email} ],
      });

      if (count > 0) {
        throw new ConflictException(`Usuario ya existe para el rut ${ createUserDto.rut }, o para el correo ${ createUserDto.email }.`);
      }

      const createdUser = await queryRunner.manager.save(UserEntity, createUserDto);

      const lambdaResponse = await this.axiosService
        .createUser({
          id: createdUser.id,
          nombres: createdUser.nombres + ' ' + createdUser.apellidos,
          email: createdUser.email,
        })
        .then((response) => response.data)
        .catch((error) => {
          this.logger.error('Lambda createUser failed.', JSON.stringify(error));
          throw new GatewayTimeoutException('Error al crear el usuario en cognito, usuario no se ha guardado.');
        });

      this.logger.log(`Usuario creado en cognito con id ${ lambdaResponse.userId } y contraseña temporal ${ lambdaResponse.temporaryPassword }.`);

      createdUser.cognito_id = lambdaResponse.userId;
      createdUser.contrasena = lambdaResponse.temporaryPassword;

      await queryRunner.manager.save(UserEntity, createdUser);

      await queryRunner.commitTransaction();

      return {
        id: createdUser.id,
        temporaryPassword: createdUser.contrasena,
        cognitoId: createdUser.cognito_id,
        nombres: createdUser.nombres + ' ' + createdUser.apellidos,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this._userRepository.update(id, updateUserDto);
  }

  public async delete(id: number) {
    return await this._userRepository.softDelete(id);
  }

  public async getUserByCognitoId(cognitoId: string) {
    const user = await this._userRepository.findOne({
      where: {cognito_id: cognitoId},
      relations: [ 'empresa' ],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${ cognitoId } no encontrado.`);
    }

    return user;
  }
}
