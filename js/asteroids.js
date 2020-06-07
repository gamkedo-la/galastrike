
function asteroids() {

	this.hp = 1;
	this.x = 800;
	this.y = 0;
	this.r = 30;
	this.sy = 5;

	this.destroyed = false;
	this.destroyedRemovalCountdown = 10;
	this.destroyedRemovalCountdownNow = this.destroyedRemovalCountdown;
	this.explosionRadius = 5;
	this.explosionRadiusNow = this.explosionRadius;
	this.explosionShrinkFactor = 7;
	
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;
	this.rotation = 0;
	this.rotationSpeed = 0.1;

	this.draw = function () {
		let graphic = imageArray["asteroid_3.png"];

		if (this.destroyed == false) {
			drawBitmapCenteredAtLocationWithRotation(graphic, this.x, this.y, this.rotation);
		}
		else if (this.destroyed == true) {
			if (this.destroyedRemovalCountdownNow > 0) {	
				let color;
				if (this.explosionRadiusNow <= 50 * 1.05) {
					this.explosionRadiusNow += this.explosionShrinkFactor;					
				}
				else {
					this.explosionRadiusNow -= this.explosionShrinkFactor;					
				}

				color = 'red';
				color = Math.random() > 0.5 ? 'orange' : 'yellow';
				color = Math.random() > 0.25 ? 'white' : color;					
								
				colorCircle(this.x + Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 5, this.y - Math.random() * 5, this.explosionRadiusNow, color);
				colorCircle(this.x - Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 15, this.y - Math.random() * 15, this.explosionRadiusNow, color);
				colorCircle(this.x - Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
				colorCircle(this.x + Math.random() * 20, this.y - Math.random() * 20, this.explosionRadiusNow, color);
				colorCircle(this.x - Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
							
				this.destroyedRemovalCountdownNow--;
			}
		}
	}

	this.move = function () {
		this.y += this.sy;
		this.rotation += this.rotationSpeed;
		this.playerCollisionDetection();

		if (this.y >= c.height || this.destroyedRemovalCountdownNow <= 0) {
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
			if (!this.destroyed) {
				p1.getHit();
				this.hp--;
			}
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
		// if (this.destroyedRemovalCountdownNow <= 0) {
		// 	this.respawn();
		// }
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
		this.hp = 1;
		this.destroyed = false;
		this.dropLoot = false;
		this.destroyedRemovalCountdownNow = this.destroyedRemovalCountdown;
		this.explosionRadiusNow = this.explosionRadius;
		//shieldPU.pickedUP = false;
		this.y = -100;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
	}

	this.readyToRemove = function() {
		return ((this.destroyed && this.destroyedRemovalCountdownNow <= 0) || this.y > c.height);
	}
}