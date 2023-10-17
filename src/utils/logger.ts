import pino from 'pino';


export type LoggerOptions = pino.LoggerOptions;


export class Logger {
    constructor(pinoLoggerOrOptions: pino.Logger | LoggerOptions, path?: string) {
        if (pinoLoggerOrOptions.constructor.name === 'Pino') {
            this.logger = pinoLoggerOrOptions as pino.Logger;
        } else {
            this.logger = pino(pinoLoggerOrOptions, pino.destination(path));
        }
    }


    // ----- [ PRIVATE PROPERTIES ] ------------------------------------------------------------------------------------

    private readonly logger: pino.Logger;


    // ----- [ PUBLIC METHODS ] ----------------------------------------------------------------------------------------

    public getBaseLogger(): Readonly<pino.Logger> {
        return this.logger;
    }

    public trace(msg: string, data: object = {}): void {
        this.logger.trace(data, msg);
    }

    public debug(msg: string, data: object = {}): void {
        this.logger.debug(data, msg);
    }

    public info(msg: string, data: object = {}): void {
        this.logger.info(data, msg);
    }

    public warn(msg: string, data: object = {}): void {
        this.logger.warn(data, msg);
    }

    public error(msg: string, data: object = {}): void {
        this.logger.error(data, msg);
    }

    public fatal(msg: string, data: object = {}): void {
        this.logger.fatal(data, msg);
    }

    public child(bindings: pino.Bindings, options?: { level?: pino.LevelWithSilent }): Logger {
        return new Logger(this.logger.child(bindings, options));
    }
}


export const logger = new Logger(
    {
        level: process.env.LOGGING_LEVEL,
        base: {},
        timestamp: true,
        nestedKey: 'data',
        formatters: {
            level: (label: string) => ({level: label}),
        },
    },
    process.env.LOG_FILE_PATH,
);
