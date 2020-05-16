const winston = require('winston');

// Imports the Google Cloud client library for Winston
const {LoggingWinston} = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();


//Message Format style
const customFormat = pritf(
  ({ level, message, label, timestamp, accountId, user, chatId, admin }) => {
        // set undefined cariables as NA
        accountId = accountId ? accountId : 'NA';
        conversationId = conversationId ? conversationId : 'NA';

        /* Example: logger.info(`${req.method} ${req.url}`, {admin: true, accountId: '9876'});*/
            let objReturn = `{timestamp: ${timestamp}, accountId: ${accountId}, conversationId: ${conversationId}, message: ${message}, level: ${level}}`;

        // return `{timestamp: ${timestamp}, level: ${level}, message: ${message}}`;
        return objReturn;
    }
);


// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
const logger = winston.createLogger({
  defaultMeta: {
    service: '<SERVICE NAME>',
  },
  format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        // winston.format.printf(
        //     (info) => `${info.message} ${info.level} ${info.timestamp}`
        // ),
        format.json()
    ),
  transports: [
    new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
        format: combine(customFormat),
    }),
    // Add Stackdriver Logging
    loggingWinston,
  ],
});


// Writes some log entries
logger.error('warp nacelles offline');
logger.info('shields at 99%');
