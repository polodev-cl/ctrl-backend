import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserQueryDto } from "./dto/user-query.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AxiosService } from "./axios.service";

@Controller("user")
export class UserController {
  constructor(private readonly _userService: UserService, private readonly axiosService: AxiosService) {}

  @Get()
  public async list(@Query() query: UserQueryDto) {
    return await this._userService.list(query);
  }
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this._userService.create(createUserDto);
    const lambdaResponse = await this.axiosService.createUser({
      id: newUser.id,
      nombres: newUser.nombres,
      email: newUser.email,
    });
    const updateUserDto: UpdateUserDto = {
      rut: newUser.rut,
      cognito_id: lambdaResponse.userId
    };
    await this._userService.update(newUser.id, updateUserDto);
    return {
      message: "User successfully created and Cognito ID updated",
      userId: lambdaResponse.userId,
      temporaryPassword: lambdaResponse.temporaryPassword
    };
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
