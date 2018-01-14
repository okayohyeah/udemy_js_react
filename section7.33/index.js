var cameras_by_rovers = {

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

// Camera Select Drop Down List 
function changeCameras(value) {

	if (value.length == 0) {
		document.getElementById("camera").innerHTML = "<option></option>";
	} else {
		var cameraOptions = "<option value='' disabled selected required>Select Camera</option>";
		for (camera_id in cameras_by_rovers[value]) {
			cameraOptions += "<option value='" + cameras_by_rovers[value][camera_id].name + 
			"' >"+ cameras_by_rovers[value][camera_id].full_name + "</option>"
		}
		document.getElementById("camera").innerHTML = cameraOptions;
	}
}

var isValid;
var user_rover;
var user_camera;
var user_sol;

function validateChoices() {

	isValid = true;
	user_rover = document.getElementById("rover").value;
	user_camera = document.getElementById("camera").value;
	user_sol = document.getElementById("sol").value;

	if (user_rover == "") {
		document.getElementById("rover-warning").innerText = "Please Select a Rover";
		return isValid = false;
	} else {
		document.getElementById("rover-warning").innerText = "";
	}

	if (user_camera == "") {
		document.getElementById("camera-warning").innerText = "Please Select a Camera";
		return isValid = false;
	} else {
		document.getElementById("camera-warning").innerText = "";
	}

	if (user_sol == "") {
		document.getElementById("sol-warning").innerText = "Please Enter a Number";
		return isValid = false;
	} else {
		document.getElementById("sol-warning").innerText = "";
	}

	if (user_rover !== "" && user_camera !== "" && user_sol !== "") {
		document.getElementById("rover-warning").innerText = "";
		document.getElementById("camera-warning").innerText = "";
		document.getElementById("sol-warning").innerText = "";
		return isValid = true;
	}
}

function getUserChoice() {

	 // Validation - User Selection and Input 
  validateChoices();

  if (isValid == true) {
		fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/" + user_rover + "/photos?sol=" + user_sol + "&camera=" + user_camera + "&api_key=b3nTdX2bbNt2aCfKTy3y4elLcQxT5wPIfEMSrJ6T")
		//DEMO_KEY

		.then(response_obj => {
				if (response_obj.status === 200) {
					return response_obj.json();
				} else if (response_obj === 400) {
					document.getElementById("results").innerText = "Sorry, we sent a bad request to the server. Please, try again.";
				} else if (response_obj === 500) {
					document.getElementById("results").innerText = "Sorry, the server is having problems and cannot complete our request. Please, try again."
				}
		})
		.then(obj => {
			// check object returned
			console.log(obj);
			// Find first photo's image source from response
			image_source = obj.photos[0].img_src;

			// Create img element with image source set
			displayPic(image_source);
		})
	}
}

var image_source;
var display_image;

function displayPic(source) {
	display_image = document.createElement("img");
	display_image.setAttribute("src", source);
	display_image.setAttribute("id", "f-icon");
	display_image.setAttribute("width", "15%");
	display_image.setAttribute("height", "15%");
	display_image.setAttribute("alt", "Mars Photo");
	display_image.setAttribute("hspace", "1%");
	document.getElementById("results").appendChild(display_image);
}

