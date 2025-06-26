import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    
    this.logger.log('JwtStrategy initialized');
    this.logger.log(`JWT_SECRET configured: ${configService.get<string>('JWT_SECRET') ? 'YES' : 'NO'}`);
  }

  async validate(payload: any) {
    this.logger.log('JWT validation started');
    this.logger.log(`Payload received: ${JSON.stringify(payload)}`);
    
    const user = { userId: payload.sub, rol: payload.rol };
    this.logger.log(`User extracted: ${JSON.stringify(user)}`);
    
    return user;
  }
} 