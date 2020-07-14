//scene function

const GAME_SCREEN = 0;
const WIN_SCREEN = 1;
const GAME_OVER = 2;
const TITLE_SCREEN = 3;
const MAIN_MENU = 4;
const CREDIT_SCREEN = 5;
const GAME_PAUSE = 6;
const LEVEL_TRANSITION = 7;
const GAME_CONTROLS = 8; 

var debugShowRails = false;

var countAlpha = 0; // counting for Pause draw screen
var mode = TITLE_SCREEN;


var astList = [];
var satList = [];

function gameMode() {

	if (backgroundMusic.playing == false) {
		if (levelNum % 2 == 1)
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

	// manages asteroids and satellites for each level
	switch(levelNum) {
		case levelNum = 0: // first level
			handleSpawningAsteroids(50);
			handleSpawningSatellites(100);
		break;
		case levelNum = 1: // second level
			handleSpawningAsteroids(50);
			handleSpawningSatellites(100);
		break;
		case levelNum = 2: // final boss fight
			handleSpawningAsteroids(50);
			handleSpawningSatellites(50);
		break;
	}

	//player ship
	p1.draw();
	p1.move();

	starMove();
	if(debugShowRails == true) {
		drawRails();
	}
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
	transitioningToNextLevelScreen();

	// asteroids
	for (var i = 0; i < astList.length; i++) {
		astList[i].draw();
		astList[i].move();
	}

	for (var i = astList.length - 1; i >= 0; i--) {
		if (astList[i].readyToRemove()) {
			astList.splice(i, 1);
		}
	}

	// satellites
	for (var i = 0; i < satList.length; i++) {
		satList[i].draw();
		satList[i].move();
	}

	for (var i = satList.length - 1; i >= 0; i--) {
		if (satList[i].readyToRemove()) {
			satList.splice(i, 1);
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

function handleSpawningAsteroids(odds) {
	var rn = Math.round(Math.random() * (odds - 1) + 1);
	
	if(rn == 1) {
		spawnAsteroids();
	}
}

function handleSpawningSatellites(odds) {
	if(satList.length < 1) {
		var rn = Math.round(Math.random() * (odds - 1) + 1);
		if(rn == 1) {
			spawnSatellites();
		}
	}
}

function levelTransitionScreen() {
	backgroundMusic.stop();
	ctx.drawImage(imageArray["NextLevelScreen.png"], 0, 0, c.width, c.height);

	//colorRect(0, 0, c.width, c.height, 'green');
	//colorText("Next Level?", c.width / 2 - 80, c.height / 2, "30px arial", "white");
}

function gameOverScreen() {
	backgroundMusic.stop();

	ctx.drawImage(imageArray["GameOverScreen.png"], 0, 0, c.width, c.height);
}

function winScreen() {
	backgroundMusic.stop();
	ctx.drawImage(imageArray["WinScreen.png"], 0, 0, c.width, c.height);

	//colorRect(0, 0, c.width, c.height, 'green');
	//colorText("Player Wins", c.width / 2 - 80, c.height / 2, "30px arial", "white");
	//colorText("Main Menu: [SPACE]", c.width / 2 - 70, c.height / 2 + 40, "15px arial", "white");
}


function titleScreen() {
    ctx.drawImage(imageArray["TitleScreenTwo.png"], 0, 0, c.width, c.height);
    starDraw();
    starMove();

    // some particles just for fun
    //if (Math.random()<0.05) boom.bigExplosion(Math.random()*c.width,Math.random()*256);
    //if (Math.random()<0.05) boom.smallExplosion(Math.random()*c.width,Math.random()*256);
    //if (Math.random()<0.05) boom.bigImpact(Math.random()*c.width,Math.random()*256);
    //if (Math.random()<0.05) boom.smallImpact(Math.random()*c.width,Math.random()*256);

}
var lineStartCenterPoint = 950;
var lineStartPosY = 400;
var lineEndPosY = 400;

function mainMenuScreen() {
	ctx.drawImage(imageArray["MainScreen.png"], 0, 0, c.width, c.height);
	colorLine(lineStartPosX, lineStartPosY, lineEndPosX, lineEndPosY, 1, 'white');
	starDraw();
	starMove();

	// animated underscore for MAIN MENU
	if(lineStartPosX >= c.width/2 - 200) {
		if(lineStartPosX >= c.width/2 - 150) {
			lineStartPosX -= 5;
		} else {
			lineStartPosX -= 1;
		}
	}

	if(lineEndPosX <= c.width/2 + 200) {
		if(lineEndPosX <= c.width/2 + 150) {
			lineEndPosX += 5;
		} else {
			lineEndPosX += 1;
		}
	}
}

function creditScreen() {
	//backgroundMusic.stop(); 

	colorRect(0, 0, c.width, c.height, 'black');

	drawCredits();
}

function controlScreen() {
	ctx.drawImage(imageArray["GameControlScreen.png"], 0, 0, c.width, c.height);
	starDraw();
	starMove();

}


function gamePauseScreen() {
	backgroundMusic.pause();
	if (countAlpha == 0) {
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(0, 0, c.width, c.height);
		countAlpha++;
	}
	console.log();
	colorText("PAUSED [P]", c.width / 2 - 70, c.height / 2 - 120, "30px arial", "white");
	colorText("Main Menu [SPACE]", c.width / 2 - 60, c.height / 2 - 90 , "15px arial", "gray");
	colorText("Game Controls [ENTER]", c.width / 2 - 70, c.height / 2 - 60 , "15px arial", "gray");
	colorText("HIGH SCORES", c.width / 2 - 75, c.height / 2 + 80, "25px arial", "white");
	p1.drawAllHighScores();
}

var creditsList = [
" ",
"                                          [SPACEBAR] TO GO BACK TO THE GAME MENU",
" ",
"Simon Hoffiz: Project lead, core gameplay, enemy waypoint system, input handling, player ship art, enemy ship art, boss art, speed powerup, level authoring, assorted bug fixes, UI design and related art, damage flash",
"Muhammed \"EyeForcz\" Durmusoglu: Collision, player weapon, player shield, cheats, lootsystem, laser and atomic weapon. Improved background scrolling. Game optimazation. Various bug fixes. Art for weapons, shields and loots",
"Martina Natale: Sounds (player shots, boss shots, enemy destruction, item pickup, laser, player death), title menu and game over screens, compatibility fixes, shield bug fix, mute and pause features",
"Christer \"McFunkypants\" Kaitila: Full screen and responsive support, edge detection, gamepad support, assorted bug fixes, parallax background art, optimizations, boss sprite tweaks, text shadows, thrust trails, space debris, layered boss explosion effects, explosion particles",
"Alan Zaring: Main gameplay music composition",
"Michael \"Misha\" Fewkes: Audio functionality, music integration and additional composition",
"Alanna Linayre: Asteroid art, including variations",
"Vaan Hope Khani: High score UI and implementation",
"Bilal A. Cheema: Ammo limit, player state fix on stage start, collision improvement, enemy track bug fix",
"Michelly Oliveira: Triple shot mid weapon functionality, powerup loot drop implementation",
"Randy Tan Shaoxian: Explosion effect authoring and integration",
"Ian Cherabier: Human satellite, alien satellite",
"Gonzalo Delgado: Enemy alien ship sprite",
  " ",
  "Game made in HomeTeam GameDev, apply to join us at",
  "HomeTeamGameDev.com"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 127;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }

        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(1, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function

const drawCredits = function() {
  var creditPosY = 10;
  var creditsW = 640;
  var leftX = gameCanvas.width/2-creditsW/2;
  var wasFont = ctx.font;
  var wasAlign = ctx.textAlign;

    for(var i=0; i<creditsList.length; i++) {
      var yPos = creditPosY + i * 12;
      //if (200 < yPos && yPos < 600) {
        if((i > 0) && (creditsList[i - 1] === "\n")) {
          ctx.font= "13px Arial";
          ctx.fillStyle="white";
          ctx.textAlign="left";
          ctx.fillText(creditsList[i],leftX,yPos);
        } else if(i === creditsList.length - 2) {
          ctx.font= "11px Arial";
          ctx.fillStyle="white";
          ctx.textAlign="center";
          ctx.fillText(creditsList[i],gameCanvas.width/2,yPos);
        } else if(i === creditsList.length - 1) {
          ctx.font= "11px Arial";
          ctx.fillStyle="#54b0bd";
          ctx.textAlign="center";
          ctx.fillText(creditsList[i],gameCanvas.width/2,yPos);
        } else {
          ctx.font= "11px Arial";
          ctx.fillStyle="white";
          ctx.textAlign="left";
          ctx.fillText(creditsList[i],leftX,yPos);
        }
      // }
    }
    ctx.font= wasFont;
    ctx.textAlign=wasAlign; // cleaning up after itself
  };
