function lootItem() {

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
			if(p1.collisionCheck(true,  this.x, this.y, this.w, this.h)) {
				this.pickedUP = true;
				if(this.pickedUP == true) {
					p1.addSpeed(120);
					this.active = false;
				}
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