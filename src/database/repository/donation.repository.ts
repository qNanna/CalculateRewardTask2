import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { IDonationRepository } from '../../donation/repository/donation.abstract.repository';

@Injectable()
export class DonationRepository implements IDonationRepository {
  private cashPool: number = 10_000;
  private total: number = 1_000; // Start from 1000 for example
  private cachedEmployees: Map<number, boolean> = new Map(); // Caching here for example

  constructor(private repository: DataSource) {}

  async getOneTimeReward(data: { employeeId: number; amount: number; }) {
    const { employeeId, amount } = data;

    const isRewardAlreadyGiven = this.cachedEmployees.get(employeeId)

    const [queryResult] = await this.repository.query<{ reward: number; }[]>(
      `
      SELECT
        employee_id AS employeeId,
        amount AS donation,
        (amount * 100.0 / total_donations) AS percent,
        CASE WHEN amount >= 100 THEN
          CASE WHEN (cash_pool * ((amount * 100.0 / total_donations) / 100)) >= cash_pool
            THEN cash_pool 
            ELSE cash_pool * ((amount * 100.0 / total_donations) / 100) END	
        ELSE 0
        END AS reward
      FROM (
        SELECT
          id AS employee_id,
          ? AS amount,
          ? AS total_donations,
          ? AS cash_pool
        FROM Employee
        GROUP BY employee_id
      )
      WHERE employee_id = ?
    `,
      [amount, this.total, this.cashPool, employeeId],
    );

    if (!isRewardAlreadyGiven) {
      this.cashPool -= queryResult.reward;
      this.cachedEmployees.set(employeeId, true)
    }

    this.total += data.amount;

    return { ...queryResult, total: this.total, pool: this.cashPool, reward: isRewardAlreadyGiven ? 0 : queryResult.reward };
  }
}
