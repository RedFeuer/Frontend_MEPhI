import type { ILogger } from "./ILogger.js";
import { OldLogger } from "./OldLogger.js";

export class LoggerAdapter implements ILogger {
  private oldLogger: OldLogger;

  public constructor(oldLogger: OldLogger) {
    this.oldLogger = oldLogger;
  }

  public log(message: string): void {
    this.oldLogger.writeToConsole(message);
  }
}