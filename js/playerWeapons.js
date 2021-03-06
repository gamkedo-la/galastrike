
// WeaponType, ship center X, Ship Y
function playerShotClass(weaponType, ship) {
	this.weaponType = weaponType;
	this.x = ship.x + PLAYER_SHIP_WIDTH / 2;
	this.y = ship.y;
	this.w;
	this.h;
	this.shotActive = false;
	this.removeAlienHp;
	this.shotReloadRate;
	this.shootSpeed;
	this.atomActive;

	switch (this.weaponType) {
		case 'basic':
			this.w = 4;
			this.removeAlienHp = 1;
			this.shotReloadRate = 5;//Math.max(5, Math.abs(ship.weapons[0][1] - 100) / 2);
			this.shootSpeed = 20;
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
			this.w = 30;
			this.h = c.height;
			this.removeAlienHp = 5;
			this.shotReloadRate = 200;
			this.shootSpeed = 0;
			break;
		case 'atom':
			this.w = 10;
			this.removeAlienHp = 5;
			this.shotReloadRate = 80;
			this.shootSpeed = 20;
			this.atomActive = false;
			playMidShootingSound();
			break;
		case 'chris':
			this.w = 66;
			this.h = c.height;
			this.removeAlienHp = 5;
			this.shotReloadRate = 300;
			this.shootSpeed = 0;
			playMidShootingSound();
			break;

	}

	this.draw = function () {
		if (this.shotActive == true) {
			switch (this.weaponType) {
				case 'basic':
					drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_basic.png"], this.x, this.y, 0);
					break;
				case 'mid':
					drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_mid.png"], this.x, this.y, 0);
					break;
				case 'laser':
					playLaserSound();
					drawLaserBeamLine(imageArray["shot_laser1.png"], ship.x + PLAYER_SHIP_WIDTH / 2, ship.y);
					break;
				case 'atom':
					if (!this.atomActive) {
						drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_atom_1.png"], this.x, this.y, 0);
					} else {
						drawBitmapCenteredAtLocationWithRotation(imageArray["weapon_atom_2.png"], this.x, this.y, 0);
					}
					break;
				case 'chris':
					drawLaserBeamLine(imageArray["shot_laser2.png"], ship.x + PLAYER_SHIP_WIDTH / 2 - 18, ship.y + 43);
					drawLaserBeamLine(imageArray["shot_laser2.png"], ship.x + PLAYER_SHIP_WIDTH / 2 + 18, ship.y + 43);
					break;
			}
		}
	}


	this.move = function () {

		if (this.shotActive == true) {

			if (this.weaponType == 'basic' || this.weaponType == 'mid') {
				this.y -= this.shootSpeed;

			} else if (this.weaponType == 'laser') {
				this.x = ship.x + PLAYER_SHIP_WIDTH / 2 - 15;
				this.y = ship.y - c.height;

			} else if (this.weaponType == 'chris') {
				this.x = ship.x + PLAYER_SHIP_WIDTH / 2 - 33;
				this.y = ship.y - c.height;

			} else if (this.weaponType == 'atom' && this.atomActive == false) {
				this.y -= this.shootSpeed;
			}

			this.shotCheck();
		}
	}

	this.shotCheck = function () { //note called by this.move
		for (var i = 0; i < enemyList.length; i++) {
			if (!enemyList[i].destroyed) {
				enemyList[i].shotHitMeCheck(this);
			}
		}
		for (var i = 0; i < astList.length; i++) {
			if(!astList[i].destroyed) {
				astList[i].shotHitMeCheck(this);
			}
		}
		for (var i = 0; i < satList.length; i++) {
			if(!satList[i].destroyed) {
				satList[i].shotHitMeCheck(this);
			}
		}

		if (this.weaponType == 'basic' || this.weaponType == 'mid') {
			//checking screen boundaries
			if (this.y <= 0) {
				this.shotActive = false;
				this.y = p1.y;
			}

		} else if (!(ship.reloadFrames > 0)) {
			this.shotActive = false;
			this.y = p1.y;
		}

	}

	this.deactivate = function () {
		//Lasers and atom will deactive themself after shotreloadRate time is over
		if (this.weaponType == 'basic' || this.weaponType == 'mid') {
			this.shotActive = false;
			this.y = p1.y;
		} else if (this.weaponType == 'atom') {
			this.atomActive = true;
			this.w = 350;
		}
	}

}// end of player basic shot class