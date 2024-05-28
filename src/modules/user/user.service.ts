import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }                                 from '@nestjs/typeorm';

import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { randomBytes }                                from 'crypto';
import * as aws                                       from 'aws-sdk';

import { AxiosService }  from './axios.service';
import { UserEntity }    from './entities/user.entity';
import { UserQueryDto }  from './dto/user-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private cognito = new aws.CognitoIdentityServiceProvider;

  constructor(
    @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
    private readonly axiosService: AxiosService,
  ) {
    this.cognito = new aws.CognitoIdentityServiceProvider({
      apiVersion: '2016-04-18',
      region: process.env.REGION,
    });
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
    console.log(`createUserDto: ${ JSON.stringify(createUserDto) }`);


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

      const tempPassword = this.generatePassword();
      const createUserParams = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: createdUser.email,
        TemporaryPassword: tempPassword,
        UserAttributes: [
          {Name: 'custom:id', Value: createdUser.id.toString()},
          {Name: 'custom:nombres', Value: `${ createdUser.nombres } ${ createdUser.apellidos }`},
          {Name: 'email', Value: createdUser.email},
          {Name: 'email_verified', Value: 'true'}
        ],
        MessageAction: 'SUPPRESS'
      };

      let createUserResult;

      try {
        createUserResult = await this.cognito.adminCreateUser(createUserParams).promise();
      } catch (error) {
        console.error('Error al crear usuario en cognito:', error);
        throw error;
      }
      createdUser.cognito_id = createUserResult.User.Username;
      createdUser.contrasena = tempPassword;

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

  private generatePassword() {
    return randomBytes(8).toString('base64').slice(0, 12) + 'A1!';
  }
}
