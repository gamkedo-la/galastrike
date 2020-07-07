const MID_ALIEN_HP = 3;

midAlienClass.prototype = new baseEnemy();

function midAlienClass() {
	this.superInit = this.init;
	this.init = function() {
		this.superInit();
		this.hp = MID_ALIEN_HP;
		this.imgName = "enemyB.png";
		this.imgFlashName = "enemyBFlash.png";
		this.imgShotName = "enemyMid_shot.png";
		this.scoreValue = 30;
		this.sx = 12;
		this.sy = 12;
		this.shotW = 8;
		this.shotH = 8;
		this.shotSpeed = 13;
		this.shotX;
		this.shotY;
	}//

		this.basicShot = function () {
		if (this.shotActive == false) {
			this.rn = Math.round(Math.random() * (6 - 1) + 1); //15
			if (this.rn == 1) {
				this.shotActive = true;
				this.shotY = this.y + 50;
				this.shotX = this.x - 10;
			}
		}
	}//

}

