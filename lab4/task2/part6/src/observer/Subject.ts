import type { Observer } from "./Observer.js";

export class Subject {
  private observers: Observer[];

  public constructor() {
    this.observers = [];
  }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(
      (currentObserver: Observer) => currentObserver !== observer
    );
  }

  public notify(message: string): void {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}