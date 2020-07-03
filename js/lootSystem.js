
function spawnLoot(objX, objY, ...lootType) {
	var lootItem = new lootItemClass(objX, objY, lootType[Math.ceil(Math.random() * lootType.length)]);
	lootItem.active = true;
	this.lootList.push(lootItem);

}

function lootItemClass(objX, objY, lootType) {

	this.x = objX;
	this.y = objY;
	this.r = 20;
	this.ySpeed = 4;

	this.active = false;

	//default item amount weapons:
	this.wpMid = 10;
	this.wpLaser = 5;
	this.wpAtom = 1;
	this.wpBasic = 10;

	//default item amount PowerUps:
	this.puSpeed = 120;
	this.puShield = 1;

	this.draw = function () {
		if (this.active) {
			switch (lootType) {
				case 'mid':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_mid.png"], this.x, this.y, 0);
					break;
				case 'laser':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_laser.png"], this.x, this.y, 0);
					break;
				case 'atom':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_atom.png"], this.x, this.y, 0);
					break;
				case 'speed':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_speed.png"], this.x, this.y, 0);
					break;
				case 'shield':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_shield.png"], this.x, this.y, 0);
					break;
				case 'basic':
					drawBitmapCenteredAtLocationWithRotation(imageArray["pickupItem_basic.png"], this.x, this.y, 0);
					break;
			}
		}
	}


	this.move = function () {

		if (this.active) {
			this.y += this.ySpeed;
			this.itemPlayerCollision();
		}
	}

	this.itemPlayerCollision = function () {
		if (this.active) {
			if (p1.collisionCheck(true, this.x, this.y, this.r)) {
				playPickUpSound();
				switch (lootType) {
					case 'mid':
						p1.addWeapon("mid", this.wpMid);
						ui.messageToShow = ui.ammo;
						break;
					case 'laser':
						p1.addWeapon("laser", this.wpLaser);
						ui.messageToShow = ui.ammo;
						break;
					case 'atom':
						p1.addWeapon("atom", this.wpAtom);
						ui.messageToShow = ui.ammo;
						break;
					case 'speed':
						p1.addSpeed(this.puSpeed);
						ui.messageToShow = ui.speedBurst;
						break;
					case 'shield':
						p1.addShield(this.puShield);
						ui.messageToShow = ui.shield;
						break;
					case 'basic':
						p1.addWeapon("basic", this.wpBasic);
						ui.messageToShow = ui.ammo;
				}
				this.active = false;
			}
		}
	}

	this.readyToRemove = function () {
		return (this.active == false || this.y > c.height);
	}
}
