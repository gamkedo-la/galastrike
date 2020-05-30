
	function squareShapeCollisionWithSquareShape(obj1X, obj1Y, obj1W, obj1H, obj2X, obj2Y, obj2W, obj2H){
		if (obj1X > (obj2X + obj2W) || obj2X > (obj1X + obj1W) || obj1Y > (obj2Y + obj2H) || obj2Y > (obj1Y + obj1H)){
			return false;
		}else{
			return true;
		}
	}
	
	function roundShapeCollisionWithRoundShape (obj1X, obj1Y, Obj1R, obj2X, obj2Y, Obj2R){
		var distX = obj1X - obj2X;
		var distY = obj1Y - obj2Y;
		var distR = Obj1R + Obj2R; 
		
		if ((distX * distX) + (distY * distY) < (distR * distR)){
			return true;
		}else{
			return false;
		}
	}

	function roundShapeCollisionWithSquareShape (obj1X, obj1Y, obj1R, obj2X, obj2Y, obj2W, obj2H){
		var distX = Math.abs(obj1X - obj2X + obj2W/2)
		var distY = Math.abs(obj1Y - obj2Y + obj2H/2)
		
		if (distX > (obj2W/2 + obj1R)) { return false; }
		if (distY > (obj2H/2 + obj1R)) { return false; }

		if (distX <= obj2W/2) { return true; }
		if (distY <= obj2H/2) { return true; }

		//Calculates corner distance
		var distXLength = distX - obj2W/2;
		var distYLength = distY - obj2H/2;

		return ((distXLength * distXLength) + (distYLength * distYLength) <= (obj1R * obj1R));
	}

