
// WeaponType, ship center X, Ship Y
function playerShotClass(weaponType, ship) {
	this.weaponType = weaponType;
	this.x = ship.x + PLAYER_SHIP_WIDTH/2;
	this.y = ship.y;
	this.w;
	this.h;
	this.shotActive = false;
	this.removeAlienHp;
	this.shotReloadRate;
	this.shootSpeed;

		switch (this.weaponType) {
			case 'basic':
				this.w = 3;
				this.removeAlienHp = 1;
				this.shotReloadRate = 10;
				this.shootSpeed = 10;
				playBasicShootingSound();
				break;
			case 'mid':
				this.w = 10;
				this.removeAlienHp = 5;
				this.shotReloadRate = 6;
				this.shootSpeed = 20;
				playMidShootingSound();
				break;
			case 'laser':
				this.w = 20;
				this.h = -c.height;
				this.removeAlienHp = 5;
				this.shotReloadRate = 60;
				this.shootSpeed = 20;
				playMidShootingSound();
				break;
		}	
	
	this.draw = function() {
		if(this.shotActive == true) {
			switch (this.weaponType) {
				case 'basic':
					colorCircle(this.x , this.y, 3, 'white');
					break;
				case 'mid':
					colorCircle(this.x , this.y, 10, 'red');
					break;
				case 'laser':
					console.log(this.w + " " + this.h)
					drawLaserBeamLine(imageArray["enemyAalt_shot.png"],ship.x + PLAYER_SHIP_WIDTH/2, ship.y);
					break;
			}			
		}		
	}
		

	this.move = function() {
		if(this.shotActive == true) {
			if(this.weaponType != 'laser'){
			this.y -= this.shootSpeed;
			}
			this.shotCheck();
			this.shotReloadRate--;
		}		
	}

	this.shotCheck = function() { //note called by this.move
		for(var i=0; i<enemyList.length; i++) {
			enemyList[i].shotHitMeCheck(this);
		}

		//checking screen boundaries
		if(this.y <= 0) {
			this.shotActive = false;
			this.y = p1.y;			
		}
	}

	this.deactivate = function (){
		if (this.weaponType != 'laser'){
		this.shotActive = false;
		this.y = p1.y;
		}
	}

}// end of player basic shot class