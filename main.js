// Select elements here
const video = document.getElementById("video");
const videoControls = document.getElementById(video - controls);
const playButton = document.getElementById("play");

const videoWorks = !!document.createElement("video").canPlayType;
if (videoWorks) {
	video.controls = false;
	videoControls.classList.remove("hidden");
}

// Add functions here

// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played
// otherwise, the video is paused
function togglePlay() {
	if (video.paused || video.ended) {
		video.play();
	} else {
		video.pause();
	}
}

// Add eventlisteners here
