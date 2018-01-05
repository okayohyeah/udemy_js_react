var rovers_by_cameras = {
	curiosity: [
		{name: "fhaz", full_name: "Front Hazard Avoidance Camera"},
		{name: "rhaz", full_name: "Rear Hazard Avoidance Camera"},
		{name: "mast", full_name: "Mast Camera"},
		{name: "chemcam", full_name: "Chemistry and Camera Complex"},
		{name: "mahli", full_name: "Mars Hand Lens Imager"},
		{name: "mardi", full_name: "Mars Descent Imager"},
		{name: "navcam", full_name: "Navigation Camera"}
	],
	opportunity: [
		{name: "fhaz", full_name: "Front Hazard Avoidance Camera"},
		{name: "rhaz", full_name: "Rear Hazard Avoidance Camera"}, 
		{name: "navcam", full_name: "Navigation Camera"},
		{name: "pancam", full_name: "Panoramic Camera"},
		{name: "minites", full_name: "Miniature Thermal Emission Sepectrometer"}
	],
	spirit: [
		{name: "fhaz", full_name: "Front Hazard Avoidance Camera"},
		{name: "rhaz", full_name: "Rear Hazard Avoidance Camera"}, 
		{name: "navcam", full_name: "Navigation Camera"},
		{name: "pancam", full_name: "Panoramic Camera"},
		{name: "minites", full_name: "Miniature Thermal Emission Sepectrometer"}
	]
}

function changeCameras(value) {
	if (value.length == 0) {
		document.getElementById("camera").innerHTML = "<option></option>";
	} else {
		var cameraOptions = "";
		for (camera_id in rovers_by_cameras[value]) {
			cameraOptions += "<option value='" + rovers_by_cameras[value][camera_id].name + 
			"' id='user_camera_name'>"+ rovers_by_cameras[value][camera_id].full_name + "</option>"
		}
		document.getElementById("camera").innerHTML = cameraOptions;
	}
}

function getUserChoice() {
	var rover = document.getElementById("user_rover_name").value;
	var camera = document.getElementById("user_camera_name").value;

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

