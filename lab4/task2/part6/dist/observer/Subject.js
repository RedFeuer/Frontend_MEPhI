export class Subject {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
    }
    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}
