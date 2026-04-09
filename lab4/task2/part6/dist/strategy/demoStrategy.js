import { CardPayment } from "./CardPayment.js";
import { CashPayment } from "./CashPayment.js";
import { PaymentContext } from "./PaymentContext.js";
export function demoStrategy() {
    console.log("=== Strategy ===");
    const context = new PaymentContext(new CardPayment());
    context.executePayment(1500);
    context.setStrategy(new CashPayment());
    context.executePayment(700);
}
