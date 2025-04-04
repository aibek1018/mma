import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FighterModule } from './fighter/fighter.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RankingModule } from './ranking/ranking.module';
import { EventModule } from './event/event.module';
import { FightModule } from './fight/fight.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    FighterModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME') as string,
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: false,
        migrations: ['src/migrations/*.ts'],  // Указываем путь к миграциям
        cli: {
          migrationsDir: 'src/migrations',  // Папка для миграций
        },
      }),
      inject: [ConfigService],
    }),
    RankingModule,
    EventModule,
    FightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
