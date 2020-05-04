
var musicVolume = 0.7;
var effectsVolume = 0.7;
var isMuted = false;
const VOLUME_INCREMENT = 0.0333;


//define sounds



//sound classes

var backgroundMusic = new backgroundMusicClass();
function backgroundMusicClass() {

	var musicSound = null;
	var fadeTrack = null;

	this.loopSong = function(filenameWithPath) {
		if (musicSound != null) {
			fadeTrack = musicSound;
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath);
		musicSound.loop = true;
		this.setVolume(musicVolume);
	}

	this.pauseSound = function() {
		musicSound.pause();
		fadeTrack.pause();
		fadeTrack = null;
	}

	this.resumeSound = function() {
		musicSound.play();
	}

	this.setVolume = function(value) {
		// Multipliction by a boolean serves as 1 for true and 0 for false
		if (musicSound == null) {return;}
		musicSound.volume = Math.pow(value * !isMuted, 2);

		if(musicSound.volume == 0) {
			musicSound.pause();
		} else if (musicSound.paused) {
			musicSound.play();
		}
	}

	this.updateMusic = function() {
		if (fadeTrack != null) {
			var newVolume = fadeTrack.volume - VOLUME_INCREMENT*2;

			if(newVolume > 1.0) {
				newVolume = 1.0;
			} else if (newVolume < 0.0) {
				newVolume = 0.0;
			}

			fadeTrack.volume = newVolume;

			if (fadeTrack.volume < 0.01667) {
				fadeTrack.pause();
				fadeTrack = null;
			}
		}
	}
}

function soundLoopsClass(filenameWithPath) {

	var fullFilename = filenameWithPath;
	var sound = new Audio(fullFilename);
	sound.loop = true;

	this.play = function() {
		if (sound.paused) {
			sound.currentTime = 0;
			sound.volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
			sound.play();
			console.log(`soundLoopsClass.play: ${fullFilename}`);
		}
	}

	this.stop = function() {
		sound.pause();
	}
}

function soundOverlapsClass(filenameWithPath) {

	var fullFilename = filenameWithPath;
	var soundIndex = 0;
	var sounds = [new Audio(fullFilename), new Audio(fullFilename)];

	this.play = function() {
		if(!sounds[soundIndex].paused) {
			sounds.splice(soundIndex, 0, new Audio(fullFilename));
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();

		soundIndex = (++soundIndex) % sounds.length;
		console.log(`soundOverlapsClass.play: ${fullFilename}`);
	}
}

function soundRandomClass(arrayOfFilenames) {
	var soundIndex = 0;
	var sounds = [''];

	for (var i = 0; i < arrayOfFilenames.length; i++) {
		sounds[i] = new Audio(arrayOfFilenames[i]);
		sounds[i+arrayOfFilenames.length] = new Audio(arrayOfFilenames[i]);
	}

	this.play = function() {
		soundIndex = rndInt(0, sounds.length - 1);
		if(!sounds[soundIndex].paused) {
			soundIndex++;
			if (soundIndex >= sounds.length) {
				soundIndex = 0;
			}
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();
		console.log(`soundRandomClass.play: ${sounds[soundIndex].src} - volume = ${sounds[soundIndex].volume}` );
	}
}

//sound functions
function getRandomVolume(){
	var min = 0.8;
	var max = 1;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function toggleMute() {
	isMuted = !isMuted;
	backgroundMusic.setVolume(musicVolume);
}

function setEffectsVolume(amount) {
	effectsVolume = amount;
	if(effectsVolume > 1.0) {
		effectsVolume = 1.0;
	} else if (effectsVolume < 0.0) {
		effectsVolume = 0.0;
	}
}

function setMusicVolume(amount) {
	musicVolume = amount;
	if(musicVolume > 1.0) {
		musicVolume = 1.0;
	} else if (musicVolume < 0.0) {
		musicVolume = 0.0;
	}
	backgroundMusic.setVolume(musicVolume);
}

function turnMusicVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
	console.log("Turn up Music");
}

function turnMusicVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
	console.log("Turn down Music");
}

function turnEffectsVolumeUp() {
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
	console.log("Turn up Effects");
}

function turnEffectsVolumeDown() {
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
	console.log("Turn down Effects");
}