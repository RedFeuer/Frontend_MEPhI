export class NewsChannel {
    constructor(name) {
        this.name = name;
    }
    update(message) {
        console.log(`${this.name} получил сообщение: ${message}`);
    }
}
