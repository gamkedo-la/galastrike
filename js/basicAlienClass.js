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
			//colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'green');
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

		this.collitionDetection();

		if (this.shotActive == true) {
			this.shotY += this.shotSpeed;
			this.shotCheck();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		// Shot doesn't hit the weapon power up

		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 5, this.y, this.w, this.h) ||	//alien body
			collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x + 40, this.y + 64, this.r)) {		//alien round plate on front
			theShot.weaponActive = false;
			theShot.y = p1.y;
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0) {
				this.lootDrop();
				p1.playerScoring();
				playDestroyedEnemyMidSound();
			}
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

	this.collitionDetection = function () {
		if (p1.collisionCheck(false, this.x + 5, this.y, this.w, this.h) ||	//alien body
			p1.collisionCheck(false, this.x + 40, this.y + 64, this.r)) {		//alien round plate on front
			p1.getHit();
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

	this.readyToRemove = function () {
		return (this.hp <= 0 || this.y > c.height);
	}
}
