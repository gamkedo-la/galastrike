
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
	this.hpToChangeToFullyOnScreen = 99;

	this.shotX;
	this.shotY;
	this.shotW = 5;
	this.shotH = 10;
	this.shotActive = false;
	this.shotSpeed = 9;
	this.myShot = [];


	this.draw = function () {

		ctx.drawImage(imageArray["LV1_Boss.png"], this.x, this.y);
		colorText(this.hp, this.x + this.w, this.y + this.h - 150, "18px arial", "orange"); // hp indicator

		if (this.shotActive == true) {
			//colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'white');
		}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
	}

	this.move = function () {
		this.basicShot();
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
	
		this.collitionDetection();
		this.playerPushBack();

		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].move();
		}
	}

	this.fireShot = function (shotPosX, shotPosY) {
		var newShot = new levelOneBossShotClass(shotPosX, shotPosY);
		newShot.shotActive = true;
		this.myShot.push(newShot);
		this.reloadFrames = newShot.shotReloadRate;
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
			this.rn = Math.round(Math.random() * (30 - 1) + 1); 

			if (this.rn == 1) { // fiering from middle orb
				this.shotY = this.y + this.h - 100;
				this.shotX = this.x + this.w / 2;
				this.fireShot(this.shotX, this.shotY );
			}
				
			
			if (this.rn == 2) { //fiering from right orb			
				this.shotY = this.y + this.h - 40;
				this.shotX = this.x + 375;
				this.fireShot(this.shotX, this.shotY );
				//playBossShootingSound();
			}
			if (this.rn == 3) { //fiering from left orb
				this.shotY = this.y + this.h - 80;
				this.shotX = this.x + this.w / 2 - 180;
				this.fireShot(this.shotX, this.shotY );
				//playBossShootingSound();
			} 
		}
	
	

	this.shotCheck = function () {
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotW, this.shotH)) {
			this.shotActive = false;
			p1.getHit();
		}
	}

	var playerPushBack = false;
	var playerPushBackTimer = 0;
	this.collitionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
			p1.getHit();
			playerPushBack = true;
		}
	}

	this.playerPushBack = function() {
		if(playerPushBack) {
			//p1.y += 10;
			playerPushBackTimer ++;
			if(playerPushBackTimer <= 30) {
				p1.tempControlEnabled = true;
				p1.y +=10;
			}
			if(playerPushBackTimer > 31) {
				playerPushBack = false;
				p1.tempControlEnabled = false;
				playerPushBackTimer = 0;
			}

		}
	}

	this.readyToRemove = function () {
		return (this.hp < 0 || this.y > c.height);
	}
}
