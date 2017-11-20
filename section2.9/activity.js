// Find a DOM Node

//function takes in an attribute and value
function getElementsByAttribute(attribute, value) {
	// get all elements in the DOM
	let all = document.getElementsByTagName('*');
	// initialize array called found
	let found = [];

	// loop through all of the elements
	for (let i = 0; i < all.length; i++) {
		// for each element in there
		element = all[i];
		// check if getAttribute has the particular attribute in getElementsByAttribute, and if does it will equal the value
		if (all[i].getAttribute(attribute) === value) {
			// if it is true, it pushes it in the found array
			found.push(all[i]);
		}		
	}
	return found;
}

//when test in Console
	//getElementsByAttribute('class', 'header')				// [h1.header]
	//getElementsByAttribute('category', 'feature')		//(2) [li, li]