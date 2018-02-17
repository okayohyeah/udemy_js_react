// trigger button click event with enter key clicked in input textbox 
document.getElementById("search_box")
	.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById("button_id").click();
		}
	});

var isValid;
var input_username;

function usernameEntered() {
	isValid = true;
	input_username = document.getElementById("search_box").value;

	if (input_username == "") {
		document.getElementById("warning").innerText = "Please enter a GitHub username";
		return isValid = false;
	} else {
		document.getElementById("warning").innerText = "";
		return isValid = true;
	}
}

function clearPage() {
  document.getElementById("pic").setAttribute("src", "");
  document.getElementById("name").innerText = "";
  document.getElementById("username").innerText = "";
  document.getElementById("fill-icon").setAttribute("d", "");
  document.getElementById("location").innerText = "";
  document.getElementById("followers").innerText = "";
  document.getElementById("followers_avatar").innerText = "";
  document.getElementById("following").innerText = "";
  document.getElementById("following_avatar").innerText = "";
}

function getUsername() {

	usernameEntered();

	if (isValid == true) {
    // Show Loading Gif
    document.getElementById("loader").style = "display: inline";

    clearPage();
	 
		fetch("https://api.github.com/users/" + input_username)
		.then(function(response_obj) {
			return response_obj.json();
		})
		.then(function(obj) {		
        if (obj.message == "Not Found") {
        //Hide Loading Gif
        document.getElementById("loader").style = "display: none";
        document.getElementById("warning").innerText = "Sorry, user not found. Try again.";
      } else {
        //Hide Loading Gif
        document.getElementById("loader").style = "display: none";
  			
        document.getElementById("pic").src = obj.avatar_url;
  			document.getElementById("a_pic").setAttribute("href", "http://www.github.com/" + obj.login);
  			document.getElementById("username").innerText = "@" +obj.login;
  			
  			if (obj.name !== null) {
  				document.getElementById("name").innerText = obj.name;
  			} else {
  				document.getElementById("name").innerText = "A user has no name";
  			}

  			// creates location icon
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
  			} else if (obj.followers == 0) {
  				document.getElementById("followers").innerText = "No followers";
  			}
  			
  			if (obj.following > 1) {
  				document.getElementById("following").innerText = "Following " + obj.following + " users";
  			} else if (obj.following == 1) {
  				document.getElementById("following").innerText = "Following " + obj.following + " user";
  			} else if (obj.following == 0) {
  				document.getElementById("following").innerText = "Not following any users";
  			}

  			getFollowers(obj.followers_url);
  		  showFollowers(obj.followers_url);
  			
  			var  url = obj.following_url;
  			var trim_url = url.replace("{/other_user}", "");
  			getFollowing(trim_url);
  			showFollowing(trim_url);
      }
		
		})
	}
}

function getFollowers(url) {
	fetch(url)
	.then(function(followers_obj) {
		return followers_obj.json();
	})
	.then(function(obj) {
	})
}

function showFollowers(url) {
	fetch(url)
	.then(function(show_obj) {
		return show_obj.json();
	})
	.then(function(obj) {
		// clear follower avatars from previous search
		document.getElementById("followers_avatar").innerText = "";
		obj.forEach(function(item,index) {
			var span = document.createElement("span");
			span.innerHTML = '<a href="http://www.github.com/'+ obj[index].login + '" target="_blank">' + '<img src="' + obj[index].avatar_url + '" id="f-icon" width=6% height=6% alt="follower avatar" hspace=1%/>';
			document.getElementById("followers_avatar").appendChild(span);

		});
	})
}

function getFollowing(url) {
	fetch(url)
	.then(function(following_obj) {
		return following_obj.json();
	})
	.then(function(obj) {
	})
}

function showFollowing(url) {
	fetch(url)
	.then(function(show_obj) {
		return show_obj.json();
	})
	.then(function(obj) {
		// clear following avatars from previous search
		document.getElementById("following_avatar").innerText = "";
		obj.forEach(function(item,index) {
			var span = document.createElement("span");
			span.innerHTML = '<a href="http://www.github.com/'+ obj[index].login + '" target="_blank">' + '<img src="' + obj[index].avatar_url + '" id="f-icon" width=6% height=6% alt="follower avatar" hspace=1%/>';
			document.getElementById("following_avatar").appendChild(span);
		});
	})
}


