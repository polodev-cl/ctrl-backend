import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserQueryDto } from "./dto/user-query.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  public async list(@Query() query: UserQueryDto) {
    return await this._userService.list(query);
  }
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this._userService.create(createUserDto);
  }

  @Patch(":id")
  public async update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this._userService.update(id, updateUserDto);
  }

  @Delete(":id")
  public async delete(@Param("id") id: number) {
    return await this._userService.delete(id);
  }
}
