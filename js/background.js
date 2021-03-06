const BG_ENABLED = true; // currently turned off for performance tuning

var backgroundScrollX = 0;
var backgroundScrollY = 0;
var midgroundScrollX = 0;
var midgroundScrollY = 0;

function backgroundDraw() {
    if (!BG_ENABLED) return;
    // TODO: use a different image depending on the level
    backgroundScrollY++;
    var img = imageArray["Level_1_Background.png"];
    // tile multiple - FIXME: chop
    ctx.drawImage(img,backgroundScrollX,backgroundScrollY % img.height);
    ctx.drawImage(img,backgroundScrollX,(backgroundScrollY % img.height)-img.height);
    ctx.drawImage(img,backgroundScrollX + 2000,backgroundScrollY % img.height);
    ctx.drawImage(img,backgroundScrollX + 2000,(backgroundScrollY % img.height)-img.height);
}

function midgroundDraw() {
    if (!BG_ENABLED) return;
    midgroundScrollY += 2;
    // centered on the screen
    midgroundScrollX = Math.round(c.width/2 - imageArray["greeblicious.gif"].width/2);
    // then add a little horizontal parallax based on ship pos
    midgroundScrollX += Math.round((c.width/2-p1.x))*0.2;
    // tile multiple - fixme: chop
    ctx.drawImage(imageArray["greeblicious.gif"],midgroundScrollX,midgroundScrollY % imageArray["greeblicious.gif"].height);
    ctx.drawImage(imageArray["greeblicious.gif"],midgroundScrollX,(midgroundScrollY % imageArray["greeblicious.gif"].height)-imageArray["greeblicious.gif"].height);
}

