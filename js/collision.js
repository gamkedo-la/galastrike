
function RectangularShapeCollisionWithRectangularShape(obj1X, obj1Y, obj1W, obj1H, obj2X, obj2Y, obj2W, obj2H) {
	if (obj1X > (obj2X + obj2W) || obj2X > (obj1X + obj1W) || obj1Y > (obj2Y + obj2H) || obj2Y > (obj1Y + obj1H)) {
		return false;
	} else {
		return true;
	}
}

function roundShapeCollisionWithRoundShape(obj1X, obj1Y, Obj1R, obj2X, obj2Y, Obj2R) {
	var distX = obj1X - obj2X;
	var distY = obj1Y - obj2Y;
	var distR = Obj1R + Obj2R;

	if ((distX * distX) + (distY * distY) < (distR * distR)) {
		return true;
	} else {
		return false;
	}
}

function roundShapeCollisionWithRectangularShape(obj1X, obj1Y, obj1R, obj2X, obj2Y, obj2W, obj2H) {
	var distX = Math.abs(obj1X - obj2X - obj2W / 2)
	var distY = Math.abs(obj1Y - obj2Y - obj2H / 2)

	if (distX > (obj2W / 2 + obj1R)) { return false; }
	if (distY > (obj2H / 2 + obj1R)) { return false; }

	if (distX <= obj2W / 2) { return true; }
	if (distY <= obj2H / 2) { return true; }

	//Calculates corner distance
	var distXLength = distX - obj2W / 2;
	var distYLength = distY - obj2H / 2;

	return ((distXLength * distXLength) + (distYLength * distYLength) <= (obj1R * obj1R));
}

collisionCheck = function (collider1X, collider1Y, collider1W_R, collider1H, collider2X, collider2Y, collider2W_R, collider2H) {
	// If colliderH is undefined than we assume that this object has a round shape and cooliderW_R becomes the radius 
	// If colliderH was defined than we assume that this object has a rectangular shape and colliderW_R becomes the width

	//Usage of this function:
	//if you know that one of your object has always a round shape than put it in the place of object2 (collider2) because
	//than it will automaticly detect it as a roundshape
	//example: collisionCheck(shotX, shotY, shotW, shotH, alienX, alienY, alienR)
	//another working but not so cute solution would be to use undefine
	//example: collisionCheck( alienX, alienY, alienR, undefine, shotX, shotY, shotW, shotH,)


	//if both objects use round collision shape
	if (collider1H === undefined && collider2H === undefined) {
		return (roundShapeCollisionWithRoundShape(collider1X, collider1Y, collider1W_R, collider2X, collider2Y, collider2W_R));

		//if both objects use rectangle collision shape
	} else if (collider1H !== undefined && collider2H !== undefined) {
		return (RectangularShapeCollisionWithRectangularShape(collider1X, collider1Y, collider1W_R, collider1H, collider2X, collider2Y, collider2W_R, collider2H));

		//if object 1 uses round collision shape and object 2 uses rectangle collision shape
	} else if (collider1H === undefined && collider2H !== undefined) {
		return (roundShapeCollisionWithRectangularShape(collider1X, collider1Y, collider1W_R, collider2X, collider2Y, collider2W_R, collider2H));

		//if object 1 uses rectangle collision shape and object 2 uses round collision shape
	} else if (collider1H !== undefined && collider2H === undefined) {
		return (roundShapeCollisionWithRectangularShape(collider2X, collider2Y, collider2W_R, collider1X, collider1Y, collider1W_R, collider1H));
	} else {
		console.log("We have a collision detection problem!");
		return false;
	}
}