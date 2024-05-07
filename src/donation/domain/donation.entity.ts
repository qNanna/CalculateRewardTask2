export class DonationEntity {
  readonly employeeId: number;
  readonly amount: number;
  readonly currency?: string;
  readonly date: string;

  constructor(data: DonationEntity) {
    this.employeeId = data.employeeId;
    this.amount = data.amount;
    this.currency = data.currency;
    this.date = data.date;
  }
}
