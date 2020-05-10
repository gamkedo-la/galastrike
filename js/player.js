const PLAYER_SHIP_WIDTH = 144; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 110; //current height of pixel art 
const PLAYER_POS_Y = 1000 - PLAYER_SHIP_HEIGHT - 30;
const PLAYE_POS_X =  400 - PLAYER_SHIP_WIDTH/2;
const MIN_DIST_FROM_SCREEN_BOTTOM = 150;
const WIN_SCORE = 100;
var playerScore = 0;
var playerShields = 100;
var shieldRotationSpeed = 0;

function playerClass() {

	this.x = PLAYE_POS_X;
	this.y = PLAYER_POS_Y;
	this.speedBuffer = false;
	this.shield01 = true;
	this.myShot = [];
	this.reverseSpeed = 3;
	this.reloadFrames = 0;

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
		if(this.y <= PLAYER_POS_Y && this.speedBuffer) {
			this.y += this.reverseSpeed;
		}
	}

	this.playerScoring = function() {
		playerScore ++;
		if(playerScore >= WIN_SCORE){
			mode = WIN_SCREEN;
		}
	}

	this.playerScore = function() {
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
		if(this.y >= c.height/4){
			this.y -= 5;
		}	

		if(starFieldSpeed <= STARFIELD_TOP_SPEED) {
			starFieldSpeed += STARFIELD_ACCELERATION;
		}
	}

	this.moveDown = function() {
		if(this.y <= c.height-MIN_DIST_FROM_SCREEN_BOTTOM) {
			this.y += 5;
		}
	}

	this.moveLeft = function() {
		if(this.x >= 20) {
			this.x -= 10;
		}
	}

	this.moveRight = function() {
		if(this.x <= c.width - PLAYER_SHIP_WIDTH - 20) {
			this.x += 10;
		}
	}

}