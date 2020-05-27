function weaponPowerUp() {

	this.x = null;
	this.y = null;
	this.w = 20;
	this.h = 20;
	this.ySpeed = 1;

	this.active = false;

	this.setup = function(posX, posY) {
		this.active = true;
		this.x = posX;
		this.y = posY;
	}

	this.draw = function() {
		if(this.active) {
			colorRect(this.x, this.y, this.w, this.h, 'pink');
			this.itemPlayerCollision();	
		}
	}

	this.move = function() {
		if(this.active) {
			this.y += this.ySpeed;
		}
	}

	this.itemPlayerCollision = function() {
		if(this.active) {
			if(p1.x + PLAYER_SHIP_WIDTH >= this.x && p1.x <= this.x + this.w && p1.y <= this.y + this.h && p1.y + PLAYER_SHIP_HEIGHT >= this.y) {
				this.reset();
				p1.weaponUpgrade();
			}
		}
	}

	this.reset = function() {
		this.active = false;
		this.x = null;
		this.y = null;
	}
}