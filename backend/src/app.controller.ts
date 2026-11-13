import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
} from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller('users')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('get/as{*test}sa/donwload')
    getHello(@Param('test') test: string[]) {
        return {
            wildcard: test,
        };
    }

    @Post('new')
    createUser(@Req() request: Request) {
        return;
    }
}
