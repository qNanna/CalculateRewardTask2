import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { join } from 'path';

import { DonationModule } from './donation/donation.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    DonationModule,
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class AppModule {}
