//input handling
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_C = 67;
const KEY_Q = 81;
const KEY_S = 83;
const KEY_F = 70;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_M = 77;
const KEY_P = 80;

var pausePressed = false;

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;
var holdSpace = false;

function initInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function keyPressed(evt) {
	//console.log("Key pressed: " + evt.keyCode);


	switch (mode) {
		case GAME_SCREEN:
			playerHoldAction(evt.keyCode, true);
			//cheat keys
			cheats(evt.key);

			if (evt.keyCode == KEY_M) {
				toggleMute();
			}

			if (evt.keyCode == KEY_P) {
				pausePressed = !pausePressed;
				pauseGame(pausePressed);
			}

			break;

		case WIN_SCREEN:
			if (evt.keyCode == KEY_SPACE) {
				mode = MAIN_MENU;
			}
			break;

		case GAME_OVER:
			if (evt.keyCode == KEY_SPACE) {
				resetGame();
			}
			break;

		case TITLE_SCREEN:
		case CREDIT_SCREEN:
			if (evt.keyCode == KEY_SPACE) {
				mode = MAIN_MENU;
			}
			break;

		case MAIN_MENU:
			if (evt.keyCode == KEY_ENTER) {
				loadLevel(0);
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_SHIFT) {
				mode = CREDIT_SCREEN;
			}
			if (evt.keyCode == KEY_F) {
				toggleFullscreen();
			}
			if (evt.keyCode == KEY_1) {
				loadLevel(0);
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_2) {
				loadLevel(1);
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_3) {
				loadLevel(2);
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_4) {
				loadLevel(3);
				mode = GAME_SCREEN;
			}
			break;

		case GAME_PAUSE:
			if (evt.keyCode == KEY_P) {
				pausePressed = !pausePressed;
				pauseGame(pausePressed);
			}

			if(evt.keyCode == KEY_C) {
				for(i=0; i<10; i++){
					allHighScores[i] = 0;
				};
				p1.saveHighScores();
			}

			if(evt.keyCode == KEY_SPACE) {
				mode = MAIN_MENU;
			}
			break;

		case LEVEL_TRANSITION:
			if (evt.keyCode == KEY_SPACE) {
				mode = GAME_SCREEN;
			}
			break;
	}

	evt.preventDefault(); // this is to prevent arrow keys from scrolling the page.
}


function keyReleased(evt) {
	playerHoldAction(evt.keyCode, false);

}

function playerHoldAction(keyCode, turnOn) {
	switch (keyCode) {
		case KEY_LEFT_ARROW:
			holdLeft = turnOn;
			break;

		case KEY_RIGHT_ARROW:
			holdRight = turnOn;
			break;

		case KEY_UP_ARROW:
			holdUp = turnOn;
			break;

		case KEY_DOWN_ARROW:
			holdDown = turnOn;
			break;

		case KEY_SPACE:
			holdSpace = turnOn;
			break;

	}
}