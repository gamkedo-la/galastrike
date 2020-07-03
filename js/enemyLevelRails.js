var railList;

var railListA = [
	[
	{x:-0.1, y: -0.1},
	{x:0.2, y: 0.1}, // top horizontal straight line  //rail 0
	{x:0.9, y: 0.1},
	],

	[
	{x:1.1, y: -0.2}, // mid horizontal straight line  //rail 1
	{x:0.9, y: 0.2},
	{x:0.05, y: 0.2},
	],

	[
	{x:-0.1, y: -0.3},
	{x:0.05, y: 0.3}, // bot horizontal straight line  //rail 2
	{x:0.9, y: 0.3},
	],

	[
	{x:0.5, y: -0.2},
	{x:0.5, y: 0.2}, // half top rail to right of screen  //rail 3
	{x:0.9, y: 0.2},
	],

	[
	{x:0.5, y: -0.2},
	{x:0.5, y: 0.3}, // half top rail to left of screen  //rail 4
	{x:0.1, y: 0.3},
	],

	[
	{x:0.5, y: -0.2},
	{x:0.5, y: 0.4}, // half bottom rail to right of screen  //rail 5
	{x:0.9, y: 0.4},
	],

	[
	{x:0.5, y: -0.2},
	{x:0.5, y: 0.5}, // half bottom rail to left of screen  //rail 6
	{x:0.1, y: 0.5},
	],

];

var railListB = [

//first wave
	[
	{x:-0.1, y: -0.1},
	{x:0.05, y: 0.1}, // top horizontal straight line //rail 0
	{x:0.9, y: 0.1},
	],


	[
	{x:1.1, y: 0},
	{x:0.9, y: 0.2}, // mid top horizontal straight line //rail 1
	{x:0.05, y: 0.2},
	],


	[
	{x:-0.1, y: 0.1},
	{x:0.05, y: 0.3}, // mid bot horizontal straight line //rail 2
	{x:0.9, y: 0.3},
	],

	[
	{x:1.1, y: 0.2},
	{x:0.9, y: 0.4}, // bot horizontal straight line //rail 3
	{x:0.05, y: 0.4},
	],

//third wave
	[
	{x:-0.1, y: -0.2}, //rail 4
	{x:0.2, y: 0.7},
	{x:0.5, y: 0.1},
	{x:0.9, y: 0.1},
	],

	[
	{x:1.1, y: -0.2}, //rail 5
	{x:0.8, y: 0.7},
	{x:0.5, y: 0.3},
	{x:0.1, y: 0.3},
	],

	

];

var railListC = [
	[
	{x:-0.1, y: 0.3},
	{x:0.1, y: 0.3},
	{x:0.3, y: 0.3},
	],

	[
	{x:1.1, y: 0.3},
	{x:0.9, y: 0.3},
	{x:0.7, y: 0.3}
	],
];

var railColor = [
	"red", "green", "orange", "blue", "white", "cyan"
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

