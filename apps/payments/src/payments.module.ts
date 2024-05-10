import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import {
  LoggerModule,
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PAYMENTS_GRPC_URL: Joi.string().required(),
        NOTIFICATIONS_GRPC_URL: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            protoPath: join(__dirname, '../../../proto/notifications.proto'),
            package: NOTIFICATIONS_PACKAGE_NAME,
            url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
