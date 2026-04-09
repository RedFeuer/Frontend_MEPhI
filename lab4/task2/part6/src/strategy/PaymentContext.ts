import type { PaymentStrategy } from "./PaymentStrategy.js";

export class PaymentContext {
  private strategy: PaymentStrategy;

  public constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  public executePayment(amount: number): void {
    this.strategy.pay(amount);
  }
}