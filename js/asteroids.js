
function asteroids() {

	this.x = 100;
	this.y = 0;
	this.r = 20;
	this.sy = 5;
	this.destroyed = false;

	this.draw = function() {
		if(this.destroyed == false){
			colorCircle(this.x, this.y, this.r, 'orange');	
		}

		this.respawn();
	}

	this.move = function() {
		this.y += this.sy;

		if(this.y >= c.height) {
			this.y = -100;
			this.x = Math.round(Math.random() * (c.width - 50) + 50);
		}
	}

	this.respawn = function() {
		if(this.destroyed == true) {
			this.destroyed = false;
			this.y = -100;
			this.x = Math.round(Math.random() * (c.width - 50) + 50);
		}
	}
}