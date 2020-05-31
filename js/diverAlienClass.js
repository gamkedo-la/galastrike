
const DIVER_ALIEN_HP = 2;

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

	this.hp = DIVER_ALIEN_HP;
	this.respawnTimer = 60;
	this.enteredScreen = false;
	this.dive = false;

	this.dropLoot = false;
	this.lootRate = 1; // = 1/5 of the time loot drops when enemy dies


	this.draw = function() {
	
		colorRect(this.x, this.y, this.w, this.h, 'red');
		colorText(this.hp, this.x + 60, this.y, "18px arial", "orange"); // hp indicator
		
	}

	this.move = function() {
		//movement ai	

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
			if(this.x < p1.x - 10) {
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

	this.shotHitMeCheck = function(testShot) {
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

	this.collitionDetection = function() {
		if(this.x >= p1.x && this.x+this.w <= p1.x+PLAYER_SHIP_WIDTH && this.y >= p1.y && this.y <= p1.y+PLAYER_SHIP_HEIGHT) {
			this.dive = false;
			p1.getHit();
		}

		if(this.y >= c.height) {
			this.dive = false;
		}
	}

	this.lootDrop = function () {
		this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
		console.log("a3 loot rate:" + this.rn);
		if(this.rn == 1) {
			this.dropLoot = true;
		}
	}

	this.readyToRemove = function() {
		return (this.hp <= 0 || this.y > c.height);
	}
}