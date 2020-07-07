function spawnSatellites() {
	var sat = new satellites();

	this.rn = Math.round(Math.random() * (2 - 1) + 1); //handling spawning with different satellite arts.
	switch(this.rn) {
		case 1:
			sat.satType = 'human';
			sat.satArt = imageArray["satellite_human.png"];
			sat.satHitImg = imageArray["satellite_humanFlash.png"];
			sat.w = 120;
			sat.h = 33;
			break;
		case 2:
			sat.satType = 'alien';
			sat.satArt = imageArray["Alien_Satellite.png"];
			sat.satHitImg = imageArray["Alien_SatelliteFlash.png"];
			sat.w = 64;
			sat.h = 64;
			break;
		}

	sat.x = c.width * Math.random() - 250;
	this.satList.push(sat);
}

function satellites() {
	
	this.satType;
	this.x = 500;
	this.y = 0;
	this.w;
	this.h;
	this.r = 13;
	this.sy = 3;
	this.hp = 3;
	this.destroyed = false; // also used in playerWeapon.js
	this.explosion = new explosion(15, 17, 12, 'yellow', 'red', 'green');
	this.lootDropRate = 1;
	this.hitImg = false;
	this.satArt;
	this.satHitImg;
	this.rotation = 0.0;

	this.draw = function () {
		if (!this.destroyed) {
			if(this.satType == 'alien'){
				drawBitmapCenteredAtLocationWithRotation(this.satArt, this.x, this.y, this.rotation);
			}else if (this.satType == 'human'){
				ctx.drawImage(this.satArt, this.x, this.y);
			}

			if(this.hitImg == true) {
				if(this.satType == 'alien'){
					drawBitmapCenteredAtLocationWithRotation(this.satHitImg, this.x, this.y, this.rotation);
				}else if (this.satType == 'human'){
					ctx.drawImage(this.satHitImg, this.x, this.y);
				}
				this.hitImg = false;
			}
		}
		this.explosion.draw();
	}

	this.move = function () {
		this.y += this.sy;
		this.playerCollisionDetection();
		this.explosion.move(this.x + this.w * 0.5, this.y + this.h * 0.5);

		if (this.y >= c.height) {
			//this.respawn();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if 	((this.satType == 'human' && (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 48, this.y + 60, this.r) ||
			 collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y + 12, this.w, this.h))) ||
			(this.satType == 'alien' && collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + this.w/2, this.y + this.w/2, this.w))){
		
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
            this.hitImg = true;
            
            boom.smallImpact(this.x+this.w/2,this.y+this.h/2);

			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}

		}
	}

	this.playerCollisionDetection = function () {
		
		if 	((this.satType == 'human' && (p1.collisionCheck(false, this.x + 48, this.y + 60, this.r) || p1.collisionCheck(false, this.x, this.y + 12, this.w, this.h))) ||
			(this.satType == 'alien' && p1.collisionCheck(false, this.x + this.w/2, this.y + this.w/2, this.w))) {
				while(this.hp > 0) {
					p1.getHit();
					this.hp--;
					if (!this.destroyed && this.hp <= 0)
						this.onDestroyed();
					if(p1.playerShields <= 0) break;
				}
			}
	}

	this.onDestroyed = function(){
		this.destroyed = true;
    
        boom.smallExplosion(this.x+this.w/2,this.y+this.h/2);
        boom.debrisC(this.x+this.w/2,this.y+this.h/2);

		spawnLoot(this.x+this.w/2, this.y+this.h, "speed","shield","mid");
		
		p1.addToScore(10); //needs to be fixed
		playDestroyedEnemyMidSound();
		this.explosion.explode();
	}

	this.respawn = function () {	
		this.hp = 1;
		this.destroyed = false;
		
		this.y = -50;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
		this.explosion = this.explosion ? new explosion() : this.explosion;
	}

	this.readyToRemove = function () {
		return ((this.destroyed && this.explosion.done()) || this.y > c.height);
	}
}