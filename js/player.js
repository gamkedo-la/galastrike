const PLAYER_SHIP_WIDTH = 144; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 110; //current height of pixel art 
const AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM = 160;
const MIN_DIST_FROM_SCREEN_BOTTOM = 160;
const WIN_SCORE = 100;
var playerScore = 0;

var playerShieldRadius;
var shieldRotationSpeed = 0;

function playerClass() {

	// start position depends on canvas size
	this.x = c.width / 2 - PLAYER_SHIP_WIDTH / 2;
	this.y = c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM;

	this.sy = 5;
	this.sx = 10;

	this.playerShields = 100; //Not more then 5!
	this.speedBuffer = false;
	this.shieldActive = true;
	this.invincible = false;
	this.invincibleTimer = 0;
	this.myShot = [];
	this.weaponTier = "Basic";
	this.shotReloadRate = 6; //lower the number the more shots
	// Amount of special ammo we have, start with 0 to use basic ammo
	this.specialAmmo = 0;
	this.reverseSpeed = 3;
	this.reloadFrames = 0;
	this.speedBurstCountdown = 0;

	this.fireShot = function () {
		// Only basic and mid weapons for now

		// There's no more special ammo, go back to normal ammo
		if (this.specialAmmo <= 0) {
			this.weaponTier = 'Basic';
		} else {
			// We still have special ammo, so continue to use it
			this.weaponTier = 'Mid';
			this.specialAmmo--;
		}

		var newShot;
		// Amount of hp to remove from an alien with each shot
		var removeAlienHp;

		// Check what kind of weapon we have
		switch (this.weaponTier) {
			case 'Basic':
				removeAlienHp = 1;
				this.shotReloadRate = 6;
				newShot = new playerShotClass('white', removeAlienHp,3);
				playBasicShootingSound();
				break;
			case 'Mid':
				removeAlienHp = 5;
				// Take a little less time to shoot again
				this.shotReloadRate = 3;
				newShot = new playerShotClass('red', removeAlienHp,5);
				playMidShootingSound();
				break;
		}

		// console.log(`this.weaponTier: ${this.weaponTier}, this.specialAmmo: ${this.specialAmmo}, this.shotReloadRate: ${this.shotReloadRate}`);

		newShot.weaponActive = true;
		newShot.x = this.x + PLAYER_SHIP_WIDTH / 2;
		this.myShot.push(newShot);
		this.reloadFrames = this.shotReloadRate;
	}

	this.draw = function () {
		//space ship
		ctx.drawImage(imageArray["PlayerSpaceship.png"], this.x, this.y);
		//ship shield
		if (this.shieldActive) {
			switch (this.playerShields) {
				case 5:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, shieldRotationSpeed);
					if (this.playerShields == 5) playerShieldRadius = 190 / 2;
				case 4:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_4.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, -shieldRotationSpeed);
					if (this.playerShields == 4) playerShieldRadius = 180 / 2;
				case 3:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_3.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, shieldRotationSpeed);
					if (this.playerShields == 3) playerShieldRadius = 170 / 2;
				case 2:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_2.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, -shieldRotationSpeed);
					if (this.playerShields == 2) playerShieldRadius = 160 / 2;
				case 1:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_1.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, shieldRotationSpeed);
					if (this.playerShields == 1) playerShieldRadius = 150 / 2;
				case 0:
					break;
				case 6:
					if (this.playerShields == 6) playerShieldRadius = 190 / 2;
					if (this.invincibleTimer > 100 ){
						drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5-super.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, shieldRotationSpeed);
					}else if (this.invincibleTimer % 5 != 0){
						drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5-super.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, shieldRotationSpeed);
					}
					break;
			}
		}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
	}

	this.move = function () {
		this.handleInput();

		if(p1.invincible){
			p1.reduceInvincibleTimer();
		}
	
		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].move();
		}
		for (var i = this.myShot.length - 1; i >= 0; i--) { //for loop goes backwards to not skip cause of the splice
			if (this.myShot[i].weaponActive == false) {
				this.myShot.splice(i, 1);
			}
		}

		this.moveShield();
		this.spaceshipAutoReverse();
		this.speedBurst();
	}

	this.moveShield = function () { // called by this.move
		shieldRotationSpeed += .02;
	}

	this.addShield = function (amount) {
		
		if (amount === undefined){
			this.playerShields++;
		}else{
			this.playerShields += amount;
		}

		if(this.playerShields >= 6){
			this.playerShields = 6;
			this.invincible = true;
			//set invincible duration time here
			this.invincibleTimer = 300;
		}

		this.shieldActive = true;
	}

	this.reduceInvincibleTimer = function(){
		this.invincibleTimer--;
		if (this.invincibleTimer <= 0){
			this.playerShields = 5;
			this.invincible = false;			
		}

	}

	this.getHit = function (amount){
		if(!this.invincible || !this.shieldActive){
			if (!this.shieldActive){
				this.playerLose();
				return;
			}

			if (amount === undefined){
				this.playerShields--;
			}else{
				this.playerShields -= amount;
			}

			if(this.playerShields == 0){
				this.shieldActive = false;
				return;
			}else if(this.playerShields < 0){
				this.playerLose();
			}
		}
	}

	this.playerLose = function () {
		mode = GAME_OVER;
	}

	this.collisionCheck = function (ignoreShield, colliderX, colliderY, colliderW_R, colliderH) {
		var noseYStart = 15;
		var noseW = 24;
		var noseH = 30;
		var bodyW = 132;
		var bodyH = 40;

		if (this.playerShields > 0 && ignoreShield == false && this.shieldActive) { //checked against Shield
			return (collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, playerShieldRadius));
		} else { //checked against playership
			if (collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2 - noseW / 2, this.y + noseYStart, noseW, noseH) ||	//check against the playership Nose part
				collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2 - bodyW / 2, this.y + noseYStart + noseH, bodyW, bodyH)) { 	//check aginst the playership body part 
				return true;
			}
		}
	}

	this.spaceshipAutoReverse = function () {
		if (this.y <= (c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM) && this.speedBuffer) {
			this.y += this.reverseSpeed;
		}

		// don't go off screen past the bottom either (due to a screen resize etc)
		if (this.y > c.height - PLAYER_SHIP_HEIGHT)
			this.y = c.height - PLAYER_SHIP_HEIGHT; // maybe use autoreverse Y instead?
	}

	this.playerScoring = function () {
		playerScore++;
		if (playerScore >= WIN_SCORE) {
			mode = WIN_SCREEN;
		}
	}

	this.playerScore = function () {
		colorText("W Type: " + this.weaponTier, c.width - 120, c.height - 110, "15px arial", "orange"); // debug output - remove
		colorText("Speed: " + this.sy, c.width - 120, c.height - 90, "15px arial", "orange"); // debug output - remove
		colorText("Speed Timer: " + this.speedBurstCountdown, c.width - 120, c.height - 70, "15px arial", "orange"); // debug output - remove
		colorText("ShotCount: " + this.myShot.length, c.width - 120, c.height - 50, "15px arial", "orange"); // debug output - remove
		colorText("Score: " + playerScore, c.width - 120, c.height - 30, "15px arial", "white");
		colorText("Shields: " + this.playerShields, c.width - 120, c.height - 10, "15px arial", "white");
	}

	this.handleInput = function () {
		this.speedBuffer = (holdUp == false);
		slowStarField = this.speedBuffer;
		if (holdLeft) {
			this.moveLeft();
		}

		if (holdRight) {
			this.moveRight();
		}

		if (holdUp) {
			this.moveUp();
		}

		if (holdDown) {
			this.moveDown();
		}

		if (this.reloadFrames > 0) {
			this.reloadFrames--;
		}
		else if (holdSpace) {
			this.fireShot();
		}

	}

	//player movement handling

	this.moveUp = function () {
		if (this.y >= c.height / 5) {
			this.y -= this.sy;
		}

		if (starFieldSpeed <= STARFIELD_TOP_SPEED) {
			starFieldSpeed += STARFIELD_ACCELERATION;
		}
	}

	this.moveDown = function () {
		if (this.y <= c.height - MIN_DIST_FROM_SCREEN_BOTTOM) {
			this.y += this.sy;
		}
	}

	this.moveLeft = function () {
		if (this.x >= 20) {
			this.x -= this.sx;
		}
	}

	this.moveRight = function () {
		if (this.x <= c.width - PLAYER_SHIP_WIDTH - 20) {
			this.x += this.sx;
		}
	}

	this.addSpeed = function (time) {
		console.log("speed Burst!");
		this.speedBurstCountdown += time;

	}

	this.speedBurst = function () {
		if (this.speedBurstCountdown >= 1) {
			this.speedBurstCountdown--;
			this.sy = 20;
			this.sx = 20;
		}
		else {
			this.sy = 5;
			this.sx = 10;
			this.speedBurstCountdown = 0;
		}
	}

	this.weaponUpgrade = function () {
		// Change weapon type
		this.weaponTier = "Mid";
		// Amount of special ammo we have 
		this.specialAmmo = 3;
	}
}