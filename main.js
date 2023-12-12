// Select elements here
const video = document.getElementById("video");
const videoControls = document.getElementById(video - controls);
const playButton = document.getElementById("play");
const playbackIcons = document.querySelectorAll(".playback-icons use");
const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const seek = document.getElementById("seek");
const seekTooltip = document.getElementById("seek-tooltip");

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

// updatePlayButton updates the playback icon and tooltip
// depending on the playback state
function updatePlayButton() {
	playbackIcons.forEach((icon) => icon.classList.toggle("hidden"));

	if (video.paused) {
		playButton.setAttribute("data-title", "Play (k)");
	} else {
		playButton.setAttribute("data-title", "Pause (k)");
	}
}

// formatTime takes a time length in seconds and returns the time in minutes and seconds
function formatTime(timeInSeconds) {
	const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

	return {
		minutes: result.substr(3, 2),
		seconds: result.substr(6, 2),
	};
}

// initializeVideo sets the video duration, and maximum value of the progressBar
function initializeVideo() {
	const videoDuration = Math.round(video.duration);
	seek.setAttribute("max", videoDuration);
	progressBar.setAttribute("max", videoDuration);
	const time = formatTime(videoDuration);
	duration.innerText = `${time.minutes}:${time.seconds}`;
	duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
}

// updateTimeElapsed indicates how far through the video the current playback is
function updateTimeElapsed() {
	const time = formatTime(Math.round(video.currentTime));
	timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
	timeElapsed.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
}

// updateProgress indicates how far through the video
// the current playback is by updating the progressBar
function updateProgress() {
	seek.value = Math.floor(video.currentTime);
	progressBar.value = Math.floor(video.currentTime);
}

// Add eventlisteners here
playButton.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("loadedmetadata", initializeVideo);
video.addEventListener("timeupdate", updateTimeElapsed);
video.addEventListener("timeupdate", updateProgress);
