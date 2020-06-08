const MID_ALIEN_HP = 3;

function midAlienClass() {

	this.x = 200;
	this.y = 100;
	this.h = 98;
	this.w = 88;
	this.sx = 6;
	this.sy = 6;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = MID_ALIEN_HP;
	this.respawnTimer = 60;

	this.lootDropRate = 2;

	this.shotX;
	this.shotY;
	this.shotW = 10;
	this.shotH = 20;
	this.shotActive = false;
	this.shotSpeed = 10;

	this.followRail = -1;
	this.railPt = 0;
	this.ang = 0;

	this.draw = function () {
		drawBitmapCenteredAtLocationWithRotation(imageArray["enemyB.png"], this.x, this.y, this.ang);
		//ctx.drawImage(imageArray["enemyB.png"], this.x, this.y);
		//colorRect(this.x, this.y, this.w, this.h, 'white');
		colorText(this.hp, this.x + 90, this.y, "18px arial", "orange"); // hp indicator

		if (this.shotActive == true) {
			colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'white');
		}

		if (this.dropLoot == true) {
			colorRect(this.lootX, this.lootY, this.lootW, this.lootH, 'green');
		}
	}

	this.move = function () {
		//movement ai
		this.x += this.sx;
		this.y += this.sy;

		this.basicShot();
		this.playerCollisionDetection();

		if (this.dropLoot == true) {
			this.lootY += this.lootYDrift;
		}

		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}
		if (this.fallowRail != -1 && this.railPt < railList[this.followRail].length) {
			var goalX = railList[this.followRail][this.railPt].x * c.width;
			var goalY = railList[this.followRail][this.railPt].y * c.height;

			this.ang = Math.atan2(goalY - this.y, goalX - this.x);
			this.sx = Math.cos(this.ang) * 4;
			this.sy = Math.sin(this.ang) * 4;

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
		}
	}

	this.basicShot = function () {
		if (this.shotActive == false) {
			this.rn = Math.round(Math.random() * (15 - 1) + 1);
			if (this.rn == 1) {
				this.shotActive = true;
				this.shotY = this.y + 80;
				this.shotX = this.x + 40;
			}
		}

		if (this.shotY >= c.height) {
			this.shotActive = false;
		}
	}

	this.shotCheck = function () {
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotW, this.shotH)) {
			this.shotActive = false;
			p1.getHit();
		}
	}

	
	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 24, this.y + 15, 48, 30) ||		//upper alien body
			collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 24, this.y + 45, 32, 45)) {		//lower alien body
				
				theShot.deactivate();
				this.hp -= theShot.removeAlienHp;
				if (this.hp <= 0) {
					this.onDestroyed();
				}

		}
	}

	this.playerCollisionDetection = function () {
		if (p1.collisionCheck(false, this.x + 24, this.y + 15, 48, 30) || 	//upper alien body
			p1.collisionCheck(false, this.x + 24, this.y + 45, 32, 45)) {	//lower alien body	
				
				p1.getHit();
				this.hp--;
				if (this.hp <= 0) {
					this.onDestroyed();
				}

		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;

		if(Math.round(Math.random() * this.lootDropRate) == 1){
			spawnLoot(this.x + this.w/2, this.y + this.h/2, "mid","laser","atom","speed","shield");
		}

		//p1.playerScoring(25); //needs to be fixed
		playDestroyedEnemyMidSound();
	}

	this.readyToRemove = function () {
		return (this.destroyed || this.y > c.height);
	}
}

