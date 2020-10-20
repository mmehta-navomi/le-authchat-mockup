const CronJob = require('cron').CronJob;
console.log('Before job instantiation');

let job = new CronJob(
	'* * * * * *',
	function() {
		init()
		// job.stop();
	},
	null,
	false
	// ,'America/New_York'
);
console.log('After job instantiation');

// Use this if the 4th param is default value(false)
job.start();
console.log(`job ran lasttime = ${job.lastDate()}`);
console.log(`job ran nextime = ${job.nextDates()}`);
function init(){
	console.log("init funciton fires");
	init2()
}
function init2(){
	console.log("init2 function fires");
	// console.log(`job ran lasttime = ${job.lastDate()}`);
	// console.log(`job ran nextime = ${job.nextDates()}`);
	console.log("Job stop");
	// job.stop();
	process.exit(0);
}
