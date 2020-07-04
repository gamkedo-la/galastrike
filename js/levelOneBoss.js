
function levelOneBossClass() {

	this.x = 50;
	this.y = -500;
	this.h = 500;
	this.w = 600;
	this.sx = 4;
	this.sy = 4;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = 300;
	this.enteredScreen = false;
	this.fullyOnScreen = false;


	this.shotX;
	this.shotY;
	this.shotActive = false;

	this.myShot = [];
	this.hitImg = false;
	this.followPlayer = false;
	this.goToCenter = false;
	this.laserAttack = false;
	this.straightLaser = false;
	this.straightLaserActive = false;
	this.basicAttack = true;

	this.hpBarColor = 'green';
	this.dropLoot = false;
	this.lootDrop;
	


	this.draw = function () {

		ctx.drawImage(imageArray["LV1_Boss.png"], this.x, this.y);
		colorText(this.hp, this.x + this.w, this.y + this.h - 150, "18px arial", "orange"); // hp indicator
		colorRect(50, 40, 300, 20, 'white');
		colorRect(50, 41, 298, 18, 'black');
		colorRect(50, 40, this.hp, 20, this.hpBarColor);
		ctx.drawImage(imageArray["uiCenterBracket_Left.png"], 40, 30);
		ctx.drawImage(imageArray["uiCenterBracket_Right.png"], 350, 30);

		if(this.hp >= 50 && this.hp <= 120) {
			this.hpBarColor = 'yellow';
		}
		if(this.hp <= 49 ) {
			this.hpBarColor = 'red';
		}

		if(this.hitImg == true) {
				ctx.drawImage(imageArray["LV1_BossFlash.png"], this.x, this.y);
				this.hitImg = false;
			}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
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

		//handling boss ai based on hp
		switch(this.hp) {
			case 290:
				this.followPlayer = true;
				this.fullyOnScreen = true;
				this.dropLoot = true;
				break;

			case 200:
				this.followPlayer = false;
				this.goToCenter = true;
				break;

			case 150:
				this.basicAttack = false;
				this.followPlayer = true;
				this.straightLaser = true;
				this.hp = 149;
				this.dropLoot = false;
				break;

			case 100:
				this.laserAttack = true;
				this.straightLaser = false;
				this.basicAttack = true;
				this.followPlayer = true;
				this.dropLoot = true;
				break;
		}


		if (this.fullyOnScreen) {
			if(this.y < c.height/2 - this.h) {
				this.y += this.sy;
			}
		}

		if(this.followPlayer == true) {
			if(p1.x > this.x + this.w / 2) {
				this.x += 3;
			}
			if(p1.x < this.x + this.w / 2) {
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
		this.droppingLoot();

		for (var i = this.myShot.length - 1; i >= 0; i--) { //for loop goes backwards to not skip cause of the splice
			this.myShot[i].move();
			if (this.myShot[i].shotActive == false) {
				this.myShot.splice(i, 1);
			}
		}
		console.log(this.lootDrop);
	}

	this.droppingLoot = function() {
		if(this.dropLoot) {
			if(!this.lootDrop) {
				console.log('loot drop not working');
				
				spawnLoot(this.x + this.w/2, this.y + this.h/2,"shield"); 
				spawnLoot(this.x + this.w/2 + 60, this.y + this.h/2,"shield"); 
				spawnLoot(this.x + this.w/2 + 120, this.y + this.h/2,"shield"); 


				//boom.bigExplosion(this.x+this.w/2,this.y+this.h/2);
			}
			//this.dropLoot = false;
		}
		this.lootDrop = this.dropLoot;
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
				boom.bigImpact((this.x+this.w/2)+((Math.random() * this.w) - this.w/2),
					(this.y+this.h/2)+((Math.random() * this.h) - this.h/2));
            } else {
                boom.debrisBOSS(this.x+this.w/2,this.y+this.h/2);
				boom.bigExplosion(this.x+this.w/2,this.y+this.h/2);
				boom.bigExplosion(this.x+this.w,this.y+this.h/1.5);
				boom.bigExplosion(this.x,this.y+this.h/1.5);
				boom.bigExplosion(this.x+this.w/2,this.y+this.h/1.5);
            }
		}
	}

	var straighLaserTimer = 0;
		var straighLaserClock = false;
	this.basicShot = function () {
	

		if(this.basicAttack) { // basic shots
			this.rn2 = Math.round(Math.random() * (20 - 1) + 1); 
			if (this.rn2 == 1) { // fiering from middle orb
				this.shotY = this.y + this.h - 100;
				this.shotX = this.x + this.w / 2;
				this.fireShot(this.shotX, this.shotY, 'basic');
			}
			
			if (this.rn2 == 2) { //fiering from right orb			
				this.shotY = this.y + this.h - 40;
				this.shotX = this.x + 375;
				this.fireShot(this.shotX, this.shotY, 'basic');
				//playBossShootingSound();
			}

			if (this.rn2 == 3) { //fiering from left orb
				this.shotY = this.y + this.h - 80;
				this.shotX = this.x + this.w / 2 - 180;
				this.fireShot(this.shotX, this.shotY, 'basic');
				//playBossShootingSound();
			} 
		}

		if(this.laserAttack == true) {

			this.rn4 = Math.round(Math.random() * (60 - 1) + 1); 
			if(this.rn4 == 1) {
				this.fireLaser = true;

				if(this.fireLaser){
					this.rn3 = Math.round(Math.random() * (2 - 1) + 1); 
					if(this.rn3 == 1) {
							startingAngleBossLaser = 280;
						} else {
							startingAngleBossLaser = 180;
						}

					this.shotY = this.y + this.h - 100;
					this.shotX = this.x + this.w / 2;
					this.fireShot(this.shotX, this.shotY, 'laser');  // fiering from middle orb
					this.fireLaser = false;
				}
			}
		}	

		if(this.straightLaser) {

			this.rn = Math.round(Math.random() * (40 - 1) + 1); 
			if(this.rn == 1 && this.straightLaserActive == false) {
				straighLaserClock = true;
				startingAngleBossLaser = 270;
				rotateLaser = false;

				this.followPlayer = false;

				this.shotY = this.y + this.h - 100;
				this.shotX = this.x + this.w / 2;
				this.fireShot(this.shotX, this.shotY, 'laser');  // fiering from middle orb
			}
		
		}	
		if(straighLaserClock) {
			straighLaserTimer ++;
			console.log(straighLaserTimer);
			if(straighLaserTimer >= 120) {
				console.log("done");

				this.followPlayer = true;
				straighLaserClock = false;
				straighLaserTimer = 0;
				this.straightLaserActive = false;

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
