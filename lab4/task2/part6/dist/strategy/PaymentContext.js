export class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    executePayment(amount) {
        this.strategy.pay(amount);
    }
}
