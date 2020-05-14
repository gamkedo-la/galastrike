const SHOT_DISPLAY_RADIUS = 3.0;
const PLAYER_SHOT_SPEED = 10;


function playerBasicShotClass() {

	this.x = p1.x + PLAYER_SHIP_WIDTH/2;
	this.y = p1.y;
	this.basicWeaponActive = false;

	this.draw = function() {


		if(this.basicWeaponActive == true) {
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white');
		}		
	}

	this.move = function() {
		if(this.basicWeaponActive == true) {
			this.y -= PLAYER_SHOT_SPEED;
			this.shotCheck();
		}		
	}

	this.shotCheck = function() { //note called by this.move
		//enemy collision - a1 "basic alien"
		if(this.y <= a1.y + a1.h && this.x >= a1.x && this.x <= a1.x + a1.w) {
			this.basicWeaponActive = false;
			this.y = p1.y;
			a1.hp --;
			if(a1.hp <= 0) {
				a1.alienActive = false;
				a1.lootDrop();
				p1.playerScoring();		
			}	
		}
			
		//enemy collision - a2 "mid alien"
		if(this.y <= a2.y + a2.h && this.x >= a2.x && this.x <= a2.x + a2.w) {
			this.basicWeaponActive = false;
			this.y = p1.y;
			a2.hp --;
			if(a2.hp <= 0) {
				a2.alienActive = false;
				a2.lootDrop();
				p1.playerScoring();	
			}
				
		}
		//enemy collision - a3 "diver alien"
		if(this.y <= a3.y + a3.h && this.x >= a3.x && this.x <= a3.x + a3.w) {
			this.basicWeaponActive = false;
			this.y = p1.y;
			a3.hp --;
			if(a3.hp <= 0) {
				a3.alienActive = false;
				a3.lootDrop();
				p1.playerScoring();	
			}	
		}
		//asteroid collision detection
		if(this.y <= ast.y + ast.r && this.x >= ast.x - ast.r && this.x <= ast.x + ast.r) {
			ast.destroyed = true;
			ast.dropLoot = true;
			this.basicWeaponActive = false;
		}
		//checking screen boundaries
		if(this.y <= 0) {
			this.basicWeaponActive = false;
			this.y = p1.y;			
		}
		// power up collision
		if(this.y <= powerUp1.y + powerUp1.h && this.y >= powerUp1.y && this.x >= powerUp1.x - 10 && this.x <= powerUp1.x + powerUp1.w + 10) {
			powerUp1.powerUpAccesible = true;
			this.basicWeaponActive = false;
			this.y = p1.y;
		}
	}

}// end of player basic shot class