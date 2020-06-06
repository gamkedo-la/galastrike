
function levelOneBossClass() {

	this.x = 50;
	this.y = -500;
	this.h = 500;
	this.w = 600;
	this.sx = 4;
	this.sy = 4;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = 100;
	this.enteredScreen = false;
	this.fullyOnScreen = false;
	this.hpToChangeToFullyOnScreen = 90;

	this.dropLoot = false;
	this.lootX;
	this.lootY;
	this.lootW = 30;
	this.lootH = 30;
	this.lootRate = 1; // = 1/1 of the time loot drops when enemy dies
	this.lootYDrift = 1; // speed at which loot drifts to bottom of screen

	this.shotX;
	this.shotY;
	this.shotW = 5;
	this.shotH = 10;
	this.shotActive = false;
	this.shotSpeed = 9;


	this.draw = function () {

		ctx.drawImage(imageArray["LV1_Boss.png"], this.x, this.y);
		colorText(this.hp, this.x + this.w, this.y + this.h - 150, "18px arial", "orange"); // hp indicator

		if (this.shotActive == true) {
			colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'white');
		}
		this.basicShot();
		

		if (this.dropLoot == true) {
			colorRect(this.lootX, this.lootY, this.lootW, this.lootH, 'green');
		}
	}

	this.move = function () {
		//movement ai

		if (this.enteredScreen == false) {
			this.x = c.width / 2 - this.w / 2;
			this.y += this.sy;
			if (this.y + this.h >= 200) {
				this.enteredScreen = true;
			}
		}

		if (this.enteredScreen == true) {
			this.x = this.x;
			this.y = this.y;
		}

		if (this.fullyOnScreen) {
			if(this.y < c.height/2 - this.h) {
				this.y += this.sy;
			}
		}
	

		if (this.dropLoot == true) {
			this.lootY += this.lootYDrift;
		}

		this.collitionDetection();
		this.lootPickUp();

		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y, this.w, this.h)) {
			theShot.deactivate(theShot);
			this.hp --;
			if(this.hp <= this.hpToChangeToFullyOnScreen) {
				this.fullyOnScreen = true;
			}
		}
	}

	this.basicShot = function () {
		if (this.shotActive == false) {
			this.rn = Math.round(Math.random() * (3 - 1) + 1);
			if (this.rn == 2) { // fiering from middle orb
				this.shotActive = true;
				this.shotY = this.y + this.h - 100;
				this.shotX = this.x + this.w / 2;
				//playBossShootingSound();
			}
			if (this.rn == 3) { //fiering from right orb
				this.shotActive = true;
				this.shotY = this.y + this.h - 40;
				this.shotX = this.x + 375;
				//playBossShootingSound();
			}
			if (this.rn == 1) { //fiering from left orb
				this.shotActive = true;
				this.shotY = this.y + this.h - 80;
				this.shotX = this.x + this.w / 2 - 180;
				//playBossShootingSound();
			}
		}

		if (this.shotY >= c.height) {
			this.shotActive = false;
		}
	}

	this.shotCheck = function () {
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotW, this.shotH)) {
			this.shotActive = false;
			p1.getHit();
		}
	}

	this.collitionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
			p1.getHit();
			console.log("add player collision bounce to player");
		
		}
	}

	this.lootDrop = function () {
		this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
		console.log("a1 loot rate:" + this.rn);
		if (this.rn == 1) {
			this.dropLoot = true;
			this.lootX = this.x;
			this.lootY = this.y;
		}
	}

	this.lootPickUp = function () {
		if (this.lootX >= p1.x && this.lootX + this.lootW <= p1.x + PLAYER_SHIP_WIDTH && this.lootY >= p1.y && this.lootY <= p1.y + PLAYER_SHIP_HEIGHT) {
			p1.weaponUpgrade();
			this.dropLoot = false;
		}
	}

	this.readyToRemove = function () {
		return (this.hp < 0 || this.y > c.height);
	}
}
