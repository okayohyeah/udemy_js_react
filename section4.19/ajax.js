// use fetch API by using fetch() function
	// fetch defaults to make GET requests
	// make fetch call with fetch() function 
		// with URL as API endppoint
fetch('https://api.github.com/users/okayohyeah')
	// this fetch creates a PROMISE that is pending
		// while this PROMISE is pending, call "then".
		// when PROMISE is resolved, call the function
.then(function(r) {  // passes in 'r', response object specific to fetch call
	// 'r', response object has specific features such as: 
		// status, json, url property
	// take response and convert it into JSON
	return r.json(); 
	//response object has json method which returns JSON object from API
})
//when above promise is fullfilled, it will print out result of the previous function. anything returned from above function will be passed in as the paramater 'j' in this "then"
.then(function(j) {
	console.log(j);
});