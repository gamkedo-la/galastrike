
const DIVER_ALIEN_HP = 2;

function diverAlienClass() {

	this.x = 400;
	this.y = ALIEN_SPAWN_POSY;
	this.h = 50;
	this.w = 50;
	this.sx = 4;
	this.sy = 4;
	this.speedDiveY = 10;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = DIVER_ALIEN_HP;
	this.destroyed = false;
	this.respawnTimer = 60;
	this.enteredScreen = false;
	this.dive = false;
	this.hitImg = false;

	this.lootDropRate = 1;

	this.draw = function () {

		//colorRect(this.x, this.y, this.w, this.h, 'red');
		ctx.drawImage(imageArray["enemyC.png"], this.x, this.y);
		colorText(this.hp, this.x + 60, this.y, "18px arial", "orange"); // hp indicator

		if(this.hitImg == true) {
			ctx.drawImage(imageArray["enemyCFlash.png"], this.x, this.y);
			this.hitImg = false;
		}

	}

	this.move = function () {
		//movement ai	

		if (this.enteredScreen == false) {
			//this.x = 400;
			this.y += this.sy;
			if (this.y >= 200) {
				this.enteredScreen = true;
			}
		}

		if (this.enteredScreen == true) {
			if (this.x > p1.x - 10) {
				this.x -= 3;
			}
			if (this.x < p1.x - 10) {
				this.x += 3;
			}

			this.y = this.y;
			this.rn = Math.round(Math.random() * (25 - 1) + 1); // odds determining when alien will dive towards player
			if (this.rn == 1) {
				this.dive = true;
			}
			// need to implement player seeking code
			if (this.dive) {
				this.y += this.speedDiveY;
			}
		}

		this.playerCollisionDetection();
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y, this.w, this.h)) {
			
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			this.hitImg = true;
			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}

		}
	}

	this.playerCollisionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
			
			p1.getHit();
			this.hp--;
			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}

			if (this.y >= c.height) {
				this.dive = false;
			}
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;

		if(Math.round(Math.random() * this.lootDropRate) == 1){
			spawnLoot(this.x + this.w/2, this.y + this.h/2, "speed","shield");
		}

		p1.addToScore(25); //needs to be fixed
		playDestroyedEnemyMidSound();
	}

	this.readyToRemove = function () {
		return (this.destroyed || this.y > c.height);
	}
}