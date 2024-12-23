import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { User, UserSchema } from './entities/users.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: User.name, schema: UserSchema }, // a model and User.name. in this case, name of UserDocument registered (UserDocument.name). because we mix file User schema and User Entity in one file
    ]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
