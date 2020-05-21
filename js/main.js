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

const ENEMY_KIND_BASIC_ALIEN = 0;
const ENEMY_KIND_MID_ALIEN = 1;
const ENEMY_KIND_DIVER_ALIEN = 2;
const ENEMY_KIND_LONE_BOSS = 3;
const ENEMY_KIND_AST = 4;
const ENEMY_KIND_SAT = 5;
var levelOneData = [
	{kind:ENEMY_KIND_BASIC_ALIEN, when:0},
	{kind:ENEMY_KIND_AST, when:30}, 
	{kind:ENEMY_KIND_SAT, when:100},
];

var levelTwoData = [
	{kind:ENEMY_KIND_LONE_BOSS, when:0},
];
var levelList = [levelOneData, levelTwoData];
var levelNum = 0;
function loadLevel(whichLevel) {
	enemyList = [];
	levelNum = whichLevel;
	levelCurrent = levelList[levelNum];
	spawnClock = 0;
}
var levelCurrent;
var spawnClock = 0;
function handelLevelSpawn() {
	for(var i=0; i<levelCurrent.length; i++){
		if(spawnClock == levelCurrent[i].when) {
			var spawnObj;
			switch(levelCurrent[i].kind) {
				case ENEMY_KIND_BASIC_ALIEN:
					spawnObj = new basicAlienClass();
					break;
				case ENEMY_KIND_MID_ALIEN:
					spawnObj = new midAlienClass();
					break;
				case ENEMY_KIND_DIVER_ALIEN:
					spawnObj = new diverAlienClass();
					break;
				case ENEMY_KIND_LONE_BOSS:
					spawnObj = new levelOneBossClass();
					break;
				case ENEMY_KIND_AST:
					spawnObj = new asteroids();
					break;
				case ENEMY_KIND_SAT:
					spawnObj = new satellites();
					break;
				default:
					console.log("attempted to spawn unkown kind " + levelCurrent[i].kind + " at time " + spawnClock);
					break;
			}
			enemyList.push(spawnObj);
		}
	}
	spawnClock ++;
}

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
 	loadLevel(levelNum);
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
	handelLevelSpawn();
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






