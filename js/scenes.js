//scene function

const GAME_SCREEN = 0;
const WIN_SCREEN = 1;
const GAME_OVER = 2;
const TITLE_SCREEN = 3;
const MAIN_MENU = 4;
const CREDIT_SCREEN = 5;
const GAME_PAUSE = 6;

var countAlpha = 0; // counting for Pause draw screen
var mode = TITLE_SCREEN;

function gameMode() {

	if (backgroundMusic.playing == false) {
		if (levelNum == 1)
			backgroundMusic.loopSong("./RAW/moreMusic.mp3");
		else
			backgroundMusic.loopSong("./RAW/gameplayMusicV2.mp3");
	}
		// scrolling bg image
		backgroundDraw();
		// awesome parallax starfield
		starDraw();
		starMove();
		// space tech in front of stars but behind the game action
		midgroundDraw();

	//draws and moves enemies and space debris
	for (var i = 0; i < enemyList.length; i++) {
		enemyList[i].draw();
		enemyList[i].move();
	}
	//looks to see if it needs to remove enemies and debris
	for (var i = enemyList.length - 1; i >= 0; i--) {
		if (enemyList[i].readyToRemove()) {
			enemyList.splice(i, 1);
		}
	}

	//draws loot items
	for (var i = 0; i < lootList.length; i++) {
		lootList[i].draw();
	}

	//player ship
	p1.draw();

	drawRails();
}

function gameOverScreen() {
	colorRect(0, 0, c.width, c.height, 'blue');
	colorText("Game Over", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("New Game: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}

function winScreen() {
	colorRect(0, 0, c.width, c.height, 'green');
	colorText("Player Wins", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("New Game: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}

function titleScreen() {
	colorRect(0, 0, c.width, c.height, 'red');
	colorText("Title Screen", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("New Game: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}

function mainMenuScreen() {
	colorRect(0, 0, c.width, c.height, 'orange');
	colorText("Main Menu", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("New Game: [ENTER]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
	colorText("Fullscreen: [F]", c.width / 2 - 70, c.height / 2 + 80, "15px arial", "white");
	colorText("Credits: [SHIFT]", c.width / 2 - 70, c.height / 2 + 120, "15px arial", "white");
	colorText("LV 01 [1]", c.width / 2 - 70, c.height / 2 + 160, "15px arial", "white");
	colorText("LV 02 [2]", c.width / 2 - 70, c.height / 2 + 200, "15px arial", "white");
	colorText("LV 03 [3]", c.width / 2 - 70, c.height / 2 + 240, "15px arial", "white");
	colorText("LV 04 [4]", c.width / 2 - 70, c.height / 2 + 280, "15px arial", "white");
}

function creditScreen() {
	colorRect(0, 0, c.width, c.height, 'black');
	colorText("Credits", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("Main Menu: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}


function gamePauseScreen() {
	if (countAlpha == 0) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(0, 0, c.width, c.height);
		countAlpha++;
	}
	colorText("PAUSED [P]", c.width / 2 - 70, c.height / 2 + 40, "30px arial", "white");
	colorText("Main Menu [SPACE]", c.width / 2 - 60, c.height / 2 + 80, "15px arial", "gray");
}