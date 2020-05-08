var c;
var ctx;
var fps = 30;

var screenBuffer = 20;

var p1 = new playerClass();
var gamepad = new GamepadManager();
var a1 = new basicAlienClass();
var powerUp1 = new basicPowerUpClass();
var starList = []; //parallax 

window.onload = function () {
	c = document.getElementById ('gameCanvas');
    ctx = c.getContext ('2d');
    window.onresize = resize; // handle browser resizing
    this.resize(); // full the browser right away
	imageLoading();
	starInit();
}	

function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

function startGame() {
	setInterval (function() {
		drawEverything(),
		moveEverything()},
		1000/fps);

	initInput();
}


function drawEverything() {

	//canvas
	colorRect(0, 0, c.width, c.height, 'black');

	//state machine handling game screens
	switch(mode) {
		case GAME_SCREEN:
		gameMode();
		break;

		case WIN_SCREEN:
		winScreen();
		break;

		case GAME_OVER:
		gameOverScreen();
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
    //player
    gamepad.update();
	p1.move();
	starMove();	
	a1.move();
	powerUp1.move();

	//audio
    backgroundMusic.updateMusic();
}

function gameMode() {
    // scrolling bg image
    backgroundDraw();
    // awesome parallax starfield
    starDraw();
	//player ship
	p1.draw();
	//basic enemy 
	a1.draw();
	a1.shotCheck();
	a1.respawnAlien();
	
    //player score
	p1.playerScore();
	//power ups
	powerUp1.draw();
	powerUp1.shieldPowerUp();
	powerUp1.respawn();
}

function resetGame() {
	mode = GAME_SCREEN;
	playerScore = 0;
	playerShields = 1;
	p1.shield01 = false;
	p1.x = c.width/2;
	p1.y = c.height - 150;
}






