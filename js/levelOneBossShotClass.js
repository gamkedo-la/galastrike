
// WeaponType, ship center X, Ship Y
function levelOneBossShotClass() {
	this.weaponType = 'basic';
	this.x = c.width/2;
	this.y = c.height/2;
	this.w;
	this.h;
	this.shotActive = false;
	this.shotReloadRate;
	this.shootSpeed;


		switch (this.weaponType) {
			case 'basic':
				this.w = 4;
				this.shotReloadRate = 10;
				this.shootSpeed = 10;
				//playBasicShootingSound();
				break;
		}	
	
	this.draw = function() {
		
		if(this.shotActive == true) {
			console.log("draw shot");
				colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'white');	
		}		
	}
		

	this.move = function() {
		
		if(this.shotActive == true) {
			console.log(this.y);
			this.y += this.shootSpeed;

		this.shotCheck();
		}
	}

	this.shotCheck = function() { //called by this.move
		
		//checking screen boundaries
		if(this.y >= c.height) {
			this.shotActive = false;
			//this.y = p1.y;			
		}
	}

}