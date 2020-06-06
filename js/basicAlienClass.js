const ALIEN_SPAWN_POSY = -100;
const BASIC_ALIEN_HP = 2;

function basicAlienClass() {

	this.x = 50;
	this.y = ALIEN_SPAWN_POSY;
	this.h = 70;
	this.w = 60;
	this.r = 20;
	this.sx = 0;
	this.sy = 4;
	this.bottomLine = 300; // distance from bottom of screen
	this.screenBuffer = 20;

	this.hp = BASIC_ALIEN_HP;
	this.respawnTimer = 60;
	this.destroyed = false;

	this.dropLoot = false;
	this.lootRate = 1; // = 1/5 of the time loot drops when enemy dies
	this.lootYDrift = 1; // spped at which loot drifts to bottom of screen

	this.shotX;
	this.shotY;
	this.shotR = 10;
	this.shotActive = false;
	this.shotSpeed = 5;


	this.draw = function () {
		ctx.drawImage(imageArray["enemyAalt.png"], this.x, this.y);
		colorText(this.hp, this.x + 70, this.y, "18px arial", "orange"); // hp indicator

		if (this.shotActive == true) {
			drawBitmapCenteredAtLocationWithRotation(imageArray["enemyAalt_shot.png"], this.shotX, this.shotY, 0);
		}
		this.basicShot();
	}

	this.move = function () {
		//movement ai
		this.x += this.sx;
		this.y += this.sy;

		if (this.x >= c.width - this.w - this.screenBuffer) {
			this.sx = -this.sx;
		}

		if (this.x <= 0 + this.screenBuffer) {
			this.sx = -this.sx;
		}

		this.playerCollitionDetection();

		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}
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

		if (this.shotY >= c.height) {
			this.shotActive = false;
		}
	}

	this.shotCheck = function () {
		if (p1.collisionCheck(false, this.shotX, this.shotY, this.shotR)) {
			this.shotActive = false;
			p1.getHit();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 5, this.y, this.w, this.h) ||	//alien body
			collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 40, this.y + 64, this.r)) {		//alien round plate on front
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0) {
				this.onDestroyed();
			}
		}
	}

	this.playerCollitionDetection = function () {
		if (p1.collisionCheck(false, this.x + 5, this.y, this.w, this.h) ||	//alien body
			p1.collisionCheck(false, this.x + 40, this.y + 64, this.r)) {	//alien round plate on front
			p1.getHit();
			this.hp--;
			if (this.hp <= 0) {
				this.onDestroyed();
			}
		}
	}

	this.lootDrop = function () {
		this.rn = Math.round(Math.random() * ((this.lootRate) - 1) + 1);
		console.log("a1 loot rate:" + this.rn);

		if (this.rn == 1) {
			this.dropLoot = true;
			// Assign the position of the alien to the weapon upgrade power up and set it to active
			weaponPU.setup(this.x, this.y);
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;
		this.dropLoot = true;
		this.lootDrop();
		//p1.playerScoring(25); //needs to be fixed
		playDestroyedEnemyMidSound();
	}

	this.readyToRemove = function () {
		return (this.destroyed || this.y > c.height);
	}
}
