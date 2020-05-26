var cheatBuffer = "";
const cheatList = [
	"kill",
	"test"
];

function cheats(key) {
	console.log("buffer: " + CheatBuffer);
	var cheatBufferKeep = false;
	cheatBuffer += key.toLowerCase();

		for (var i = 0; i <= cheatBuffer.length; i++){		
			cheatList.forEach ((val,index)){
				if (cheatBuffer.charAt(i) == val.charAt(i)){
					cheatBufferKeep = true;
						
					if(cheatBuffer.length == val.length){
						console.log("yay");
					}
				}
			}
		}

		if (!cheatBufferKeep) {
			cheatBuffer = "";
		}
	

}
