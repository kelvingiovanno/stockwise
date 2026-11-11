import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    handleRequest(err: any, user: any, info: any) {

        console.log('handle request');

        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

    getRequest(context: ExecutionContext) {
        console.log('get request');
        return context.switchToHttp().getRequest();
    }

    getResponse(context: ExecutionContext) {
        console.log('get response');
        return "sad";
    }

}