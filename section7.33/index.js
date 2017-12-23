function getUserChoice() {
	var rover = document.getElementById("user_rover_name").value;
	var camera = document.getElementById("user_camera_name").value;
	var sol = document.getElementById("user_sol").value;

	fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&camera=" + camera + "&api_key=DEMO_KE")
	.then(response => {
			if (response.status === 200) {
				return response.json();
			} else {
				var error = new Error(response.statusText || response.status);
				error.response = response;
				throw error;
			}
	})
	.then( obj => {
		// check object returned
		console.log(obj);
		// TODO: DO something with object
	})
}

