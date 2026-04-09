import { NewsChannel } from "./NewsChannel.js";
import { Subject } from "./Subject.js";
export function demoObserver() {
    console.log("=== Observer ===");
    const subject = new Subject();
    const channel1 = new NewsChannel("Канал 1");
    const channel2 = new NewsChannel("Канал 2");
    subject.subscribe(channel1);
    subject.subscribe(channel2);
    subject.notify("Новая статья опубликована");
    subject.unsubscribe(channel1);
    subject.notify("Вышло срочное обновление");
}
