function shieldPowerUp() {
	
	this.x = 300;
	this.y = 500;
	this.w = 100;
	this.h = 100;

	this.pickedUP = false;

	this.draw = function() {
		if(this.pickedUP == false) {
			colorRect(this.x, this.y, this.w, this.h, 'red');
			this.itemPlayerCollision();
		}
	}

	this.itemPlayerCollision = function() {
		if(p1.x + PLAYER_SHIP_WIDTH >= this.x && p1.x <= this.x + this.w && p1.y <= this.y + this.h && p1.y + PLAYER_SHIP_HEIGHT >= this.y) {
			this.pickedUP = true;
			p1.addShield();
		}
	}
}