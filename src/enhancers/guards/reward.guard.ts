import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class RewardGuard implements CanActivate {
  private cachedEmployees: number[] = []; // use something like redis for cache, but it's long

  constructor() { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp().getRequest<{ body: { employeeId: number } }>();
    const { employeeId } = ctx.body;

    const isRewardAlreadyGiven = this.cachedEmployees.some(id => id === employeeId);
    this.cachedEmployees.push(employeeId);

    return !isRewardAlreadyGiven;
  }
}