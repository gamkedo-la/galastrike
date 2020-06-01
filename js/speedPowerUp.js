

function speedPowerUp() {

	this.x = 300;
	this.y = 500;
	this.w = 20;
	this.h = 20;
	this.sy = 1;

	this.active = true;
	this.pickedUP = false;

	this.draw = function() {
		if(this.active == true) {
			if(this.pickedUP == false) {
				colorRect(this.x, this.y, this.w, this.h, 'orange');
				this.itemPlayerCollision();	
			}
		}
	}

	this.move = function() {
		if(this.active == true) {
			if(this.pickedUP == false) {
				this.y += this.sy;
			}
		}
	}

	this.itemPlayerCollision = function() {
		if(this.active == true) {
			if(p1.collisionCheck(true, this.x, this.y, this.w, this.h)) {
				this.pickedUP = true;
				if(this.pickedUP == true) {
					p1.addSpeed(120);
					this.active = false;
				}
			}
		}
	}
}