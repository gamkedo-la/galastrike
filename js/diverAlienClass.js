
function diverAlienClass() {

	this.x = 400;
	this.y = ALIEN_SPAWN_POSY;
	this.h = 50;
	this.w = 50;
	this.sx = 4;
	this.sy = 4;
	this.speedDiveY = 10;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.alienActive = true;
	this.respawnTimer = 60;
	this.enteredScreen = false;
	this.dive = false;

	this.shotX;
	this.shotY;
	this.shotW = 10;
	this.shotH = 20;
	this.shotActive = false;
	this.shotSpeed = 10;


	this.draw = function() {
		if(this.alienActive == true) {
			colorRect(this.x, this.y, this.w, this.h, 'red');

		}
	}

	this.move = function() {
		//movement ai
		if(this.alienActive == true) {

			if(this.enteredScreen == false) {
				//this.x = 400;
				this.y += this.sy;
				if(this.y >= 200) {
					this.enteredScreen = true;
				}
			}

			if(this.enteredScreen == true) {
				if(this.x > p1.x - 10) {
					this.x -= 3;
				}
				if(this.x < p1.x - 30) {
					this.x +=3;
				}
			
				this.y = this.y;
				this.rn = Math.round(Math.random() * (25 - 1) + 1); // odds determining when alien will dive towards player
				if(this.rn == 1) {
					this.dive = true;

				}
				// need to implement player seeking code
				if(this.dive) {
					this.y += this.speedDiveY;
				}

			}
			this.collitionDetection();
		}
	}

	this.respawnAlien = function() {
		if(this.alienActive == false) {
			this.respawnTimer--;
			if(this.respawnTimer == 0) {
				this.alienActive = true;
				this.enteredScreen = false;
				this.respawnTimer = 30;
				this.x = Math.random()* (c.width - 150);
				this.y = ALIEN_SPAWN_POSY; 
			}
		}
	}

	this.collitionDetection = function() {
		if(this.x >= p1.x && this.x+this.w <= p1.x+PLAYER_SHIP_WIDTH && this.y >= p1.y && this.y <= p1.y+PLAYER_SHIP_HEIGHT) {
			this.dive = false;
			this.alienActive = false;
			p1.substractShield();
			if(p1.playerShields >= 0) {
				p1.playerLose();
			}
		}

		if(this.y >= c.height) {
			console.log("respawn");
			this.alienActive = false;
			this.dive = false;
			this.respawnAlien();
		}
	}
}