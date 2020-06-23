const ALIEN_SPAWN_POSY = -100;
const BASIC_ALIEN_HP = 2;

basicAlienClass.prototype = new baseEnemy();

function basicAlienClass() {

	this.superInit = this.init;
	this.init = function() {
		this.superInit();
		this.hp = BASIC_ALIEN_HP;
		this.imgName = "enemyA.png";
		this.imgFlashName = "enemyAFlash.png";
		this.scoreValue = 20;
		this.shotSpeed = 10;
	}

	this.collisionShape = function(theShot) {
		return 	collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 5, this.y, this.w, this.h) ||	//alien body
				collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 40, this.y + 64, this.r) //alien round plate on front
	}

	this.playerCollisionShape = function() {
		return p1.collisionCheck(false, this.x + 5, this.y, this.w, this.h) ||	//alien body
			p1.collisionCheck(false, this.x + 40, this.y + 64, this.r) //alien round plate on front	
	}

}
