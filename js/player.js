const PLAYER_SHIP_WIDTH = 144; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 110; //current height of pixel art 
const AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM = 150;
const MIN_DIST_FROM_SCREEN_BOTTOM = 150;
const WIN_SCORE = 100;
var playerScore = 0;
var playerShields = 100;
var shieldRotationSpeed = 0;

function playerClass() {

    // start position depends on canvas size
	this.x = c.width/2 - PLAYER_SHIP_WIDTH/2;
    this.y = c.height - AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM;

    this.sy = 5; 
    this.sx = 10;
    
    this.speedBuffer = false;
	this.shield01 = true;
	this.myShot = [];
	this.weaponTier = "Basic";
	this.reverseSpeed = 3;
	this.reloadFrames = 0;
	this.speedBurstCountdown = 0;

	this.fireShot = function () {
		var newShot = new playerBasicShotClass();
		newShot.basicWeaponActive = true;
		newShot.x = this.x + PLAYER_SHIP_WIDTH/2;
		this.myShot.push(newShot);
		this.reloadFrames = 6;
	}

	this.draw = function() {
		//space ship
		ctx.drawImage(imageArray["PlayerSpaceship.png"], this.x, this.y);

		//ship shield
		if(this.shield01) {
			drawBitmapCenteredAtLocationWithRotation(imageArray["Shield.png"], this.x + PLAYER_SHIP_WIDTH/2, this.y + PLAYER_SHIP_HEIGHT/2, shieldRotationSpeed);
		}

		for(var i=0; i < this.myShot.length; i++) {
			this.myShot[i].draw();
		}
	}

	this.move = function () {
		this.handleInput();

		for(var i=0; i < this.myShot.length; i++) {
			this.myShot[i].move();
		}
		for(var i=this.myShot.length - 1; i >= 0 ; i--) { //for loop goes backwards to not skip cause of the splice
			if(this.myShot[i].basicWeaponActive == false) {
				this.myShot.splice(i,1);
			}
		}

		this.moveShield();
		this.spaceshipAutoReverse();
		this.speedBurst();
	}

	this.moveShield = function() { // called by this.move
		shieldRotationSpeed += .01;
	}

	this.addShield = function() {
		playerShields ++;
		this.shield01 = true;
	}
            
	this.substractShield = function() {
		playerShields --;
		if(playerShields == 0) {
			this.shield01 = false;
		}
	}

	this.playerLose = function() {
		mode = GAME_OVER;
	}

	this.spaceshipAutoReverse = function() {
		if(this.y <= (c.height-AUTOREVERSE_DESIRED_DIST_FROM_BOTTOM) && this.speedBuffer) {
			this.y += this.reverseSpeed;
        }
        
        // don't go off screen past the bottom either (due to a screen resize etc)
        if(this.y > c.height-PLAYER_SHIP_HEIGHT) 
            this.y = c.height-PLAYER_SHIP_HEIGHT; // maybe use autoreverse Y instead?
	}

	this.playerScoring = function() {
		playerScore ++;
		if(playerScore >= WIN_SCORE){
			mode = WIN_SCREEN;
		}
	}

	this.playerScore = function() {
		colorText("W Type: " + this.weaponTier, c.width-120, c.height-110, "15px arial", "orange"); // debug output - remove
        colorText("Speed: " + this.sy, c.width-120, c.height-90, "15px arial", "orange"); // debug output - remove
        colorText("Speed Timer: " +this.speedBurstCountdown, c.width-120, c.height-70, "15px arial", "orange"); // debug output - remove
        colorText("ShotCount: " + this.myShot.length, c.width-120, c.height-50, "15px arial", "orange"); // debug output - remove
		colorText("Score: " + playerScore, c.width-120, c.height-30, "15px arial", "white");
		colorText("Shields: " + playerShields, c.width-120, c.height-10, "15px arial", "white");
	}

	this.handleInput = function() {
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

		if(this.reloadFrames > 0) {
			this.reloadFrames --;
		}
		else if (holdSpace) {
			this.fireShot();
		}

	}

	//player movement handling

	this.moveUp = function() {
		if(this.y >= c.height/5){
			this.y -= this.sy;
		}	

		if(starFieldSpeed <= STARFIELD_TOP_SPEED) {
			starFieldSpeed += STARFIELD_ACCELERATION;
		}
	}

	this.moveDown = function() {
		if(this.y <= c.height-MIN_DIST_FROM_SCREEN_BOTTOM) {
			this.y += this.sy;
		}
	}

	this.moveLeft = function() {
		if(this.x >= 20) {
			this.x -= this.sx;
		}
	}

	this.moveRight = function() {
		if(this.x <= c.width - PLAYER_SHIP_WIDTH - 20) {
			this.x += this.sx;
		}
	}

	this.addSpeed = function() {
		console.log("speed Burst!");
		this.speedBurstCountdown += 120;

	}

	this.speedBurst = function() {
		if(this.speedBurstCountdown >= 1) {
			this.speedBurstCountdown --;
			this.sy = 20;
			this.sx = 20;
		} 
		else {
			this.sy = 5;
			this.sx = 10;
			this.speedBurstCountdown = 0;
		}
	}

	this.weaponUpgrade = function() {
		console.log("weapon Upgrade");
		this.weaponTier = "Mid";

	}
}