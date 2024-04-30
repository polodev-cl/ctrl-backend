import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@modules/user/entities/user.entity';
import { AxiosService } from './axios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService, AxiosService],
  controllers: [UserController]
})
export class UserModule {}
