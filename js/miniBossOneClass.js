function miniBossOne() {
	
	this.x = 50;
	this.y = -500;
	this.h = 300;
	this.w = 200;
	this.sx = 4;
	this.sy = 4;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = 150;
	this.hpBarColor = 'green';
	this.showHpBar = false;

	this.enteredScreen = false;
	this.fullyOnScreen = false;
	this.followPlayer = false;
	this.goToCenter = false;

	this.shotX;
	this.shotY;
	this.shotActive = false;
	this.myShot = [];
	this.hitImg = false;

	this.resetAtomicWeaponClock = 0;
	this.resetAtomicWeaponTimer = false;
	this.atomicWeaponTimer = 1000;
	this.basicShotOdds = 30; // the lower the number the faster the shooting speed
	this.atomicWeaponActive = false;
	


	this.draw = function () {
		this.showHpBar = true;

		ctx.drawImage(imageArray["miniBossOne.png"], this.x, this.y);
		colorText(this.hp, this.x + this.w, this.y + this.h - 150, "18px arial", "orange"); // hp indicator
		if(this.showHpBar == true) { // making hp bar only appear when class is call, works better with level handling/spawning
			colorRect(50, 40, 150, 20, 'white');
			colorRect(50, 41, 149, 18, 'black');
			colorRect(50, 40, this.hp, 20, this.hpBarColor);
			ctx.drawImage(imageArray["uiCenterBracket_Left.png"], 40, 30);
			ctx.drawImage(imageArray["uiCenterBracket_Right.png"], 200, 30);
		}
		

		if(this.hitImg == true) {
				ctx.drawImage(imageArray["miniBossOneFlash.png"], this.x, this.y);
				this.hitImg = false;
			}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
	}

	this.move = function () {
		console.log (this.resetAtomicWeaponClock);
		//movement ai

		if (this.fullyOnScreen == false) {
			this.x = c.width/2 - this.w/2;
			this.y += this.sy;
			if (this.y + this.h >= 350) {
				this.fullyOnScreen = true;
			}
		}

		if (this.fullyOnScreen == true) {
			this.x = this.x;
			this.y = this.y;
		}

		//handling boss ai based on hp
		switch(this.hp) {
			case 130:
				this.followPlayer = true;
				this.atomicWeaponActive = true;
				this.basicShotOdds = 30;
				this.atomicWeaponTimer = 600; 
				spawnLoot(this.x, this.y,"shield"); 
				break;

			case 100:
				this.followPlayer = false;
				this.goToCenter = true;
				this.atomicWeaponTimer = 300; 
				this.basicShotOdds = 20;
				break;

			case 50:
				this.goToCenter = false;
				this.followPlayer = true;
				this.basicShotOdds = 30;
				this.atomicWeaponTimer = 100; 
				break;
			}

		if(this.followPlayer == true) {
			if(p1.x > this.x  ) {
				this.x += 3;
			}
			if(p1.x < this.x ) {
				this.x -= 3;
			}
		}

		if(this.goToCenter == true) {
			
			if(this.x > c.width/2 - this.w/2) {
				this.x -= 3;
			}

			if(this.x < c.width / 2 - this.w / 2) {
				this.x += 3;
			}

			if(this.x == c.width / 2 - this.w / 2) {
				this.goToCenter = false
			}
		}

		
		this.basicShot();
		this.collitionDetection();
		this.playerPushBack();

		for (var i = this.myShot.length - 1; i >= 0; i--) { //for loop goes backwards to not skip cause of the splice
			this.myShot[i].move();
			if (this.myShot[i].shotActive == false) {
				this.myShot.splice(i, 1);
			}
		}
	}
	
	this.fireShot = function (shotPosX, shotPosY, shotWeaponType) {
		var newShot = new levelOneBossShotClass(shotPosX, shotPosY, shotWeaponType);
		newShot.shotActive = true;
		this.myShot.push(newShot);
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y, this.w, this.h)) {
			theShot.deactivate(theShot);
			this.hp --;
            this.hitImg = true;
            
            if (this.hp>0) {
                boom.bigImpact(this.x+this.w/2,this.y+this.h/2);
            } else {
                boom.debrisBOSS(this.x+this.w/2,this.y+this.h/2);
                boom.smallExplosion(this.x+this.w/2,this.y+this.h/2);
            }

		}
	}

	this.basicShot = function () {
			this.rn = Math.round(Math.random() * (this.basicShotOdds - 1) + 1); 
			this.rnAtom = Math.round(Math.random() * (10 - 1) + 1); 

			if (this.rn == 1) { // fiering from middle orb
				this.shotY = this.y + this.h/2;
				this.shotX = this.x + this.w / 2;
				this.fireShot(this.shotX, this.shotY, 'basic');
			}
				
			
			if (this.rn == 2) { //fiering from right orb			
				this.shotY = this.y + this.h/2;
				this.shotX = this.x + this.w/2 +30;
				this.fireShot(this.shotX, this.shotY, 'basic');
				//playBossShootingSound();
			}

			if (this.rnAtom == 1 && !this.atomicWeaponActive) { //fiering from left orb
				this.shotY = this.y + this.h - 80;
				this.shotX = this.x + this.w / 2;
				this.fireShot(this.shotX, this.shotY, 'atom');
				this.atomicWeaponActive = true;
				this.resetAtomicWeaponTimer = true;
				//playBossShootingSound();
			} 

			this.resetAtomicWeapon(this.atomicWeaponTimer);
		}


	this.resetAtomicWeapon = function(timer) {
		if(this.resetAtomicWeaponTimer) {
			this.resetAtomicWeaponClock ++;
			if(this.resetAtomicWeaponClock >= timer) {
				this.atomicWeaponActive = false;
				this.resetAtomicWeaponClock = 0;
				this.resetAtomicWeaponTimer = false;
			}
		}	
	}




	this.playerBackPush = false;
	this.playerPushBackTimer = 0;
	this.collitionDetection = function () {
		if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
			p1.getHit();
			this.playerBackPush = true;
		}
	}

	this.pushbackVariable = 20;
	this.playerPushBack = function() {
		if(this.playerBackPush) {
			ui.messageToShow = ui.stabilizing;
			//p1.y += 10;
			this.playerPushBackTimer ++;
			this.pushbackVariable --;
			if(this.playerPushBackTimer <= 10) {
				p1.tempControlEnabled = true;
				p1.y += this.pushbackVariable;
			}
			if(this.playerPushBackTimer > 60) {
				this.playerBackPush = false;
				p1.tempControlEnabled = false;
				this.playerPushBackTimer = 0;
				this.pushbackVariable = 20;
			}
		}
	}

	this.readyToRemove = function () {
		return (this.hp < 0 || this.y > c.height);
	}
}