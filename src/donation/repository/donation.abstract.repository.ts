import { DonationEntity } from "../domain/donation.entity";

export abstract class IDonationRepository {
  abstract getOneTimeReward(data: DonationEntity): Promise<Record<string, number>>;
}
