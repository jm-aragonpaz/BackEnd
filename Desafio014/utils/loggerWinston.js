// const { winston, createLogger, format, transports } = require('winston');
const winston = require('winston');

const logger = () => {
    const logger = winston.createLogger({
        level: 'warn',
        transports: [
            new winston.transports.Console({ level: 'verbose' }),
            new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        ],
        // format: format.combine(
        //     format.simple(),
        //     format.timestamp(),
        //     format.printf((info) => `[${info.timestamp} ${info.level} ${info.mesagge}]`)
        // ),
        // transports: [
        //     new winston.transports.Console({ level: 'info' }),
        //     new transports.File({ filename: 'dataLogger/warn.log', level: 'warn' }),
        //     new transports.File({ filename: 'dataLogger/error.log', level: 'error' }),
        // ],
    });
    return logger;
};
module.exports = logger();
