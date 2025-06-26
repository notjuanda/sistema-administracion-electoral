import { Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: any) {
    this.logger.log('JwtAuthGuard.canActivate called');
    this.logger.log(`Request URL: ${context.switchToHttp().getRequest().url}`);
    this.logger.log(`Request method: ${context.switchToHttp().getRequest().method}`);
    
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    this.logger.log(`Authorization header: ${authHeader ? 'Present' : 'Missing'}`);
    
    if (authHeader) {
      this.logger.log(`Token: ${authHeader.substring(0, 20)}...`);
    }
    
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    this.logger.log('JwtAuthGuard.handleRequest called');
    this.logger.log(`Error: ${err ? JSON.stringify(err) : 'None'}`);
    this.logger.log(`User: ${user ? JSON.stringify(user) : 'None'}`);
    this.logger.log(`Info: ${info ? JSON.stringify(info) : 'None'}`);
    
    if (err || !user) {
      this.logger.error('JWT authentication failed');
      throw err || new Error('Unauthorized');
    }
    
    this.logger.log('JWT authentication successful');
    return user;
  }
} 