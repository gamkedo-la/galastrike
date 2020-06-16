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

	//player ship
	p1.draw();
	p1.move();

	starMove();
	drawRails();

	//draws and moves enemies and space debris
	for (var i = 0; i < enemyList.length; i++) {
		enemyList[i].draw();
		enemyList[i].move();
	}
	//looks to see if it needs to remove enemies and debris
	for (var i = enemyList.length - 1; i >= 0; i--) {
		if (enemyList[i].readyToRemove()) {
			enemyList.splice(i, 1);
			checkIfSpawnBlockedOrLevelOver();
		}
	}

	//draws loot items
	for (var i = 0; i < lootList.length; i++) {
		lootList[i].draw();
		lootList[i].move();
	}

	//looks to see if it needs to remove loot items
	for (var i = lootList.length - 1; i >= 0; i--) {
		if (lootList[i].readyToRemove()) {
			lootList.splice(i, 1);
		}
	}

	ui.draw();
}

function gameOverScreen() {
	ctx.drawImage(imageArray["GameOverScreen.png"], 0, 0, c.width, c.height);
}

function winScreen() {
	colorRect(0, 0, c.width, c.height, 'green');
	colorText("Player Wins", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	colorText("New Game: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}

function titleScreen() {
	ctx.drawImage(imageArray["TitleScreenTwo.png"], 0, 0, c.width, c.height);
}

function mainMenuScreen() {
	ctx.drawImage(imageArray["MainScreen.png"], 0, 0, c.width, c.height);
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