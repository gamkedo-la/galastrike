
function satellites() {
	this.x = 500;
	this.y = 0;
	this.w = 120;
	this.h = 33;
	this.r = 13;
	this.sy = 3;
	this.hp = 1;
	this.destroyed = false; // also used in playerWeapon.js
	this.explosion = new explosion(15, 17, 12, 'yellow', 'red', 'green');
	this.lootDropRate = 5;

	this.draw = function () {
		if (!this.destroyed) {
			ctx.drawImage(imageArray["satellite_human.png"], this.x, this.y);
		}
		this.explosion.draw();
	}

	this.move = function () {
		this.y += this.sy;
		this.playerCollisionDetection();
		this.explosion.move(this.x + this.w * 0.5, this.y + this.h * 0.5);

		if (this.y >= c.height) {
			//this.respawn();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y + 12, this.w, this.h) || 	//sattelite body
			collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 48, this.y + 60, this.r)) {			//sattelite round plate on front
		
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}

		}
	}

	this.playerCollisionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y + 12, this.w, this.h) ||		//sattelite body
			p1.collisionCheck(false, this.x + 48, this.y + 60, this.r)) {			//sattelite round plate on front
				if (!this.destroyed) {
					p1.getHit();
					this.hp--;
				}
				if (!this.destroyed && this.hp <= 0) {
					this.onDestroyed();
				}
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;
	
		if(Math.round(Math.random() * this.lootDropRate) == 1){
			spawnLoot(this.x+this.w/2, this.y+this.h, "mid","laser","atom","speed","shield");
		}

		//p1.playerScoring(25); //needs to be fixed
		playDestroyedEnemyMidSound();
		this.explosion.explode();
	}

	this.respawn = function () {	
		this.hp = 1;
		this.destroyed = false;
		
		//shieldPU.pickedUP = false;
		this.y = -50;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
		this.explosion = this.explosion ? new explosion() : this.explosion;
	}

	this.readyToRemove = function () {
		return ((this.destroyed && this.explosion.done()) || this.y > c.height);
	}
}