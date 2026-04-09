import type { PaymentStrategy } from "./PaymentStrategy.js";

export class CashPayment implements PaymentStrategy {
  public pay(amount: number): void {
    console.log(`Оплата наличными: ${amount} рублей`);
  }
}