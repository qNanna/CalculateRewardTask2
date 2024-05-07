import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: join(
          process.cwd(),
          configService.get<string>('DATABASE') ?? 'database.db',
        ),
        synchronize: false,
        entities: [],
      }),
      dataSourceFactory: async (options) =>
        await new DataSource(options).initialize(),
    }),
  ],
})
export class DatabaseModule {}
