import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity }                                       from './entities/user.entity';
import { Equal, FindOptionsWhere, ILike, Repository }       from 'typeorm';
import { UserQueryDto }                                     from './dto/user-query.dto';
import { InjectRepository }                                 from '@nestjs/typeorm';
import { UpdateUserDto }                                    from './dto/update-user.dto';
import { CreateUserDto }                                    from './dto/create-user.dto';
import { AxiosService }                                     from './axios.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>,
    private readonly axiosService: AxiosService,

  ) {}

  public async list(queryParams?: UserQueryDto) {
    const whereFilter: FindOptionsWhere<UserEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    if (queryParams.activo !== undefined) whereFilter["activo"] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter["id"] = Equal(queryParams.id);

    console.log(whereFilter);

    return await this._userRepository.find({
      where: whereFilter,
      relations: ["empresa"]  
  });
  }

  public async create(createUserDto: CreateUserDto) {
    const count = await this._userRepository.count({ where: [{ rut: createUserDto.rut }, { email: createUserDto.email }] });

    if (count > 0)
      throw new ConflictException(`Usuario ya existe para el rut ${createUserDto.rut}, o para el correo ${createUserDto.email}.`);

    const createdUser = await this._userRepository.save(createUserDto); // Save to get the created ID key

    const lambdaResponse = await this.axiosService.createUser({
      id: createdUser.id,
      nombres: createdUser.nombres + ' ' + createdUser.apellidos,
      email: createdUser.email,
    });

    createdUser.cognito_id = lambdaResponse.userId;
    createdUser.contrasena = lambdaResponse.temporaryPassword;

    await this._userRepository.save(createdUser);

    return {
      id: createdUser.id,
      temporaryPassword: createdUser.contrasena,
      cognitoId: createdUser.cognito_id,
      nombres: createdUser.nombres + ' ' + createdUser.apellidos
    };
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this._userRepository.update(id, updateUserDto);
  }

  public async delete(id: number) {
    return await this._userRepository.softDelete(id);
  }

  public async getUserByCognitoId(cognitoId: string) {
    const user = await this._userRepository.findOne({
        where: { cognito_id: cognitoId },
        relations: ["empresa"] // Carga la relación con la empresa
    });

    if (!user) {
        throw new NotFoundException(`Usuario con ID ${cognitoId} no encontrado.`);
    }

    return user;
}


}
