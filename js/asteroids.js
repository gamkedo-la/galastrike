
function asteroids() {

	this.x = 100;
	this.y = 0;
	this.r = 20;
	this.sy = 5;

	this.draw = function() {
		colorCircle(this.x, this.y, this.r, 'orange');
	}

	this.move = function() {
		this.y += this.sy;

		if(this.y >= c.height) {
			this.y = -100;
			this.x = Math.round(Math.random() * (c.width - 1) + 1);
		}
	}
}