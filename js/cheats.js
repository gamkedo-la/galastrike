var cheatBuffer = "";
var cheatList = [
	"kill", 		//opens the gameover screen
	"speed",		//gives the palyer speedburst for 600s
	"UUDDLRLRba"	//Konami code
];

function cheats(key) {
	var mightMatchCode = 0; //counts possible solutions
	var keyBuffer = "";

	// Turn inputs to lowercase and exceptions to uppercase
	if(key.length == 1){
		keyBuffer = key.toLowerCase();
	}else if(key == "ArrowUp"){
		keyBuffer = "U";
	}else if(key == "ArrowDown"){
		keyBuffer = "D";
	}else if(key == "ArrowLeft"){
		keyBuffer = "L";
	}else if(key == "ArrowRight"){
		keyBuffer = "R";
	}

	
	if(keyBuffer != " "){
		cheatBuffer += keyBuffer;
		//run a check for each cheatcode in the array
		cheatList.forEach (function (val,index){
			//Give points for each index
			mightMatchCode++;

			//check if cheatbuffer string matches to an element
			for (var i = 0; i < cheatBuffer.length++; i++){	
				if (cheatBuffer.charAt(i) == val.charAt(i)){
					
					//If cheatcode fully matches
					if(cheatBuffer == val){		
						console.log("cheat activated: " + val);
						switch (index) {
							case 0: //cheat: kill 
								p1.playerLose();
								break;
					
							case 1: //cheat: speed
								p1.addSpeed(600);
								break;
							case 2: //cheat: konami
								p1.addSpeed(600);
								break;
						}
						cheatBuffer = "";
						break;				
					}

				}else{
					//remove point if string doesnt match
					mightMatchCode--;
					break;						
				}
			}
		});
			
		//console.log(`buffer: ${cheatBuffer}` + " " + mightMatchCode+ " ");

		// reset complete string if nothing matched.
		if (mightMatchCode == 0 && keyBuffer.length == 1 && keyBuffer != " ") {
			cheatBuffer = keyBuffer;
			//console.log("bufferReset")
		}
	}
}
