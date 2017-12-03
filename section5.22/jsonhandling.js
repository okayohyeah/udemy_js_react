function getUsername() {
	var input_username = document.getElementById("input_username").value;
	fetch("http://api.github.com/users/" + input_username)
	.then(function(response_obj) {
		return response_obj.json();
	})
	.then(function(obj) {
		console.log(obj);
		document.getElementById("username").innerText = "Username: " + obj.login;
		document.getElementById("pic").src = obj.avatar_url;
		document.getElementById("name").innerText = "Name: " +obj.name;

		if (obj.location !== null) {
			document.getElementById("location").innerText = "Lives in: " + obj.location;
		} else {
			document.getElementById("location").innerText = "Lives in space";
		}

		if (obj.followers > 1) {
			document.getElementById("followers").innerText = obj.followers + " followers.";
		} else if (obj.followers == 1) {
			document.getElementById("followers").innerText = obj.followers + " follower.";
		} else {
			document.getElementById("followers").innerText = "No followers";
		}
		
		if (obj.following > 1) {
			document.getElementById("following").innerText = "Following " + obj.following + " users.";
		} else if (obj.following == 1) {
			document.getElementById("following").innerText = "Following " + obj.following + " user.";
		} else {
			document.getElementById("followers").innerText = "Not following any users.";
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
		console.log(obj);
	})
}

function showFollowing(url) {
	fetch(url)
	.then(function(show_obj) {
		return show_obj.json();
	})
	.then(function(obj) {
		obj.forEach(function(item,index) {
				var avatar = document.createElement("img");
				avatar.setAttribute("src", obj[index].avatar_url);
				avatar.setAttribute("width", "6%");
				avatar.setAttribute("height", "6%");
				avatar.setAttribute("alt", "Avatar");
				avatar.setAttribute("hspace", "1%");
				document.getElementById("following_avatar").appendChild(avatar);
		});
	})
}


