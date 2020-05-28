
function satellites() {

	this.x = 500;
	this.y = 0;
	this.w = 30;
	this.h = 50;
	this.sy = 3;
	this.destroyed = false; // also used in playerWeapon.js
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;

	this.draw = function() {
		if(this.destroyed == false) {
			ctx.drawImage(imageArray["satellite_human.png"], this.x, this.y);
			//colorRect(this.x, this.y, this.w, this.h, 'purple');
		}
		if(this.destroyed == true) {
			this.lootDrop();
		}
	}

	this.move = function() {
		this.y += this.sy;
		this.playerCollisionDetection();

		if(this.y >= c.height) {
			//this.respawn();
		}
	}

	this.shotHitMeCheck = function(testShot) {
		if(testShot.y + SHOT_DISPLAY_RADIUS <= this.y + this.h && testShot.x >= this.x && testShot.x <= this.x + this.w) {
			this.destroyed = true;
			this.dropLoot = true;
			testShot.weaponActive = false;
		}	
	}

	this.lootDrop = function () {
		if(this.dropLoot == true) {
			this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
			console.log("ast loot rate:" + this.rn);
			if(this.rn == 1) {
				speedPU.active = true;
				speedPU.x = this.x;
				speedPU.y = this.y;
				speedPU.draw();
				speedPU.move();
			}
		}
	}

	this.respawn = function() {
		this.destroyed = false;
		this.dropLoot = false;
		speedPU.pickedUP = false;
		this.y = -50;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
	}

	this.playerCollisionDetection = function() {
		if(this.destroyed == false && p1.x + PLAYER_SHIP_WIDTH >= this.x && p1.x <= this.x + this.w && p1.y <= this.y + this.h && p1.y + PLAYER_SHIP_HEIGHT >= this.y) {
			this.destroyed = true;
			p1.substractShield();
			this.respawn();
		}
	}

	this.readyToRemove = function() {
		return (this.hp <= 0 || this.y > c.height);
	}
}