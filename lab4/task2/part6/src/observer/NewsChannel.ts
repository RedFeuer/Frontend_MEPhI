import type { Observer } from "./Observer.js";

export class NewsChannel implements Observer {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public update(message: string): void {
    console.log(`${this.name} получил сообщение: ${message}`);
  }
}