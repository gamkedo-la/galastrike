var c;
var ctx;
var fps = 30;
var screenBuffer = 20;

// these globals are assiged in gameInit after onload
var p1; // player 1
var gamepad;
var powerUp1; //power up placeholder
var starList; //parallax 
var shieldPU; //shield Power Up
var speedPU; // speed Power Up
var weaponPU; // weapon Poer Up
var enemyList = [];

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
    powerUp1 = new basicPowerUpClass();
    starList = []; //parallax 
    shieldPU = new shieldPowerUp();
    speedPU = new speedPowerUp();
    weaponPU = new weaponPowerUp();
    // enemyList array below
    var a1 = new basicAlienClass();
    var a2 = new midAlienClass();
    var a3 = new diverAlienClass();
    var b1 = new levelOneBossClass();
    var ast = new asteroids(); //asteroids
    var sat = new satellites(); //satellites
    enemyList = [a1, a2, a3, b1, ast, sat];
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
	powerUp1.move();
	

	for(var i=0; i<enemyList.length; i++) {
		enemyList[i].move();
	}

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

    for(var i=0; i<enemyList.length; i++) {
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
}

function resetGame() {
	mode = GAME_SCREEN;
	playerScore = 0;
	playerShields = 1;
	p1.shield01 = false;
	p1.x = c.width/2;
	p1.y = c.height - 150;
}






