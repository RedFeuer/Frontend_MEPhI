import { OldLogger } from "./OldLogger.js";
import { LoggerAdapter } from "./LoggerAdapter.js";
export function demoAdapter() {
    console.log("=== Adapter ===");
    const legacyLogger = new OldLogger();
    const logger = new LoggerAdapter(legacyLogger);
    logger.log("Сообщение через адаптер");
}
