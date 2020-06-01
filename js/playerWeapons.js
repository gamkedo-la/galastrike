const SHOT_DISPLAY_RADIUS = 3.0;
const PLAYER_SHOT_SPEED = 10;

// color of shot, amount of hp to remove from enemy
function playerShotClass(color, removeAlienHp, shotW_R, shotH) {

	this.x = p1.x + PLAYER_SHIP_WIDTH/2;
	this.y = p1.y;
	this.w = shotW_R;
	this.h = shotH;
	this.weaponActive = false;
	this.color = color;
	this.removeAlienHp = removeAlienHp;

	this.draw = function() {
		if(this.weaponActive == true) {
			colorCircle(this.x, this.y, this.w, this.color);
		}		
	}

	this.move = function() {
		if(this.weaponActive == true) {
			this.y -= PLAYER_SHOT_SPEED;
			this.shotCheck();
		}		
	}

	this.shotCheck = function() { //note called by this.move
		for(var i=0; i<enemyList.length; i++) {
			enemyList[i].shotHitMeCheck(this);
		}

		//checking screen boundaries
		if(this.y <= 0) {
			this.weaponActive = false;
			this.y = p1.y;			
		}
	}

}// end of player basic shot class