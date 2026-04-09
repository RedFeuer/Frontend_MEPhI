import type { PaymentStrategy } from "./PaymentStrategy.js";

export class CardPayment implements PaymentStrategy {
  public pay(amount: number): void {
    console.log(`Оплата картой: ${amount} рублей`);
  }
}