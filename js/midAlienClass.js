const MID_ALIEN_HP = 3;

function midAlienClass() {

	this.x = 200;
	this.y = 100;
	this.h = 50;
	this.w = 50;
	this.sx = 6;
	this.sy = 6;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = MID_ALIEN_HP;
	this.alienActive = true;
	this.respawnTimer = 60;
	this.enteredScreen = false;

	this.dropLoot = false;
	this.lootX;
	this.lootY;
	this.lootW = 30;
	this.lootH = 30;
	this.lootRate = 1; // = 1/5 of the time loot drops when enemy dies
	this.lootYDrift = 1; // spped at which loot drifts to bottom of screen

	this.shotX;
	this.shotY;
	this.shotW = 10;
	this.shotH = 20;
	this.shotActive = false;
	this.shotSpeed = 10;


	this.draw = function() {
		if(this.alienActive == true) {
			ctx.drawImage(imageArray["enemyB.png"], this.x, this.y);
			//colorRect(this.x, this.y, this.w, this.h, 'white');
			colorText(this.hp, this.x + 90, this.y, "18px arial", "orange"); // hp indicator

			if(this.shotActive == true) {
				colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'white');
			}
			this.basicShot();
		}
		if(this.dropLoot == true) {
			colorRect(this.lootX, this.lootY, this.lootW, this.lootH, 'green');
		}
	}

	this.move = function() {
		//movement ai
		if(this.alienActive == true) {

			if(this.enteredScreen == false) {
				this.x = 200;
				this.y += this.sy;
				if(this.y >= 200) {
					this.enteredScreen = true;
				}
			}

			if(this.enteredScreen == true) {
				this.x += this.sx;
				this.y += this.sy;

				if(this.y >= c.height-this.bottomLine ) {
					this.sy = 0;
				}

				if(this.x >= c.width - this.w - this.screenBuffer) {
					this.sx = -this.sx;
				}

				if(this.x <= 0 + this.screenBuffer) {
					this.sx = -this.sx;
				}

				if(this.y >= c.height-this.bottomLine) {
					this.rn = Math.round(Math.random() * (25 - 1) + 1);
					if(this.rn == 1) {
						this.sy = -4;
					}
				}

				if(this.y <= 0 + this.screenBuffer) {
					this.sy = 0;
					this.rn = Math.round(Math.random() * (25 - 1) + 1);
					if(this.rn == 1) {
						this.sy = 4;
					}
				}	
			}
		}

		if(this.dropLoot == true) {
			this.lootY += this.lootYDrift;
		}

		this.collitionDetection();
		this.lootPickUp();
		
		if(this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}
	}

	this.basicShot = function() {
		if(this.shotActive == false) {
			this.rn = Math.round(Math.random() * (15 - 1) + 1);
			if(this.rn == 1) {
				this.shotActive = true;
				this.shotY = this.y;
				this.shotX = this.x;
			} 
		}

		if(this.shotY >= c.height) {
			this.shotActive = false;
		}
	}

	this.shotCheck = function() {

		if(playerShields != 0) {
			if(this.shotY >= p1.y - 20 && this.shotY <= p1.y + PLAYER_SHIP_HEIGHT/2 && this.shotX >= p1.x - 20 && this.shotX <= p1.x + PLAYER_SHIP_WIDTH + 20) {
				this.shotActive = false;
				this.shotY = this.y;
				p1.substractShield();
			}
		}

		if(playerShields >= 0) {
			if(this.shotY >= p1.y - 20 && this.shotY <= p1.y + PLAYER_SHIP_HEIGHT/2 && this.shotX >= p1.x - 20 && this.shotX <= p1.x + PLAYER_SHIP_WIDTH + 20) {
				this.shotActive = false;
				p1.playerLose();
			}
		}
	}

	this.respawnAlien = function() {
		if(this.alienActive == false) {
			if(this.dropLoot == false) {
				this.respawnTimer--;
				if(this.respawnTimer == 0) {
					this.hp = MID_ALIEN_HP;
					this.alienActive = true;
					this.enteredScreen = false;
					this.respawnTimer = 30;
					//this.x = c.width/2;
					this.y = -100; 
				}
			}
		}
	}

	this.collitionDetection = function() {
		if(this.x >= p1.x && this.x+this.w <= p1.x+PLAYER_SHIP_WIDTH && this.y >= p1.y && this.y <= p1.y+PLAYER_SHIP_HEIGHT) {
			this.alienActive = false;
			p1.substractShield();
			if(p1.playerShields >= 0) {
				p1.playerLose();
			}
		}
	}

	this.lootDrop = function () {
		this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
		console.log("a2 loot rate:" + this.rn);
		if(this.rn == 1) {
			this.dropLoot = true;
			this.lootX = this.x;
			this.lootY = this.y;
		}
	}

	this.lootPickUp = function() {
		if(this.lootX >= p1.x && this.lootX + this.lootW <= p1.x + PLAYER_SHIP_WIDTH && this.lootY >= p1.y && this.lootY <= p1.y + PLAYER_SHIP_HEIGHT) {
			this.dropLoot = false;
		}
	}
}

