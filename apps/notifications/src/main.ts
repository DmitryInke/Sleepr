import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      package: NOTIFICATIONS_PACKAGE_NAME,
      url: configService.get('NOTIFICATIONS_GRPC_URL'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
