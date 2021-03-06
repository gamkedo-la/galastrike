const PLAYER_SHIP_WIDTH = 144; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 110; //current height of pixel art 
const AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM = 200;
const MIN_DIST_FROM_SCREEN_BOTTOM = 200;
const SIDE_SCREEN_BUFFER = 120;
const WIN_SCORE = 10000000000;
let a,b;
let playerScore = 0;
let allHighScores = [];
for(i=0; i<10; i++){
	allHighScores.push(0);
};
if(window.localStorage.getItem('score0') != null){
	for(var i=0; i<allHighScores.length; i++){
		allHighScores[i] = window.localStorage.getItem('score' + i );
	} 
}
function playerClass() {

	// start position depends on canvas size
	this.x = c.width / 2 - PLAYER_SHIP_WIDTH / 2;
	this.y = c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM;

	this.sy = 5;
	this.sx = 10;
	this.playerShields = 5; //Not more then 5!
	this.shieldRotationSpeed = 0;
	this.playerShieldRadius;
	this.shieldActive = true;
	this.invincible = false;
	this.invincibleTimer = 0;
	this.chrisCode = false;
	this.speedBuffer = false;
	this.reverseSpeed = 3;
	this.speedBurstCountdown = 0;
	this.testangle = 0;
	this.myShot = [];
	this.basicWeaponMaxNumberShot = 31;
	this.weapons = [["basic", this.basicWeaponMaxNumberShot], ["mid", 0], ["laser", 0], ["atom", 0], ["chris", 0]]; //Leave chris at 0!! Use cheatcode "chris" if you want to use it.
	this.reloadBasicWeaponAmount = 2;
	this.weaponCurrent;
	this.reloadFrames = 0;
	this.tempControlEnabled = false;
    this.outlineTimer = 0;
    this.ammoAmount;
	this.basicWeaponTimer = 0;
	this.explosion = new explosion(20, 20, 18, 'yellow', 'red', 'blue');
	
	this.trails = new trailsFX(); // plasma from the engines
	
	this.reset = function () {
		this.x = c.width / 2 - PLAYER_SHIP_WIDTH / 2;
		this.y = c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM;
		this.playerShields = 3; //5 is max
		this.shieldRotationSpeed = 0;
		this.shieldActive = true;
		this.invincible = false;
		this.invincibleTimer = 0;
		this.speedBuffer = false;
		this.reverseSpeed = 3;
		this.speedBurstCountdown = 0;
		this.myShot = [];
		this.weapons = [["basic", this.basicWeaponMaxNumberShot], ["mid", 0], ["laser", 0], ["atom", 0], ["chris", 0]];
		this.weaponCurrent = [0][0];
		this.reloadFrames = 0;
		this.outlineTimer = 0;
		this.basicWeaponTimer = 0;
		playerScore = 0;
	}

	this.fireShot = function () {
		var isWeaponEmpty = false;

		//Pick the weapon to use from the array
		for (var i = this.weapons.length - 1; i >= 0; i--) {
			if (this.weaponCurrent == this.weapons[i][0]) {

				if(i == 0 && this.weapons[i][1] <= 1)
					isWeaponEmpty = true;
				else
					this.weapons[i][1]--;
				
				break;
			}
		}

		//Generate and activate the bullet
		if(!isWeaponEmpty)
		{
			var newShot = new playerShotClass(this.weaponCurrent, this);
			newShot.shotActive = true;
			this.myShot.push(newShot);
			this.reloadFrames = newShot.shotReloadRate;
		}
	}

    this.draw = function () {
		this.trails.draw(this.x,this.y); // plasma from the engines

        // space ship
		if (this.chrisCode == false) {
			ctx.drawImage(imageArray["PlayerSpaceship.png"], this.x, this.y);
		} else {
			ctx.drawImage(imageArray["PlayerSpaceship_chris.png"], this.x, this.y);
		}
		// ship shield
		if (this.shieldActive) {
			switch (this.playerShields) {
				case 5:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.shieldRotationSpeed);
					if (this.playerShields == 5) this.playerShieldRadius = 190 / 2;
				case 4:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_4.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, -this.shieldRotationSpeed);
					if (this.playerShields == 4) this.playerShieldRadius = 180 / 2;
				case 3:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_3.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.shieldRotationSpeed);
					if (this.playerShields == 3) this.playerShieldRadius = 170 / 2;
				case 2:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_2.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, -this.shieldRotationSpeed);
					if (this.playerShields == 2) this.playerShieldRadius = 160 / 2;
				case 1:
					drawBitmapCenteredAtLocationWithRotation(imageArray["shield_1.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.shieldRotationSpeed);
					if (this.playerShields == 1) this.playerShieldRadius = 150 / 2;
				case 0:
					break;
				case 6:
					//ui.messageToShow = ui.invincible;
					if (this.playerShields == 6) this.playerShieldRadius = 190 / 2;
					if (this.invincibleTimer > 100) {
						drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5-super.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.shieldRotationSpeed);
					} else if (this.invincibleTimer % 5 != 0) {
						drawBitmapCenteredAtLocationWithRotation(imageArray["shield_5-super.png"], this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.shieldRotationSpeed);
					}
					break;
			}
		}
	
		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
		this.noShieldOutline();
	}

	this.move = function () {
		this.handleInput();
		//invinvible timer for the shield
		if (this.invincible) {
			this.reduceInvincibleTimer();
		}

		for (var i = 0; i < this.myShot.length; i++) {
			this.myShot[i].move();
		}
		for (var i = this.myShot.length - 1; i >= 0; i--) { //for loop goes backwards to not skip cause of the splice
			if (this.myShot[i].shotActive == false) {
				this.myShot.splice(i, 1);
			}
		}

		//set the current weapon
		for (var i = this.weapons.length - 1; i >= 0; i--) {
			if (this.weapons[i][1] > 0) {
				this.weaponCurrent = this.weapons[i][0];
				this.ammoAmount = this.weapons[i][1];
				if (i == 0) {
					this.basicWeaponTimer++;
				}
				break;
			}
		}
		//console.log(Math.max(10, this.basicWeaponTimer % this.weapons[0][1]))
		if(this.weaponCurrent == this.weapons[0][0] && this.weapons[0][1] < this.basicWeaponMaxNumberShot && this.basicWeaponTimer % Math.max(15, this.weapons[0][1]) == 0 && holdSpace == false){
			this.weapons[0][1] += this.reloadBasicWeaponAmount;
		}else if(this.weaponCurrent != this.weapons[0][0] && this.weapons[0][1] != this.basicWeaponMaxNumberShot ){
			this.weapons[0][1] = this.basicWeaponMaxNumberShot;
		}
		this.moveShield();
		this.spaceshipAutoReverse();
		this.speedBurst();
	}

	this.noShieldOutline = function() {
		
		if(!this.shieldActive) {
			this.outlineTimer ++;
			if(this.outlineTimer <= 10) {
				ctx.drawImage(imageArray["PlayerSpaceship_Outline.png"], this.x, this.y);
			} 
			if(this.outlineTimer >= 20) {
				this.outlineTimer = 0;
			}
		}
	}

	this.moveShield = function () { // called by this.move
		this.shieldRotationSpeed += .02;
	}

	this.getHit = function (amount) {
		if (!this.invincible || !this.shieldActive) {

            if (!this.shieldActive) {
				this.playerLose();
				return;
			}

			boom.bigImpact(this.x+PLAYER_SHIP_WIDTH/2,this.y+PLAYER_SHIP_HEIGHT/2);
			boom.smallExplosion(this.x+PLAYER_SHIP_WIDTH/2,this.y+PLAYER_SHIP_HEIGHT/2);
			playPlayerDamageSound();

			if (amount === undefined) {
				this.playerShields--;
			} else {
				this.playerShields -= amount;
			}

			if (this.playerShields == 0) {
				this.shieldActive = false;
				return;
			} else if (this.playerShields < 0) {
				this.playerLose();
			}
		}
	}

	this.collisionCheck = function (ignoreShield, colliderX, colliderY, colliderW_R, colliderH) {
		var noseYStart = 15;
		var noseW = 24;
		var noseH = 30;
		var bodyW = 132;
		var bodyH = 40;

		if (this.playerShields > 0 && ignoreShield == false && this.shieldActive) { //checked against Shield
			return (collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2, this.y + PLAYER_SHIP_HEIGHT / 2, this.playerShieldRadius));
		} else { //checked against playership
			if (collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2 - noseW / 2, this.y + noseYStart, noseW, noseH) ||	//check against the playership Nose part
				collisionCheck(colliderX, colliderY, colliderW_R, colliderH, this.x + PLAYER_SHIP_WIDTH / 2 - bodyW / 2, this.y + noseYStart + noseH, bodyW, bodyH)) { 	//check aginst the playership body part 
				return true;
			}
		}
	}

	this.playerLose = function () {
        boom.bigExplosion(this.x+this.w/2,this.y+this.h/2);
        playDyingSound();
		mode = GAME_OVER;
		this.updateHighScore();
	}

	this.spaceshipAutoReverse = function () {
		if (this.y <= (c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM) && this.speedBuffer) {
			this.y += this.reverseSpeed;
		}

		// don't go off screen past the bottom either (due to a screen resize etc)
		if (this.y > c.height - PLAYER_SHIP_HEIGHT)
			this.y = c.height - PLAYER_SHIP_HEIGHT; // maybe use autoreverse Y instead?
	}

	this.addToScore = function (howMany = 1) {
		playerScore += howMany;
		scoreText = playerScore.toString();
		while(scoreText.length < 11){
			scoreText = "0" + scoreText;}
		if (playerScore >= WIN_SCORE) {
			mode = WIN_SCREEN;
		}
	}
 
	this.updateHighScore = function(){
        allHighScores.push(playerScore);
        allHighScores.sort(function(a,b) { 
			return  b - a; });
        if(allHighScores.length > 10){
            allHighScores.pop();
		}
		this.saveHighScores();
	}
	this.saveHighScores = function(){

		for(var i=0; i<allHighScores.length; i++){
			window.localStorage.setItem('score' + i , allHighScores[i]);
		} 
	}
	
	this.drawAllHighScores = function(){
        if(allHighScores.length > 0){
            for (var i=0; i<allHighScores.length; i++){
                let highScoreText = allHighScores[i].toString();
                while(highScoreText.length < 11){
                    highScoreText = '0' + highScoreText;
				}
				colorText((i+1) + '. ' + highScoreText, c.width / 2 + 80,  c.height / 2 + 130 + i*30, "20px arial", "white" , "right");
			}
			colorText("Press C to clear scores", c.width / 2 , c.height - 20, "20px arial" , "grey", "center");
        }
	}
	
	this.addShield = function (amount) {

		if (amount === undefined) {
			this.playerShields++;
		} else {
			this.playerShields += amount;
		}

		if (this.playerShields >= 6) {
			this.playerShields = 6;
			this.invincible = true;
			//set invincible duration time here
			this.invincibleTimer = 300;
		}

		this.shieldActive = true;
	}

	this.reduceInvincibleTimer = function () {
		this.invincibleTimer--;
		if (this.invincibleTimer <= 0) {
			this.playerShields = 5;
			this.invincible = false;
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

	this.addWeapon = function (weaponType, amountToAdd) {

		if (weaponType == 'mid') {
			this.weapons[1][1] += amountToAdd;
		} else if (weaponType == 'laser') {
			this.weapons[2][1] += amountToAdd;
		} else if (weaponType == 'atom') {
			this.weapons[3][1] += amountToAdd;
		} else if (weaponType == 'chris') {
			this.weapons[4][1] += amountToAdd;
		} else if (weaponType == 'basic') {
			this.weapons[0][1] += amountToAdd;
		}
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

		if (holdUp && this.tempControlEnabled == false) {
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
		if (this.x >= SIDE_SCREEN_BUFFER) {
			this.x -= this.sx;
		}
	}

	this.moveRight = function () {
		if (this.x <= c.width - PLAYER_SHIP_WIDTH - SIDE_SCREEN_BUFFER) {
			this.x += this.sx;
		}
	}
}