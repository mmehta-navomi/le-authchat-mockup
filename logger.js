'use strict'

// const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(
    ({ level, message, accountId, datapoint, converationId }) => {

        const logObject = {
          converationId :converationId,
          accountId :accountId,
          datapoint :datapoint,
        }
        // set undefined cariables as NA
        accountId = accountId ? accountId : 'NA';
        user = user ? user : 'NA';
        chatId = chatId ? chatId : 'NA';

        /* Example: logger.info(`${req.method} ${req.url}`, {admin: true, accountId: '9876'});*/
        if (admin) {
            var objReturn = `{timestamp: ${timestamp}, accountId: ${accountId}, user: ${user}, message: [ADMIN] ${message}, level: ${level}}`;
        } else {
            var objReturn = `{timestamp: ${timestamp}, chatId: ${chatId}, accountId: ${accountId}, user: ${user}, message: ${message}, level: ${level}}`;
        }

        // return `{timestamp: ${timestamp}, level: ${level}, message: ${message}}`;
        return objReturn;
    }
);

const logger = createLogger({
    // level: 'debug',
    defaultMeta: {
        service: 'navomi-fileshare-widget',
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
        new transports.Console({
            level: 'info',
            handleExceptions: true,
            format: combine(myFormat),
        }),
    ],
});

// Log example:
// info:  2020-05-14 18:00:05: [request-id:44b5d250-962e-11ea-9ae2-3f05add9edf7]:  	Starting request handling
// now let's configure and start the Express app

const express = require('express')

const app = express()

app.get('/', function (req, res) {
  logger.info('info level log')
  logger.error('error level log')
  logger.warn('warn level log')
  fakeDbAccess()
    .then((result) => res.json(result))
})

async function fakeDbAccess () {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      logger.info('Logs from fakeDbAccess')
      resolve({ message: 'Hello from cls-rtracer Express example' })
    }, 0)
  })
}

app.listen(3000, (err) => {
  if (err) {
    logger.err('The app could not start')
  }
  logger.info('The app is listening on 3000')
})
