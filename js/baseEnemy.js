function baseEnemy() {
	this.x = 200;
	this.y = 100;
	this.shotX;
	this.shotY;
	this.shotW = 10;
	this.shotH = 20;
	this.shotActive = false;
	this.shotSpeed = 10;
	this.sx = 6;
	this.sy = 6;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;
	this.destroyed = false;
	this.followRail = -1;
	this.railPt = 0;
	this.ang = 0;
	this.hp = 1;
	this.lootDropRate = 2;
	this.explosion = null;
	this.imgName = "pickupItem_shield.png";
	this.imgShotName = "enemyAalt_shot.png";
	this.scoreValue = 10;
	this.h = 70; // related to explosion need to look into it
	this.w = 60; 
	this.r = 20;

	this.init = function() {
		console.log("baseEnemy Super Class init call");
		this.explosion = new explosion(20, 20, 18, 'yellow', 'red', 'blue');
	}

	this.move = function() {
		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}

		if(!this.explosion.done()){
			this.explosion.move(this.x + this.w * 0.5, this.y + this.h * 0.5);
		}

		if (!this.destroyed) {
			//movement ai
			this.x += this.sx;
			this.y += this.sy;

			this.basicShot();
			this.playerCollisionDetection();

			if (this.fallowRail != -1 && this.railPt < railList[this.followRail].length) {
				var goalX = railList[this.followRail][this.railPt].x * c.width;
				var goalY = railList[this.followRail][this.railPt].y * c.height;

				this.ang = Math.atan2(goalY - this.y, goalX - this.x);
				this.sx = Math.cos(this.ang) * 4;
				this.sy = Math.sin(this.ang) * 4;

				if(this.railPt == 0) {
					this.x = goalX;
					this.y = goalY;
				}

				if (roundShapeCollisionWithRoundShape(this.x, this.y, 10, goalX, goalY, 10)) {
					this.railPt++;
				}
				return;
			}

			if (this.y >= c.height - this.bottomLine) {
				this.sy = 0;
			}

			if (this.x >= c.width - this.w - this.screenBuffer) {
				this.sx = -this.sx;
			}

			if (this.x <= 0 + this.screenBuffer) {
				this.sx = -this.sx;
			}

			if (this.y >= c.height - this.bottomLine) {
				this.rn = Math.round(Math.random() * (25 - 1) + 1);
				if (this.rn == 1) {
					this.sy = -4;
				}
			}

			if (this.y <= 0 + this.screenBuffer) {
				this.sy = 0;
				this.rn = Math.round(Math.random() * (25 - 1) + 1);
				if (this.rn == 1) {
					this.sy = 4;
				}
			} //off screen
		}//!this.destroy
	}// end of this.move

	this.draw = function() {
		if (!this.destroyed) {
			//this.ang = Math.PI;
			drawBitmapCenteredAtLocationWithRotation(imageArray[this.imgName], this.x, this.y, this.ang);
			//ctx.drawImage(imageArray["enemyB.png"], this.x, this.y);
			//colorRect(this.x, this.y, this.w, this.h, 'white');
			colorText(this.hp, this.x + 90, this.y, "18px arial", "orange"); // hp indicator
		}

		if (this.shotActive == true) {
			drawBitmapCenteredAtLocationWithRotation(imageArray[this.imgShotName], this.shotX, this.shotY, 0);
		}
		this.explosion.draw();
	}

	this.basicShot = function () {
		if (this.shotActive == false) {
			this.rn = Math.round(Math.random() * (6 - 1) + 1); //15
			if (this.rn == 1) {
				this.shotActive = true;
				if (Math.floor(Math.random() * (1 - 0 + 1)) + 0 == 0) {
					this.shotY = this.y + 69;
					this.shotX = this.x + 9;
				} else {
					this.shotY = this.y + 69;
					this.shotX = this.x + 69;
				}
			}
		}
	}

	this.shotCheck = function () {
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotW, this.shotH)) {
			this.shotActive = false;
			p1.getHit();
		}else if(this.shotY >= c.height) {
			this.shotActive = false;
		}
	}
	this.collisionShape = function(theShot) {
		return collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 24, this.y + 15, 48, 30) ||		//upper alien body
				collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 24, this.y + 45, 32, 45); 		//lower alien body	
	}
	
	this.shotHitMeCheck = function (theShot) {
		if(!this.destroyed){
			if (this.collisionShape(theShot)) {		
					theShot.deactivate();
					this.hp -= theShot.removeAlienHp;
					if (this.hp <= 0) {
						this.onDestroyed();
					}
			}
		}
	}

	this.playerCollisionShape = function() {
		return p1.collisionCheck(false, this.x + 24, this.y + 15, 48, 30) || 	//upper alien body
			p1.collisionCheck(false, this.x + 24, this.y + 45, 32, 45)//lower alien body	
	}

	this.playerCollisionDetection = function () {
		if (this.playerCollisionShape()) {	
			p1.getHit();
			this.hp--;
			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;

		if(Math.round(Math.random() * this.lootDropRate) == 1){
			spawnLoot(this.x + this.w/2, this.y + this.h/2, "mid","laser","atom","speed","shield");
		}

		p1.addToScore(this.scoreValue); //needs to be fixed
		playDestroyedEnemyMidSound(); // not yet different for each enemy
		this.explosion.explode();
	}

	this.readyToRemove = function () {
		return ((this.destroyed && this.explosion.done() && !this.shotActive) || this.y > c.height);
	}
}