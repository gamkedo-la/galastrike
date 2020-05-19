
function asteroids() {
	

	this.x = 800;
	this.y = 0;
	this.r = 20;
	this.sy = 5;
	this.destroyed = false; // also used in playerWeapon.js
	this.dropLoot = false; // inserted in playerWeapon.js
	this.lootRate = 1;

	this.draw = function() {
		if(this.destroyed == false){
			colorCircle(this.x, this.y, this.r, 'orange');	
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
		if(this.dropLoot == true) {
			this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
			//console.log("ast loot rate:" + this.rn);
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
			this.y = -100;
			this.x = Math.round(Math.random() * (c.width - 80) + 80);
	}

	this.playerCollisionDetection = function() {
		if(this.destroyed == false && p1.x + PLAYER_SHIP_WIDTH >= this.x + this.r && p1.x <= this.x + this.r && p1.y <= this.y + this.r && p1.y + PLAYER_SHIP_HEIGHT >= this.y + this.r) {
			this.destroyed = true;
			p1.substractShield();
			this.respawn();
		}
	}
}