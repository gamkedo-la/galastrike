var enemyList = [];
var lootList = [];
const ENEMY_KIND_BASIC_ALIEN = 0;
const ENEMY_KIND_MID_ALIEN = 1;
const ENEMY_KIND_DIVER_ALIEN = 2;
const ENEMY_KIND_LONE_BOSS = 3;
const ENEMY_KIND_AST = 4;
const ENEMY_KIND_SAT = 5;
const ENEMY_KIND_MINIBOSS_ONE = 6;

const WAVE_WAIT_UNTIL_CLEAR = -1;
const WAVE_FINSIHED = -2;

var levelOneData = [ // FIRST LEVEL

	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:0, atX:0.5, count:2, countSpacing: 50, onRail:0}, // first wave

	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.5, count:5, countSpacing: 50, onRail:0}, //second wave
	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:0, atX:0.5, count:5, countSpacing: 50, onRail:1}, 

	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.5, count:5, countSpacing: 50, onRail:0}, //third wave
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:0, atX:0.5, count:5, countSpacing: 50, onRail:1}, 
	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:0, atX:0.5, count:5, countSpacing: 50, onRail:2}, 

	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.5, count:5, countSpacing: 50, onRail:3}, // fourth wave
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:100, atX:0.5, count:5, countSpacing: 50, onRail:4}, 
	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:100, atX:0.5, count:5, countSpacing: 50, onRail:5}, 
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:100, atX:0.5, count:5, countSpacing: 50, onRail:6}, 

	{kind:ENEMY_KIND_MINIBOSS_ONE, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.2, count:1, countSpacing: 50}, // boss fight
	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:0, atX:0.2, count:5, countSpacing: 50},
	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:0, atX:0.2, count:5, countSpacing: 50},

];

var levelTwoData = [ // Second Level

	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:0, atX:0.5, count:5, countSpacing: 50, onRail:0}, // first wave
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:0, atX:0.2, count:5, countSpacing: 50, onRail:1},
	{kind:ENEMY_KIND_BASIC_ALIEN, delayBefore:0, atX:0.5, count:5, countSpacing: 50, onRail:2},
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:0, atX:0.2, count:5, countSpacing: 50, onRail:3}, 

	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.8, count:6, countSpacing: 50},// second wave
	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:200, atX:0.3, count:6, countSpacing: 50},


	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, atX:0.2, count:5 , countSpacing: 50, onRail:4},// third wave
	{kind:ENEMY_KIND_MID_ALIEN, delayBefore:100, atX:0.2, count:5, countSpacing: 50, onRail:5},
	
	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:WAVE_WAIT_UNTIL_CLEAR, count:5, countSpacing: 50},
	{kind:ENEMY_KIND_DIVER_ALIEN, delayBefore:0, count:5, countSpacing: 50},

	
];

var levelThreeData = [

	{kind:ENEMY_KIND_LONE_BOSS, delayBefore:0, count:1}, // boss fight

];

var levelList = [levelOneData, levelTwoData, levelThreeData];
var levelNum = 0; //determines what level is active
var levelRails = [railListA, railListB, railListC, railListA];



function loadLevel(whichLevel) {
	enemyList = [];
	lootList = [];
	levelNum = whichLevel;
	levelCurrent = levelList[levelNum];
	railList = levelRails[levelNum];
	spawnClock = 0;
	upToSpawnIdx = 1;
	lastSpawnTime = 0;
}
var upToSpawnIdx = 0;
var levelCurrent;
var spawnClock = 0;
var lastSpawnTime = 0;

function checkIfSpawnBlockedOrLevelOver() {
	if(enemyList.length == 0) {
		if(upToSpawnIdx >= levelCurrent.length) {
			mode = LEVEL_TRANSITION;
			levelNum++;
			if(levelNum >= levelList.length) {
				mode = WIN_SCREEN;
			} else {
				loadLevel(levelNum);
			}
		}
		if(upToSpawnIdx < levelCurrent.length && levelCurrent[upToSpawnIdx].delayBefore == WAVE_WAIT_UNTIL_CLEAR) {
			levelCurrent[upToSpawnIdx].delayBefore = 1;
			lastSpawnTime = spawnClock;
			upToSpawnIdx ++;
			ui.messageToShow = ui.nextEnemyWave;
		}
	}
}
function handelLevelSpawn() {
	if(upToSpawnIdx > levelCurrent.length) {
		return;
	}
	for(var i=0; i < upToSpawnIdx; i++){
		if(spawnClock == levelCurrent[i].delayBefore + lastSpawnTime) {
			var spawnObj;
			switch(levelCurrent[i].kind) {
				case ENEMY_KIND_BASIC_ALIEN:
					spawnObj = new basicAlienClass();
					spawnObj.init(); //not yet on all objects
					break;
				case ENEMY_KIND_MID_ALIEN:
					spawnObj = new midAlienClass();
					spawnObj.init(); //not yet on all objects
					break;
				case ENEMY_KIND_DIVER_ALIEN:
					spawnObj = new diverAlienClass();
					break;
				case ENEMY_KIND_MINIBOSS_ONE:
					spawnObj = new miniBossOne();
					break
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
					console.log("attempted to spawn unknown kind " + levelCurrent[i].kind + " at time " + spawnClock);
					break;
			}
			if(levelCurrent[i].atX != undefined) {
				spawnObj.x = levelCurrent[i].atX * c.width;
			}
			if(levelCurrent[i].onRail != undefined) {
				spawnObj.followRail = levelCurrent[i].onRail;
			}
			if(levelCurrent[i].count != undefined) { 
				levelCurrent[i].count --; //the one spawns now
				if(levelCurrent[i].count > 0) {
					if(typeof(levelCurrent[i].waveStarted) == "undefined" || levelCurrent[i].waveStarted == false) {
						levelCurrent[i].waveStarted = true;
						if(upToSpawnIdx < levelCurrent.length && levelCurrent[upToSpawnIdx].delayBefore != WAVE_WAIT_UNTIL_CLEAR) {
							upToSpawnIdx ++;
						}
					} 
					levelCurrent[i].delayBefore = levelCurrent[i].countSpacing;
				} 
				else {
					levelCurrent[i].delayBefore = WAVE_FINSIHED;	
				}
			} else if(upToSpawnIdx < levelCurrent.length && levelCurrent[upToSpawnIdx].delayBefore != WAVE_WAIT_UNTIL_CLEAR) {
				upToSpawnIdx ++;
			}
			spawnObj.move();// giving a free cycle to start on rail point 1 will give it a super class with an init function
			enemyList.push(spawnObj);
			
			lastSpawnTime = spawnClock;
		}
	}
	if(mode != LEVEL_TRANSITION) {
		spawnClock ++;
	}
}