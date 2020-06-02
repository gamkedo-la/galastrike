var enemyList = [];
const ENEMY_KIND_BASIC_ALIEN = 0;
const ENEMY_KIND_MID_ALIEN = 1;
const ENEMY_KIND_DIVER_ALIEN = 2;
const ENEMY_KIND_LONE_BOSS = 3;
const ENEMY_KIND_AST = 4;
const ENEMY_KIND_SAT = 5;

var levelOneData = [
	{kind:ENEMY_KIND_BASIC_ALIEN, when:100, atX:0.5, count:5, countSpacing: 50},
	{kind:ENEMY_KIND_AST, when:100, atX:0.2, count:5, countSpacing: 50}, 
	{kind:ENEMY_KIND_SAT, when:100, atX:0.8, count:5, countSpacing: 50},
];

var levelTwoData = [
	{kind:ENEMY_KIND_BASIC_ALIEN, when:100, atX:0.5, count:5, countSpacing: 50},
	{kind:ENEMY_KIND_MID_ALIEN, when:100, atX:0.2, count:5, countSpacing: 50, onRail:0},
	{kind:ENEMY_KIND_MID_ALIEN, when:200, atX:0.2, count:3, countSpacing: 50, onRail:1},
	{kind:ENEMY_KIND_DIVER_ALIEN, when:100, atX:0.8, count:5, countSpacing: 50},
];

var levelThreeData = [
	{kind:ENEMY_KIND_LONE_BOSS, when:0},
];

var levelFourData = [
	{kind:ENEMY_KIND_AST, when:0, count:20, countSpacing: 50}, 
	{kind:ENEMY_KIND_SAT, when:0, count:5, countSpacing: 50},
];

var levelList = [levelOneData, levelTwoData, levelThreeData, levelFourData];
var levelNum = 3; //determines what level is active

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
					levelCurrent[i].when += levelCurrent[i].countSpacing;
				}
			}
			enemyList.push(spawnObj);
		}
	}
	spawnClock ++;
}