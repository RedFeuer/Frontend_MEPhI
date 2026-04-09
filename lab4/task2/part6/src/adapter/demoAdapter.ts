import type { ILogger } from "./ILogger.js";
import { OldLogger } from "./OldLogger.js";
import { LoggerAdapter } from "./LoggerAdapter.js";

export function demoAdapter(): void {
  console.log("=== Adapter ===");

  const legacyLogger: OldLogger = new OldLogger();
  const logger: ILogger = new LoggerAdapter(legacyLogger);

  logger.log("Сообщение через адаптер");
}