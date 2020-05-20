var c;
var ctx;
var fps = 30;
var screenBuffer = 20;

// these globals are assiged in gameInit after onload
var p1; // player 1
var gamepad;
var a1; // basic enemy
var a2; // mid enemy
var a3; // diver enemy
var b1; // level one boss;
var powerUp1; //power up placeholder
var starList; //parallax 
var ast; //asteroids
var sat; //satellites
var shieldPU; //shield Power Up
var speedPU; // speed Power Up
var weaponPU; // weapon Poer Up

window.onload = function () {
	c = document.getElementById ('gameCanvas');
    ctx = c.getContext ('2d');
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
    a1 = new basicAlienClass();
    a2 = new midAlienClass();
    a3 = new diverAlienClass();
    b1 = new levelOneBossClass();
    powerUp1 = new basicPowerUpClass();
    starList = []; //parallax 
    ast = new asteroids(); //asteroids
    sat = new satellites(); //satellites
    shieldPU = new shieldPowerUp();
    speedPU = new speedPowerUp();
    weaponPU = new weaponPowerUp();
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
	a2.move();
	a3.move();
	b1.move();
	powerUp1.move();
	ast.move();
	sat.move();

	//audio
    backgroundMusic.updateMusic();
}

function gameMode() {
	if(backgroundMusic.playing == false) {
		backgroundMusic.loopSong("./RAW/gameplayMusicV1.mp3");	
	}
    // scrolling bg image
    backgroundDraw();
    // awesome parallax starfield
    starDraw();
    // space tech in front of stars but behind the game action
    midgroundDraw();
    //boss
    b1.draw();
    //asteroids & satellites
    ast.draw();
    sat.draw();
	//player ship
	p1.draw();
	//basic enemy 
	a1.draw();
	a1.respawnAlien();
	a2.draw();
	a2.respawnAlien();
	a3.draw();
	a3.respawnAlien();
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






