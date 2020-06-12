
// WeaponType, ship center X, Ship Y
function levelOneBossShotClass(shotPosX, shotPosY) {
	this.weaponType = 'basic';
	this.x = shotPosX;
	this.y = shotPosY;
	this.shotR = 10;
	this.w = 10;
	this.h = 30;
	this.shotActive = false;
	this.shotReloadRate;
	this.shootSpeed;


		switch (this.weaponType) {
			case 'basic':
				this.w = 4;
				this.h = 20;
				this.shotReloadRate = 500;
				this.shootSpeed = 10;
				//playBasicShootingSound();
				break;
		}	
	
	this.draw = function() {
		
		if(this.shotActive == true) {
			ctx.drawImage(imageArray["bossBasicWeapon.png"], this.x, this.y);
				//colorRect(this.x, this.y, this.w, this.h, 'white');	
		}		
	}
		

	this.move = function() {
		if(this.shotActive == true) {
			this.y += this.shootSpeed;
  
		this.shotCheck();
		}
	}
  
	this.shotCheck = function() { //called by this.move
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotR)) {
			this.shotActive = false;
			p1.getHit();
		}
		
		//checking screen boundaries
		if(this.y >= c.height) {
			this.shotActive = false;
			//this.y = p1.y;			
		}
	}

}