import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import {  CanActivate,  } from '@nestjs/common';
import { log } from 'console';
import { request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Guard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('it did not work');
    }
    return user;
  }
}


@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private jwt:JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    // Implement your custom logic here, e.g., checking headers, tokens, etc.
    // For example, if using JWT:
    
    const token = data.token || client.handshake?.headers?.authorization;
    console.log();
    if (token && token.startsWith('Bearer')) {
      const greg = token.split(" ")[1]
      
    const emax= this.jwt.verify(greg, {
        secret:"123456"
      })
      request["user"]=emax
      return true; // or false if verification fails
    }

    return false  
  }
}


@Injectable()
export class controllerGurd extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
