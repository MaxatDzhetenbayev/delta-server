import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const token = request.cookies['token']
            
            if(!token)   throw new UnauthorizedException({
                message: 'Пользователь не авторизован'
            })
            request.hasToken = token; 

            return true;
        }
        catch (e) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован'
            })
        }
    }
}