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

// Validations
function validateChoices() {

	isValid = true;
	user_rover = document.getElementById("rover").value;
	user_camera = document.getElementById("camera").value;
	user_sol = document.getElementById("sol").value;

	if (user_rover == "") {
		document.getElementById("rover-warning").innerText = "* Please Select a Rover";
		return isValid = false;
	} else {
		document.getElementById("rover-warning").innerText = "";
	}

	if (user_camera == "") {
		document.getElementById("camera-warning").innerText = "* Please Select a Camera";
		return isValid = false;
	} else {
		document.getElementById("camera-warning").innerText = "";
	}

	if (user_sol == "") {
		document.getElementById("sol-warning").innerText = "* Please Enter a Number";
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

var image_source;
var display_image;
var img_key;
var i = 0;

// Process user input
function getUserChoice() {

	 // Validation - User Selection and Input 
  validateChoices();

  if (isValid == true) {
    // Show Loading Gif
    document.getElementById("loader").style = "display: inline";
		
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/" + user_rover + "/photos?sol=" + user_sol + "&camera=" + user_camera + "&api_key=b3nTdX2bbNt2aCfKTy3y4elLcQxT5wPIfEMSrJ6T")
		//DEMO_KEY

		.then(response_obj => {
				if (response_obj.status === 200) {
          //Hide Loading Gif
          document.getElementById("loader").style = "display: none";
					return response_obj.json();
				} else if (response_obj === 400) {
					document.getElementById("message").innerText = "Sorry, we sent a bad request to the server. Please, try again.";
				} else if (response_obj === 500) {
					document.getElementById("message").innerText = "Sorry, the server is having problems and cannot complete our request. Please, try again."
				}
		})
		.then(obj => {
			// switch camera value to the camera's full name
			var camera_full_name;

			switch (user_camera) {
				case "fhaz":
					camera_full_name = "Front Hazard Avoidance Camera";
					break;
				case "rhaz":
					camera_full_name = "Rear Hazard Avoidance Camera";
					break;
				case "mast":
					camera_full_name = "Mast Camera";
					break;
				case "chemcam":
					camera_full_name = "Chemistry and Camera Complex";
					break;
				case "mahli":
					camera_full_name = "Mars Hand Lens Imager";
					break;
				case "mardi":
					camera_full_name = "Mars Descent Imager";
					break;
				case "navcam":
					camera_full_name = "Navigation Camera";
					break;
				case "pancam":
					camera_full_name = "Panoramic Camera";
					break;
				case "minites":
					camera_full_name = "Miniature Thermal Emission Sepectrometer"
					break;
			}
    			
      // check for any photos are returned
			if (obj.photos.length === 0) {
				document.getElementById("message").innerText = `Sorry, the ${user_rover.toUpperCase()} did not take any pictures with the ${camera_full_name.toUpperCase()} on Martian sol day ${user_sol}.`;
			} else {
        //clear message
        document.getElementById("message").innerText = "";
        
        // Find random image from response
        var imgArray = obj.photos;
        var randomImg = imgArray[Math.floor(Math.random()*imgArray.length)];
				image_source = randomImg.img_src;

        // Image title
        var img_title = `The ${randomImg.rover.name}'s ${randomImg.camera.full_name} took this photo on Martian sol day ${randomImg.sol}`;

				i++;
				img_key = "image" + i;

				localStorage.setItem(img_key, image_source);

				// Retrieve image source from local storage
				var display_src = localStorage.getItem(img_key);
				
        // Create img element with image source set
				displayImg(display_src, img_title);
			}
		})
	}
}

function displayImg(source, title) {
	display_image = document.createElement("img");
	display_image.setAttribute("src", source);
	display_image.setAttribute("class", "mars-pics");
	display_image.setAttribute("width", "27%");
	display_image.setAttribute("height", "27%");
	display_image.setAttribute("alt", "Mars Photo");
	display_image.setAttribute("hspace", "2%");
  display_image.setAttribute("title", title)
	document.getElementById("results").appendChild(display_image);
}


