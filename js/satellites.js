
function satellites() {

	this.x = 500;
	this.y = 0;
	this.w = 20;
	this.h = 40;
	this.sy = 3;

	this.draw = function() {
		colorRect(this.x, this.y, this.w, this.h, 'purple');
	}

	this.move = function() {
		this.y += this.sy;

		if(this.y >= c.height) {
			this.y = -100;
			this.x = Math.round(Math.random() * (c.width - 1) + 1);
		}
	}
}