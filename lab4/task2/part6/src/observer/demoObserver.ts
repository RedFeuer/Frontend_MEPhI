import { NewsChannel } from "./NewsChannel.js";
import { Subject } from "./Subject.js";

export function demoObserver(): void {
  console.log("=== Observer ===");

  const subject: Subject = new Subject();

  const channel1: NewsChannel = new NewsChannel("Канал 1");
  const channel2: NewsChannel = new NewsChannel("Канал 2");

  subject.subscribe(channel1);
  subject.subscribe(channel2);

  subject.notify("Новая статья опубликована");

  subject.unsubscribe(channel1);

  subject.notify("Вышло срочное обновление");
}