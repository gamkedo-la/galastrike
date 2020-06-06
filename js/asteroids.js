
function asteroids() {

	this.hp = 1;
	this.x = 800;
	this.y = 0;
	this.r = 30;
	this.sy = 5;
	this.destroyed = false; 
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;
	this.rotation = 0;
	this.rotationSpeed = 0.1;

	this.draw = function () {
		if (this.destroyed == false) {
			drawBitmapCenteredAtLocationWithRotation(imageArray["asteroid_3.png"], this.x, this.y, this.rotation);
		}
		if (this.destroyed == true) {
			
		}
	}

	this.move = function () {
		this.y += this.sy;
		this.rotation += this.rotationSpeed;
		this.playerCollisionDetection();

		if (this.y >= c.height) {
			this.respawn();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y, this.r)) {
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0) {
				this.onDestroyed();
			}
		}
	}

	this.playerCollisionDetection = function () {	
		if(p1.collisionCheck(false, this.x, this.y, this.r)){
			p1.getHit();
			this.hp--;
			if (this.hp <= 0) {
				this.onDestroyed();
			}
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;
		this.dropLoot = true;
		this.lootDrop();
		//p1.playerScoring(25); //needs to be fixed
		playDestroyedEnemyMidSound();
		this.respawn();
	}

	this.lootDrop = function () {
		if (this.dropLoot == true) {
			this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
			//console.log("ast loot rate:" + this.rn);
			if (this.rn == 1) {
			/*	shieldPU.active = true;
				shieldPU.x = this.x;
				shieldPU.y = this.y;
				shieldPU.draw();
				shieldPU.move(); */
			}
		}
	}

	this.respawn = function () {
		this.destroyed = false;
		this.dropLoot = false;
		//shieldPU.pickedUP = false;
		this.y = -100;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
	}

	this.readyToRemove = function() {
		return (this.destroyed || this.y > c.height);
	}
}