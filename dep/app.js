// ====================
//  OLD APPLICATION, NOT IN USE
// ====================

// Temporary ugly solution to determine next weekend
var weekends = [
				'2016-12-02','2016-12-09','2016-12-16','2016-12-23',
				'2016-12-30','2017-01-06','2017-01-13','2017-01-20',
				'2017-01-27','2017-02-03','2017-02-10','2017-02-17',
				'2017-02-24','2017-03-03','2017-03-10','2017-03-17',
				'2017-03-24','2017-03-31','2017-04-07','2017-04-14',
				'2017-04-21','2017-04-28','2017-05-05','2017-05-12',
				'2017-05-19','2017-05-26','2017-06-02','2017-06-09',
				'2017-06-16','2017-06-23','2017-06-30','2017-07-07',
				'2017-07-14','2017-07-21','2017-07-28','2017-08-04',
				'2017-08-11','2017-08-18','2017-08-25','2017-09-01',
				'2017-09-08','2017-09-15','2017-09-22','2017-09-29',
				'2017-10-06','2017-10-13','2017-10-20','2017-10-27',
				'2017-11-03','2017-11-10','2017-11-17','2017-11-24',
				'2017-12-01','2017-12-08','2017-12-15','2017-12-22',
				'2017-12-29','2018-01-05','2018-01-12','2018-01-19',
				];

var timeZone, nextWeekend, goalTime;	
var today = new Date();

// Set time zone immediately, no need to re use function after page load
(function setTimeZone() {
	var offset = (today.getTimezoneOffset())/60; // -1
	var sign = Math.sign(offset * -1) > 0 ? '+' : '-';
	var offsetHours = ('0' + offset).slice(-2);
	timeZone = sign + offsetHours + ':00';
}());




//  Check if Weekend

var isFridayNight = false;
var is weekend

function fridayNightCheck() {
	if (today.getDay() ===  5 && today.getHours() >= 17) {
		isFridayNight = true;
	}
}

function weekendCheck() {
	if (today.getDay() === 6 || today.getDay() === 0 || isFridayNight) {
		switchToWeekendMode();
	}
}

function switchToWeekendMode() {
	document.getElementById('body').style.backgroundImage = 'url(Images/party-2.jpg)';
	document.getElementById('timer').style.display = 'none';
	document.getElementById('wknd').style.display = 'block';
}


// See if friday night
fridayNightCheck()
// If weekend switch to weekend mode
weekendCheck();




// Determine Countdown Time

function setWeekend() {
	for (var i = 0; i < weekends.length; i++) {
		var w = weekends[i]+ 'T17:00:00' + timeZone;
		console.log(w);
		
		if( Date.parse(today) <= Date.parse(w) ) {
			nextWeekend = weekends[i];
			break;
		}
	}
	
}

// Creates date string to use in countdown
function setGoalTime(nextWeekend, timeZone) {
	goalTime = nextWeekend + 'T17:00:00' + (timeZone ? timeZone : '');
}

setWeekend();
setGoalTime(nextWeekend, timeZone);

// Determine countdown from goal time
function getCount(goal) {

	var t = (Date.parse(goal) - Date.parse(new Date())) / 1000;
	var seconds = Math.floor(t % 60);
	var minutes = Math.floor((t/60) % 60);
	var hours = Math.floor((t/(60*60)));
	
	console.log('Hours: ' + hours)

	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	}
}




// Initialize Clock

(function initClock(goal) {

	var displayHours = document.getElementById('hours'),
		displayMinutes = document.getElementById('minutes'),
		displaySeconds = document.getElementById('seconds');

	var timeInterval = setInterval(function() {		
		
		var t = getCount(goal);
		
		displayHours.innerHTML = t.hours;
		displayMinutes.innerHTML = t.minutes;
		displaySeconds.innerHTML = t.seconds;
		
		// Remove hours when < 1
		if (t.hours <= 0) {
			displayHours.style.display = 'none';
			document.getElementById('hours-text').style.display = 'none';
		}
		
		// Remove minutes when < 1
		if (t.hours <= 0 && t.minutes <=0) {
			displayMinutes.style.display = 'none';
			document.getElementById('minutes-text').style.display = 'none';
		}
		
		// When goal time is reached
		if (t.total <= 0) {				
			clearInterval(timeInterval);				
			switchToWeekendMode();
		}		
		
	},1000); 
}(goalTime));