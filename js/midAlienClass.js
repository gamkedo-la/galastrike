const MID_ALIEN_HP = 3;

midAlienClass.prototype = new baseEnemy();

function midAlienClass() {
	this.superInit = this.init;
	this.init = function() {
		this.superInit();
		this.hp = MID_ALIEN_HP;
		this.imgName = "enemyB.png";
		this.scoreValue = 30;
		this.sx = 12;
		this.sy = 12;
	}

}

