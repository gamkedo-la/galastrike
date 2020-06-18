
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
				this.shotReloadRate = 60; // sets the duration of the laser
				this.shootSpeed = 0;
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
					drawLaserBeamLine(imageArray["shot_laser1.png"], this.x + this.w/2, this.y + c.height);
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
			}
		this.shotCheck();
		}
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
		}else if(this.shotReloadRate > 0){
			if (p1.collisionCheck(false, this.x, this.y, this.w, this.h)) {
				if(this.shotReloadRate % 15 == 0){
					p1.getHit();
				}
			}
		} else if (!(this.shotReloadRate > 0)) {
			this.shotActive = false;
		}
	}

}