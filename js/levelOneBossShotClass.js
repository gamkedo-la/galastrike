
var startingAngleBossLaser = 180;
var rotateLaser = true;

// WeaponType, ship center X, Ship Y
function levelOneBossShotClass(shotPosX, shotPosY, shotWeaponType) {
	this.weaponType = shotWeaponType;
	this.x = shotPosX;
	this.y = shotPosY;
	this.w;
	this.h;
	this.shotR = 10;
	this.shotActive = false;
	this.shotReloadRate;
	this.shootSpeed;
	this.laserStartingPoint = startingAngleBossLaser;
	this.rotatingLaser = rotateLaser;
	this.shotAngle;
	this.laserHitTime;
	this.atomActive;


		switch (this.weaponType) {
			case 'basic':
				this.w = 4;
				this.shotReloadRate = 500;
				this.shootSpeed = 10;
				//playBasicShootingSound();
				break;
			case 'laser':
				this.w = 30;
				this.h = c.height;
				this.shotAngle = this.laserStartingPoint;
				this.shotReloadRate = 60; // sets the duration of the laser
				this.laserHitTime = 20; //frametime for collision check
				this.shootSpeed = 0;
				playMidShootingSound();
				break;
			case 'atom':
				this.w = 10;
				this.removeAlienHp = 5;
				this.shotReloadRate = 80;
				this.shootSpeed = 20;
				this.atomActive = false;
				playMidShootingSound();
				break;
		}	
	
	this.draw = function() {
		
		if(this.shotActive == true) {
			switch (this.weaponType) {
				case 'basic':
					ctx.drawImage(imageArray["bossBasicWeapon.png"], this.x, this.y);
					break;
				case 'laser':
					playLaserSound();
					drawAngledLaserBeamLine(imageArray["boss_laser.png"], this.x, this.y, this.shotAngle);
					break;
				case 'atom':
					if (!this.atomActive) {
						drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_atom_1.png"], this.x, this.y, 0);
					} else {
						drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_atom_2.png"], this.x, this.y, 0);
					}
					break;
			}
			
			//colorRect(this.x, this.y, this.w, this.h, 'white');
		}		
	}
		

	this.move = function() {
		if (this.shotActive == true) {

			if (this.weaponType == 'basic') {
				this.y += this.shootSpeed;

			} else if (this.weaponType == 'laser') {
				this.x = this.x;
				this.y = this.y;
				this.shotReloadRate--;
				if(this.rotatingLaser) {
					this.shotAngle++;
				}

			} else if (this.weaponType == 'atom' && this.atomActive == false) {
				this.y += this.shootSpeed;
			}
		}
		this.shotCheck();
	}

	this.shotCheck = function() { //called by this.move
		if (this.weaponType == 'basic') {
			if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
				this.shotActive = false;
				p1.getHit();
			}
			//checking screen boundaries
			if (this.y > c.height) {
				this.shotActive = false;
				this.y = p1.y;
			}

		}

		if(this.weaponType == 'atom') {
			if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
				this.deactivate();
				p1.getHit();
			}
		}
		else if(this.shotReloadRate > 0){
			//collision check for the laser
			if(this.shotReloadRate % this.laserHitTime == 0){
				for (var i = 0; i < (c.height * 2) / this.w; i++) {
					var theX = (this.x) - Math.cos(this.shotAngle * Math.PI / 180) * (this.w) * i;
					var theY = (this.y) - Math.sin(this.shotAngle * Math.PI / 180) * (this.w) * i;
					//colorCircle(theX,theY,15,'red');
					if (p1.collisionCheck(false, theX, theY, this.w/2)) {
							p1.getHit();
							break;
					}
				}			
			}
		} else if (!(this.shotReloadRate > 0)) {
			this.shotActive = false;
		}
	}

	this.deactivate = function () {
		//atom will deactive themself after shotreloadRate time is over
		if (this.weaponType == 'atom') {
			this.atomActive = true;
			this.w = 350;
		}
	}

}