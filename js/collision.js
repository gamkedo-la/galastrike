
	function squareShapeCollisionWithSquareShape(obj1X, obj1Y, obj1W, obj1H, obj2X, obj2Y, obj2W, obj2H){
		var distX = Math.abs((obj1X - obj1W/2) - (obj2X - obj2W/2))
		var distY = Math.abs((obj1Y - obj1H/2) - (obj2Y - obj2H/2))

		if (distX > (obj1W/2 + obj2W/2)) { return false; }
		if (distY > (obj1H/2 + obj2H/2)) { return false; }

		if (distX <= obj1W/2) { return true; }
		if (distY <= obj1H/2) { return true; }

		//Calculates corner distance
		var obj1XLength = (distX - obj1W/2);
		var obj1YLength = (distY - obj1H/2);
		var obj2XLength = (distX - obj2W/2);
		var obj2YLength = (distY - obj2H/2);

		return ((obj1XLength * obj1XLength) + (obj1YLength * obj1YLength) <= (obj2XLength * obj2XLength) + (obj2YLength * obj2YLength));
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
		var distX = Math.abs(obj1X - (obj2X - obj2W/2))
		var distY = Math.abs(obj1Y - (obj2Y - obj2H/2))

		if (distX > (obj2W/2 + obj1R)) { return false; }
		if (distY > (obj2H/2 + obj1R)) { return false; }

		if (distX <= obj2W/2) { return true; }
		if (distY <= obj2H/2) { return true; }

		//Calculates corner distance
		var obj2XLength = (distX - obj2W/2);
		var obj2YLength = (distY - obj2H/2);

		return ((obj2XLength * obj2XLength) + (obj2YLength * obj2YLength) <= (obj1R * obj1R));
	}

