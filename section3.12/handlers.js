// EVENTS and CALLBACKS

// add event listener to button with id = one
//listener waits for 'click' event, and once triggered, calls function (the callback) in second parameter
document.getElementById('one').addEventListener('click', function() {
	console.log('you clicked the button!');
});


document.getElementById('two').addEventListener('mouseover', function() {
	// change button text when mouseover
	document.getElementById('two').innerText = "you hovered over me!";
});



// CUSTOM EVENT
// add event listener to body
// listener waits for custom event called timeEvent, which calls a function called stateTime
document.body.addEventListener('timeEvent', stateTime);

// passes in an event object called 'e'
// in this case will take in our custom event, myEvent
function stateTime(e) {
	// alerts some data about e
	alert("event time is: " + e.detail);
}

// Custom Event Object - special JS objects for custom events
// called timeEvent
let myEvent = new CustomEvent('timeEvent', {
	// has data with property called 'detail' which consists of the current date and time
	'detail': new Date()
});

// TO RUN THIS, the body has to dispatch the event
// In console: document.body.dispatchEvent(myEvent);