import type { IUser } from "./interfaces.js";

export class User implements IUser {
  public name: string;
  public age: number;

  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public hello(): void {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}