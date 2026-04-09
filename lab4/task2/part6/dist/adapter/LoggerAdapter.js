export class LoggerAdapter {
    constructor(oldLogger) {
        this.oldLogger = oldLogger;
    }
    log(message) {
        this.oldLogger.writeToConsole(message);
    }
}
