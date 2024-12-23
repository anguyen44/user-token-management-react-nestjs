import { AuthGuard } from '@nestjs/passport';
//AuthGuard is a helper function of passport to take in a strategy that LocalAuthGuard will use

export class LocalAuthGuard extends AuthGuard('local') {}
