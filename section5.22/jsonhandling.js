fetch("https://api.github.com/users/okayohyeah")
	.then(function(response_obj) {
		return response_obj.json();
	})
	.then(function(print_obj) {
		console.log(print_obj);
		document.getElementById("username").innerText = print_obj.login;
		document.getElementById("pic").src = print_obj.avatar_url;
		document.getElementById("name").innerText = print_obj.name;
		document.getElementById("location").innerText = print_obj.location;
		let followers = print_obj.followers_url;
		console.log(followers);
		return followers;
	});


