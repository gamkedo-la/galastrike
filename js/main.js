var c;
var ctx;
var fps = 30;
var fpsInterval = 1000 / fps;
var screenBuffer = 20;

// these globals are assiged in gameInit after onload
var p1; // player 1
var gamepad;
var starList; //parallax 
var shieldPU; //shield Power Up
var speedPU; // speed Power Up
var weaponPU; // weapon Power Up
var activeLevel;
var uiOverlay;

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
	starList = []; //parallax 
	loadLevel(levelNum);
	ui = new uiOverlay;
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
	//colorRect(0, 0, c.width, c.height, 'black');

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
	gamepad.update();
	//audio
	backgroundMusic.updateMusic();
}

function resetGame() {
	mode = GAME_SCREEN;
	playerScore = 0;
	p1.playerShields = 5;
	p1.shieldActive = true;
}

function pauseGame(pausePressed) {
	if (pausePressed)
		mode = GAME_PAUSE;
	else
		mode = GAME_SCREEN;
	countAlpha = 0;
}






