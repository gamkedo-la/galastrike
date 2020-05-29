var c;
var ctx;
var fps = 30;
var fpsInterval = 1000 / fps;
var screenBuffer = 20;

// these globals are assiged in gameInit after onload
var p1; // player 1
var gamepad;
var powerUp1; //power up placeholder
var starList; //parallax 
var shieldPU; //shield Power Up
var speedPU; // speed Power Up
var weaponPU; // weapon Power Up
var activeLevel;

window.onload = function () {
	c = document.getElementById('gameCanvas');
	ctx = c.getContext('2d');
	window.onresize = resize; // handle browser resizing
	this.resize(); // fill the browser right away
	imageLoading();
	gameInit();
	starInit();
}

// some of these need access to things only available after onload
function gameInit() {
	p1 = new playerClass();
	gamepad = new GamepadManager();
	powerUp1 = new basicPowerUpClass();
	starList = []; //parallax 
	shieldPU = new shieldPowerUp();
	speedPU = new speedPowerUp();
	weaponPU = new weaponPowerUp();
	loadLevel(levelNum);
}

function resize() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

var currentTime, elapsedTime, prevFrameTime;
function animate(timestamp) {

	currentTime = timestamp || 1;
	elapsedTime = currentTime - prevFrameTime;
	if (elapsedTime > fpsInterval) {
		moveEverything();
		drawEverything();
		prevFrameTime = currentTime - (elapsedTime % fpsInterval);
	}
	requestAnimationFrame(animate);

}

function startGame() {

	console.log("Starting Game!");
	prevFrameTime = window.performance.now();
	initInput();
	animate();

	// setInterval fires irregularly,
	// (the time is only a rough estimate)
	// which results in glitchy animation
	// and is harder to debug via this anonymous function
    /*
    setInterval (function() {
		moveEverything(),
		drawEverything()
		},
		1000/fps);
    */
}

function drawEverything() {
	//canvas
	colorRect(0, 0, c.width, c.height, 'black');

	//state machine handling game screens
	switch (mode) {
		case GAME_SCREEN:
			gameMode();
			break;

		case WIN_SCREEN:
			winScreen();
			break;

		case GAME_OVER:
			gameOverScreen();
			break;

		case GAME_PAUSE:
			gamePauseScreen();
			break;

		case TITLE_SCREEN:
			titleScreen();
			break;

		case MAIN_MENU:
			mainMenuScreen();
			break;

		case CREDIT_SCREEN:
			creditScreen();
			break;
	}
}

function moveEverything() {
	handelLevelSpawn();
	//player
	gamepad.update();
	p1.move();
	starMove();
	powerUp1.move();
	weaponPU.move();

	if (mode == GAME_SCREEN) {
		//moves enemies and sapce debris 
		for (var i = 0; i < enemyList.length; i++) {
			enemyList[i].move();
		}
		for (var i = enemyList.length - 1; i >= 0; i--) {
			if (enemyList[i].readyToRemove()) {
				enemyList.splice(i, 1);
			}
		}
	}

	//audio
	backgroundMusic.updateMusic();
}

function gameMode() {

	if (backgroundMusic.playing == false) {
		backgroundMusic.loopSong("./RAW/gameplayMusicV2.mp3");
	}
	// scrolling bg image
	backgroundDraw();
	// awesome parallax starfield
	starDraw();
	// space tech in front of stars but behind the game action
	midgroundDraw();
	//draws enemies and space debris
	for (var i = 0; i < enemyList.length; i++) {
		enemyList[i].draw();
	}

	//player ship
	p1.draw();

	//player score
	p1.playerScore();
	//power ups
	powerUp1.draw();
	powerUp1.shieldPowerUp();
	powerUp1.respawn();
	weaponPU.draw();
}

function resetGame() {
	mode = GAME_SCREEN;
	playerScore = 0;
	playerShields = 100;
	p1.shield01 = true;
}

function pauseGame(pausePressed) {
	if (pausePressed)
		mode = GAME_PAUSE;
	else
		mode = GAME_SCREEN;
}






