import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Setting } from './entity/setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Setting])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
