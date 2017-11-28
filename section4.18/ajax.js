// create XMLHttpRequest Object
let a = new XMLHttpRequest();

// add event listener to this object and listen for 'readystatechange' event
	// 'readystatechange' is event specific to AJAX requests
		// it listens to response of an api call
			// when api call is run, it triggers the 'readystatechange' event listener 
			// the state change occurs for 'a', 
				// we get 'r', the actual event object
	// add callback function that passes in 'r', the captured event 
a.addEventListener('readystatechange', function(r) {
	//get status of that captured event object 
	if (r.target.status === 200) {    // when status is successful
		// when you get an event object captured in an event listener, you do '.target' to get the actual object captured by that event
		console.log(r.target.response); // we get JSON as a response
	}
});

// make an API call to following url
a.open('GET', 'https://api.github.com/users/okayohyeah', true);
// sends API call
a.send();