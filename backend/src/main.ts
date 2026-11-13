import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {

    const COOKIE_SECRET = process.env.COOKIE_SECRET;
    const APP_PORT = process.env.APP_PORT;

    const app = await NestFactory.create(AppModule, {
        cookies: {
            secret: COOKIE_SECRET,
        },
    });

    const configService = app.get(ConfigService);

    app.enableShutdownHooks();

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    app.use(cookieParser(COOKIE_SECRET));

    await app.listen(Number(APP_PORT));

}

await bootstrap();
