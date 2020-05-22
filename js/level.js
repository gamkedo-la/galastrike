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
var levelNum = 1; //determines what level is active

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