// as of 2020 moz/webkit/ms prefixes are not required
// but I left them there to support ancient browsers
// this could be just three lines of code...

var currentlyFullscreen = false; // FIXME: does not change if user hits f11

function toggleFullscreen() {
    if (currentlyFullscreen) {
        currentlyFullscreen = false;
        closeFullscreen();
    } else {
        currentlyFullscreen = true;
        openFullscreen();
    }
}

// elem should be the canvas or div we want to zoom into
// or leave blank to use the entire document
function openFullscreen(elem) {
  if (!elem) elem = document.documentElement; // entire page
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}