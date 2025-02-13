import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
        user: configService.getOrThrow<string>('MONGO_USER'),
        pass: configService.getOrThrow<string>('MONGO_PWD'),
        dbName: configService.getOrThrow<string>('MONGO_DB_NAME'),
      }),
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);
  onModuleInit() {
    this.logger.verbose(`✅ Server on Port: ${process.env.PORT ?? 3000}`);
    this.logger.verbose('✅ Conectado a MongoDB correctamente');
  }
}
