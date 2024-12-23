import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  //whatever is returned automatically from validate function will be attached in "user" property of request
  //so after validate function executed, we always have "user" info in request
  async validate(email: string, password: string) {
    try {
      return this.userService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
