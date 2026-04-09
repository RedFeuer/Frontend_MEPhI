import { CardPayment } from "./CardPayment.js";
import { CashPayment } from "./CashPayment.js";
import { PaymentContext } from "./PaymentContext.js";

export function demoStrategy(): void {
  console.log("=== Strategy ===");

  const context: PaymentContext = new PaymentContext(new CardPayment());

  context.executePayment(1500);
  context.setStrategy(new CashPayment());
  context.executePayment(700);
}