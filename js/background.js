
var backgroundScrollX = 0;
var backgroundScrollY = 0;
var midgroundScrollX = 0;
var midgroundScrollY = 0;

function backgroundDraw() {
    // TODO: use a different image depending on the level
    backgroundScrollY++;
    // space bg
    ctx.drawImage(imageArray["Level_1_Background.jpg"],backgroundScrollX,backgroundScrollY % imageArray["Level_1_Background.jpg"].height);
    ctx.drawImage(imageArray["Level_1_Background.jpg"],backgroundScrollX,(backgroundScrollY % imageArray["Level_1_Background.jpg"].height)-imageArray["Level_1_Background.jpg"].height);
}

function midgroundDraw() {
    midgroundScrollX = Math.round(c.width/2 - imageArray["greeblicious.gif"].width/2);
    midgroundScrollX = lerp(midgroundScrollX,Math.round((c.width/2-p1.x)), 0.2 ) ; // shift side to side based on player pos
    //midgroundScrollX += Math.round((c.width/2-p1.x) / 3); // shift side to side based on player pos
    midgroundScrollY = lerp (midgroundScrollY, midgroundScrollY+40, 0.1);
    // greebly space stations
    ctx.drawImage(imageArray["greeblicious.gif"],midgroundScrollX,midgroundScrollY % imageArray["greeblicious.gif"].height);
    ctx.drawImage(imageArray["greeblicious.gif"],midgroundScrollX,(midgroundScrollY % imageArray["greeblicious.gif"].height)-imageArray["greeblicious.gif"].height);
}

