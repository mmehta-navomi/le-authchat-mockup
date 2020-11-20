const moment = require('moment');
const luxon = require('luxon');
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');
const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(utc)
dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)
dayjs.extend(dayOfYear)


console.log("=========JS Date Object================")
const currentDate = new Date();
const currentDateMilliseconds = currentDate.getTime();
console.log(`currentDate = ${currentDate}`);
console.log(`currentDate milliseconds  = ${currentDateMilliseconds}`);


// Dayjs
console.log('')
console.log("===========dayjs=================")
console.log(`Now = ${dayjs()}`);
console.log(`Current Time millisecond = ${dayjs().millisecond()}`);
console.log(`Current Time second = ${dayjs().second()}`);
console.log(`Current Time minute = ${dayjs().minute()}`);
console.log(`Current Time date of month = ${dayjs().date()}`);
console.log(`Current Time day of week = ${dayjs().day()}`);
console.log(`Current Time hour = ${dayjs().hour()}`);
console.log(`Current Time month = ${dayjs().month()}`);
console.log(`Current Time year = ${dayjs().year()}`);
console.log(`Current Time UTC Format = ${dayjs().utc().format()}`);
console.log(`Current Time Local Format = ${dayjs().format()}`);
console.log(`Current Time Local Custom Format = ${dayjs().format('MM-DD-YYYY_HH:MM:ss')}`);
console.log(`Current Time isoWeek  = ${dayjs().isoWeekday()}`);
console.log(`Current Time dayOfYear  = ${dayjs().dayOfYear()}`);
console.log(`1604079479205 Display Format MM/DD/YYY = ${dayjs(1604079479205).format('MM/DD/YYYY')}`);
console.log(`1604079479205 Display Format MM/DD/YYY HH/mm/ss 24hrs = ${dayjs(1604079479205).format('MM/DD/YYYY HH:MM:ss')}`);
console.log(`1604079479205 Display Format MM/DD/YYY hh/mm/ss 12hrs = ${dayjs(1604079479205).format('MM/DD/YYYY hh:mm:ss A a')}`);
