import { Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: any) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new Error('Unauthorized');
    }
    if (user.rol !== 'admin_elecciones' && user.rol !== 'super_admin') {
      throw new Error('Forbidden: Solo los administradores de elecciones pueden acceder a este recurso');
    }
    return user;
  }
}

@Injectable()
export class PadronAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || user.rol !== 'admin_padron') {
      throw new Error('Forbidden: Solo los administradores de padrón pueden acceder a este recurso');
    }
    return true;
  }
} 