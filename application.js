// Check if weekend

var today = new Date();
var isWeekend = false;

function switchToWeekendMode() {
	document.getElementById('body').style.backgroundImage = 'url(Images/party-2.jpg)';
	document.getElementById('timer').style.display = 'none';
	document.getElementById('wknd').style.display = 'block';
}

function weekendCheck() {
	
	//check if sat/sun
	if (today.getDay() === 6 || today.getDay() === 0) {
		isWeekend = true;
	}
	
	//check if friday after 5pm
	if (today.getDay() ===  5 && today.getHours() >= 17) {
		isWeekend = true;
	}	
	
	if (isWeekend) {
		switchToWeekendMode();
	}
	
}

weekendCheck();



// If not weekend, determine goal time

var goal = new Date();

goal.setDate(goal.getDate() + (5 - goal.getDay()));
goal.setHours(17);
goal.setMinutes(0);
goal.setSeconds(0);
goal.setMilliseconds(0);



// Determine countdown from goal time

function getCount(goal) {

	var t = (Date.parse(goal) - Date.parse(new Date())) / 1000;
	var seconds = Math.floor(t % 60);
	var minutes = Math.floor((t/60) % 60);
	var hours = Math.floor((t/(60*60)));

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
}(goal));