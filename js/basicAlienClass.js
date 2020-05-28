const ALIEN_SPAWN_POSY = -100;
const BASIC_ALIEN_HP = 2;

function basicAlienClass() {

	this.x = 50;
	this.y = ALIEN_SPAWN_POSY;
	this.h = 50;
	this.w = 50;
	this.sx = 0;
	this.sy = 4;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = BASIC_ALIEN_HP;
	this.respawnTimer = 60;

	this.dropLoot = false;
	// this.lootX;
	// this.lootY;
	// this.lootW = 30;
	// this.lootH = 30;
	this.lootRate = 1; // = 1/5 of the time loot drops when enemy dies
	this.lootYDrift = 1; // spped at which loot drifts to bottom of screen

	this.shotX;
	this.shotY;
	this.shotW = 20;
	this.shotH = 20;
	this.shotActive = false;
	this.shotSpeed = 5;


	this.draw = function() {
		ctx.drawImage(imageArray["enemyAalt.png"], this.x, this.y);
		colorText(this.hp, this.x + 70, this.y, "18px arial", "orange"); // hp indicator

		if(this.shotActive == true) {
			ctx.drawImage(imageArray["enemyAalt_shot.png"], this.shotX, this.shotY);
			//colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'green');
		}
		this.basicShot();	
	}

	this.move = function() {
		//movement ai
		this.x += this.sx;
		this.y += this.sy;

		if(this.x >= c.width - this.w - this.screenBuffer) {
			this.sx = -this.sx;
		}

		if(this.x <= 0 + this.screenBuffer) {
			this.sx = -this.sx;
		}

		this.lootPickUp();		

		this.collitionDetection();
		
		if(this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}

		//this.respawnAlien();
	}

	this.shotHitMeCheck = function(testShot) {
		// Shot doesn't hit the weapon power up

		if(testShot.y <= this.y + this.h && testShot.x >= this.x && testShot.x <= this.x + this.w) {
			
			testShot.weaponActive = false;
			testShot.y = p1.y;
			this.hp -= testShot.removeAlienHp;

			if(this.hp <= 0) {
				this.lootDrop();
				p1.playerScoring();		
			}	
		}
	}

	this.basicShot = function() {
		if(this.shotActive == false) {
			this.rn = Math.round(Math.random() * (3 - 1) + 1); //15
			if(this.rn == 1) {
				this.shotActive = true;
				if (Math.floor(Math.random() * (1 - 0 +1)) + 0 == 0){
					this.shotY = this.y + 69 - this.shotW/2;
					this.shotX = this.x + 9 - this.shotH/2;
				}else{
					this.shotY = this.y + 69 - this.shotW/2;
					this.shotX = this.x + 69 - this.shotH/2;
				}
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
			//if(this.shotY >= p1.y - 20 && this.shotY <= p1.y + PLAYER_SHIP_HEIGHT/2 && this.shotX >= p1.x - 20 && this.shotX <= p1.x + PLAYER_SHIP_WIDTH + 20) 
			if (p1.playerSquareCollisionCheck(this.shotX, this.shotY,this.shotW,this.shotH)){
				this.shotActive = false;
				p1.playerLose();
			}
		}
	}

	this.respawnAlien = function() {
		if(this.dropLoot == false) {
			this.respawnTimer--;
			if(this.respawnTimer == 0) {
				this.hp = BASIC_ALIEN_HP;
				this.respawnTimer = 30;
				//this.x = Math.random() * (c.width - 150);
				this.y = ALIEN_SPAWN_POSY; 
			}
		}
	}

	this.collitionDetection = function() {
		if(this.x >= p1.x && this.x+this.w <= p1.x+PLAYER_SHIP_WIDTH && this.y >= p1.y && this.y <= p1.y+PLAYER_SHIP_HEIGHT) {
			p1.substractShield();
			if(p1.playerShields >= 0) {
				p1.playerLose();
			}
		}
	}

	this.lootDrop = function () {
		this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
		console.log("a1 loot rate:" + this.rn);

		if(this.rn == 1) {
			this.dropLoot = true;
			// Assign the position of the alien to the weapon upgrade power up and set it to active
			weaponPU.setup(this.x, this.y);
		}
	}

	this.lootPickUp = function() {
		if(this.lootX >= p1.x && this.lootX + this.lootW <= p1.x + PLAYER_SHIP_WIDTH && this.lootY >= p1.y && this.lootY <= p1.y + PLAYER_SHIP_HEIGHT) {
			this.dropLoot = false;
		}
	}

	this.readyToRemove = function() {
		return (this.hp <= 0 || this.y > c.height);
	}
}
