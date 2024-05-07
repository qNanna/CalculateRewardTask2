import { Body, Controller, Post, Param, UseGuards } from '@nestjs/common';

import { AddDonationService } from '../application/donation.service';
import { AddDonationDto } from './dto/add-donation.input.dto';

@Controller('donation')
export class AddDonationController {
  constructor(private readonly donationService: AddDonationService) {}

  @Post('/')
  async addDonation(@Body() data: AddDonationDto) {
    return this.donationService.addDonation(data);
  }
}
