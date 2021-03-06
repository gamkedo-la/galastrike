
function spawnAsteroids() {
	var ast = new asteroids();
	this.rn = Math.round(Math.random() * (4 - 1) + 1); //handling spawning with different asteroid arts.
	switch(this.rn) {
		case 1:
			ast.astArt = imageArray["Asteroid_2.png"];
			break;
		case 2:
			ast.astArt = imageArray["asteroid_3.png"];
			break;
		case 3:
			ast.astArt = imageArray["asteroid_4.png"];
			break;
		case 4:
			ast.astArt = imageArray["asteroid_5.png"];
			break;
		}
	ast.x = c.width * Math.random() - 150;
	this.astList.push(ast);
}

function asteroids() {

	this.hp = 1;
	this.x = 800;
	this.y = 0;
	this.r = 30;
	this.sy = 5;

	this.destroyed = false;
	this.explosion = new explosion();

	this.rotation = 0;
	this.rotationSpeed = 0.1;
	this.lootDropRate = 2;

	this.astArt;

	this.draw = function () {

		

		let graphic = imageArray["asteroid_3.png"];

		if (!this.destroyed) {
			drawBitmapCenteredAtLocationWithRotation(this.astArt, this.x, this.y, this.rotation);
		}
		
		this.explosion.draw();
	}

	this.move = function () {
		this.y += this.sy;
		this.rotation += this.rotationSpeed;
		this.playerCollisionDetection();
		this.explosion.move(this.x, this.y);
		this.readyToRemove();

		if (this.y >= c.height) {
			//this.respawn();
		}
	}

	this.shotHitMeCheck = function (theShot) {
		if (collisionCheck(theShot.x, theShot.y, theShot.w, theShot.h, this.x, this.y, this.r)) {
			theShot.deactivate();
			this.hp -= theShot.removeAlienHp;
			if (this.hp <= 0 && !this.destroyed) {
				this.onDestroyed();
			}
		}
	}

	this.playerCollisionDetection = function () {	
		if(p1.collisionCheck(false, this.x, this.y, this.r)){
			if (!this.destroyed) {
				p1.getHit();
                this.hp--;
                boom.smallImpact(this.x+this.r,this.y+this.r);
			}
			if (!this.destroyed && this.hp <= 0) {
				this.onDestroyed();
			}
		}
	}

	this.onDestroyed = function(){
		this.destroyed = true;
		if(Math.round(Math.random() * this.lootDropRate) == 1){
			spawnLoot(this.x, this.y,"mid"); 
		}
		p1.addToScore(10); //needs to be fixed
        
        boom.debrisROCKA(this.x+this.r,this.y+this.r); // FIXME: account for the three different kinds
        boom.smallExplosion(this.x+this.r,this.y+this.r);
        
		playDestroyedEnemyMidSound();		
		this.explosion.explode();
	}

	this.respawn = function () {
		this.hp = 1;
		this.destroyed = false;
		
		//shieldPU.pickedUP = false;
		this.y = -100;
		this.x = Math.round(Math.random() * (c.width - 80) + 80);
		this.explosion = this.explosion ? new explosion() : this.explosion;
	}

	this.readyToRemove = function() {
		return ((this.destroyed && this.explosion.done()) || this.y > c.height);
	}
}