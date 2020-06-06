
function satellites() {

	this.x = 500;
	this.y = 0;
	this.w = 120;
	this.h = 33;
	this.r = 13;
	this.sy = 3;
	this.hp = 1;
	this.destroyed = false; // also used in playerWeapon.js
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;

	this.draw = function () {
			ctx.drawImage(imageArray["satellite_human.png"], this.x, this.y);
	}

	this.move = function () {
		this.y += this.sy;
		this.playerCollisionDetection();

		if (this.y >= c.height) {
			//this.respawn();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y + 12, this.w, this.h) || 	//sattelite body
			collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 48, this.y + 60, this.r)) {			//sattelite round plate on front
		
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0) {
				this.onDestroyed();
			}

		}
	}

	this.playerCollisionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y + 12, this.w, this.h) ||		//sattelite body
			p1.collisionCheck(false, this.x + 48, this.y + 60, this.r)) {			//sattelite round plate on front
				
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
			/*	speedPU.active = true;
				speedPU.x = this.x;
				speedPU.y = this.y;
				speedPU.draw();
				speedPU.move(); */
			}
		}
	}

	this.respawn = function () {
		this.destroyed = false;
		this.dropLoot = false;
		//speedPU.pickedUP = false;
		this.y = -50;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
	}

	this.readyToRemove = function () {
		return (this.destroyed || this.y > c.height);
	}
}