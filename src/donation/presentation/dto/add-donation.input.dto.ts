import { IsNumber, IsString, IsIn, IsOptional } from 'class-validator';

export class AddDonationDto {
  @IsNumber()
  readonly employeeId: number;

  @IsNumber()
  readonly amount: number;

  @IsString()
  @IsOptional()
  @IsIn(['USD', 'EUR', 'AUD', 'GBP'])
  readonly currency?: string; // For feature with rates

  @IsOptional()
  readonly date: string;

  constructor() {
    this.date = new Date().toDateString();
  }
}
