function getUsername() {
	var input_username = document.getElementById("input_username").value;
	fetch("http://api.github.com/users/" + input_username)
	.then(function(response_obj) {
		return response_obj.json();
	})
	.then(function(obj) {

		// check object returned
		console.log(obj);
		if (obj.name !== null) {
			document.getElementById("name").innerText = obj.name;
		} else {
			document.getElementById("name").innerText = "A user has no name";
		}
		
		document.getElementById("username").innerText = obj.login;
		document.getElementById("pic").src = obj.avatar_url;

		document.getElementById("fill-icon").setAttribute("d", "M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z");

		if (obj.location !== null) {
			document.getElementById("location").innerText = obj.location;
		} else {
			document.getElementById("location").innerText =  "Space";
		}
		
		if (obj.followers > 1) {
			document.getElementById("followers").innerText = obj.followers + " followers";
		} else if (obj.followers == 1) {
			document.getElementById("followers").innerText = obj.followers + " follower";
		} else {
			document.getElementById("followers").innerText = "No followers";
		}
		
		if (obj.following > 1) {
			document.getElementById("following").innerText = "Following " + obj.following + " users";
		} else if (obj.following == 1) {
			document.getElementById("following").innerText = "Following " + obj.following + " user";
		} else {
			document.getElementById("followers").innerText = "Not following any users";
		}

		getFollowers(obj.followers_url);
	  showFollowers(obj.followers_url);
		
		var  url = obj.following_url;
		var trim_url = url.replace("{/other_user}", "");
		getFollowing(trim_url);
		showFollowing(trim_url);
	})
}

function getFollowers(url) {
	fetch(url)
	.then(function(followers_obj) {
		return followers_obj.json();
	})
	.then(function(obj) {

		//check obj returned
		console.log(obj);
	})
}

function showFollowers(url) {
	fetch(url)
	.then(function(show_obj) {
		return show_obj.json();
	})
	.then(function(obj) {
		obj.forEach(function(item,index) {
				var avatar = document.createElement("img");
				avatar.setAttribute("src", obj[index].avatar_url);
				avatar.setAttribute("id", "f-icon");
				avatar.setAttribute("width", "6%");
				avatar.setAttribute("height", "6%");
				avatar.setAttribute("alt", "Avatar");
				avatar.setAttribute("hspace", "1%");
				document.getElementById("followers_avatar").appendChild(avatar);
		});
	})
}

function getFollowing(url) {
	fetch(url)
	.then(function(following_obj) {
		return following_obj.json();
	})
	.then(function(obj) {

		// check for obj returned
		console.log(obj);
	})
}

function showFollowing(url) {
	fetch(url)
	.then(function(show_obj) {
		// check for obj returned
		return show_obj.json();
	})
	.then(function(obj) {
		obj.forEach(function(item,index) {
				var avatar = document.createElement("img");
				avatar.setAttribute("src", obj[index].avatar_url);
				avatar.setAttribute("id", "f-icon");
				avatar.setAttribute("width", "6%");
				avatar.setAttribute("height", "6%");
				avatar.setAttribute("alt", "Avatar");
				avatar.setAttribute("hspace", "1%");
				document.getElementById("following_avatar").appendChild(avatar);
		});
	})
}


