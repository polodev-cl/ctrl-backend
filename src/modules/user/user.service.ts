import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { Equal, FindOptionsWhere, ILike, Repository } from "typeorm";
import { UserQueryDto } from "./dto/user-query.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly _userRepository: Repository<UserEntity>) {}

  public async list(queryParams?: UserQueryDto) {
    const whereFilter: FindOptionsWhere<UserEntity> = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) acc[key] = ILike(`%${queryParams[key]}%`);
      return acc;
    }, {});

    if (queryParams.activo !== undefined) whereFilter["activo"] = Equal(queryParams.activo);
    if (queryParams.id) whereFilter["id"] = Equal(queryParams.id);

    console.log(whereFilter);

    return await this._userRepository.find({ where: whereFilter });
  }

  public async create(createUserDto: CreateUserDto) {
    return await this._userRepository.save(createUserDto);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this._userRepository.update(id, updateUserDto);
  }

  public async delete(id: number) {
    return await this._userRepository.softDelete(id);
  }
}
