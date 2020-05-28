//input handling
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_Q = 81;
const KEY_S = 83;
const KEY_F = 70;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_M = 77;

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
			//cheats(evt.key);
			
			if (evt.keyCode == KEY_M) {
				toggleMute();
			}

			if (evt.keyCode == KEY_S) {
				p1.shield01 = !p1.shield01;
			}
			break;

		case WIN_SCREEN:
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
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_SHIFT) {
				mode = CREDIT_SCREEN;
			}
			if (evt.keyCode == KEY_F) {
				toggleFullscreen();
			}
			if (evt.keyCode == KEY_1) {
				levelNum = 0;
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_2) {
				levelNum = 1;
				mode = GAME_SCREEN;
			}
			if (evt.keyCode == KEY_3) {
				levelNum = 2;
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