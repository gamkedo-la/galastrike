
function explosion(radius = 5, duration = 10, shrinkFactor = 7) {	
	this.x = 0;
    this.y = 0;    
    
    this.explode = false;
	this.explosionRemovalCountdown = duration;
	this.explosionRemovalCountdownNow = this.explosionRemovalCountdown;
	this.explosionRadius = radius;
	this.explosionRadiusNow = this.explosionRadius;
	this.explosionShrinkFactor = shrinkFactor;

	this.draw = function () {    
        if (this.explode == true) {
            if (this.explosionRemovalCountdownNow > 0) {
                let color;
                if (this.explosionRadiusNow <= 50 * 1.05) {
                    this.explosionRadiusNow += this.explosionShrinkFactor;					
                }
                else {
                    this.explosionRadiusNow -= this.explosionShrinkFactor;					
                }

                color = 'red';
                color = Math.random() > 0.5 ? 'orange' : 'yellow';
                color = Math.random() > 0.25 ? 'white' : color;					
                                
                colorCircle(this.x + Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 5, this.y - Math.random() * 5, this.explosionRadiusNow, color);
                colorCircle(this.x - Math.random() * 5, this.y + Math.random() * 5, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 15, this.y - Math.random() * 15, this.explosionRadiusNow, color);
                colorCircle(this.x - Math.random() * 15, this.y + Math.random() * 15, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
                colorCircle(this.x + Math.random() * 20, this.y - Math.random() * 20, this.explosionRadiusNow, color);
                colorCircle(this.x - Math.random() * 20, this.y + Math.random() * 20, this.explosionRadiusNow, color);
                            
                this.explosionRemovalCountdownNow--;
            }
            if (this.explosionRemovalCountdownNow <= 0) {                
                this.explode = false;
                this.explosionRemovalCountdownNow = this.explosionRemovalCountdown;
            }
        }
    }

	this.move = function(x, y) {
        this.x = x;
		this.y = y;
    }
    
    this.explode = function() {
        this.explode = true;
    }

	this.done = function() {
		return this.explosionRemovalCountdownNow <= 0;
	}
}