
function satellites() {

	this.x = 500;
	this.y = 0;
	this.w = 20;
	this.h = 40;
	this.sy = 3;
	this.destroyed = false; // also used in playerWeapon.js
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;

	this.draw = function() {
		if(this.destroyed == false) {
			colorRect(this.x, this.y, this.w, this.h, 'purple');
		}
		if(this.destroyed == true) {
			this.lootDrop();
		}
	}

	this.move = function() {
		this.y += this.sy;
		this.playerCollisionDetection();

		if(this.y >= c.height) {
			this.respawn();
		}
	}

	this.lootDrop = function () {
					console.log ("Working");
		if(this.dropLoot == true) {
			this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
			console.log("ast loot rate:" + this.rn);
			if(this.rn == 1) {
				shieldPU.active = true;
				shieldPU.x = this.x;
				shieldPU.y = this.y;
				shieldPU.draw();
				shieldPU.move();
			}
		}
	}

	this.respawn = function() {
		this.destroyed = false;
		this.dropLoot = false;
		shieldPU.pickedUP = false;
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
}