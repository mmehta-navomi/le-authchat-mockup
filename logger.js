'use strict'

const rTracer = require('cls-rtracer')
// that how you can configure winston logger
const winston = require('winston');
const { combine, timestamp, printf, align, colorize} = winston.format

// a custom format that outputs request id
const rTracerFormat = printf(({ service, level, message, timestamp }) => {
  const rid = rTracer.id()
  return rid
    ? `${level}:  ${service}: ${timestamp}: [request-id:${rid}]:  ${message}`
    : `${level}:  ${service}: ${timestamp}: ${message}`
})

const logger = winston.createLogger({
  defaultMeta: {
        service: 'Testing-Service-Name',
    },
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align()
  ),
  transports: [
    new winston.transports.Console({
            level: 'info',
            handleExceptions: true,
            format: combine(rTracerFormat),
        }),
    // Add Stackdriver Logging
    // loggingWinston,
  ],
});

// Log example:
// info:  2020-05-14 18:00:05: [request-id:44b5d250-962e-11ea-9ae2-3f05add9edf7]:  	Starting request handling
// now let's configure and start the Express app

const express = require('express')

const app = express()
app.use(rTracer.expressMiddleware())

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
  logger.info(`Environment: ${process.env.NODE_ENV}`)
  logger.info('The app is listening on 3000')
})
