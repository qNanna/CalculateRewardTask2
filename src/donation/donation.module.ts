import { Module } from '@nestjs/common';

import { AddDonationController } from './presentation/donation.controller';
import { AddDonationService } from './application/donation.service';
import { IDonationRepository } from './repository/donation.abstract.repository';
import { DonationRepository } from '../database/repository/donation.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AddDonationController],
  providers: [
    AddDonationService,
    { provide: IDonationRepository, useClass: DonationRepository },
  ],
})
export class DonationModule {}
