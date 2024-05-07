import { Injectable } from '@nestjs/common';

import { DonationEntity } from '../domain/donation.entity';
import { IDonationRepository } from '../repository/donation.abstract.repository';

@Injectable()
export class AddDonationService {
  constructor(private readonly repository: IDonationRepository) {}

  async addDonation(data: DonationEntity) {
    const donation = new DonationEntity(data);

    return await this.repository.getOneTimeReward(donation);
  }
}
