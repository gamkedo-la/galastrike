var railList = [
	[{x:0.1, y: 0.2},
	{x:0.15, y: 0.30},
	{x:0.5, y: 0.1}],

	[{x:0.2, y: 0.3},
	{x:0.18, y: 0.5},
	{x:0.35, y: 0.40},
	{x:0.8, y: 0.2}],
];

var railColor = [
	"red", "green", "orange", "blue"
];

function drawRails() {
	for(var i=0; i<railList.length; i++) {
		for(var ii=0; ii<railList[i].length; ii++) {
			colorCircle(railList[i][ii].x * c.width, railList[i][ii].y * c.height, 5, railColor[i% railColor.length]);
			if(ii < railList[i].length - 1) {
				colorLine(railList[i][ii].x * c.width, railList[i][ii].y * c.height, 
					railList[i][ii + 1].x * c.width, railList[i][ii + 1].y * c.height, "2", railColor[i% railColor.length]);
			}
		}
	}
}

