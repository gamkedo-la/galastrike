
var backgroundScrollX = 0;
var backgroundScrollY = 0;

function backgroundDraw() {
    // TODO: use a different image depending on the level
    backgroundScrollY++;
    ctx.drawImage(imageArray["Level_1_Background.jpg"],backgroundScrollX,backgroundScrollY % imageArray["Level_1_Background.jpg"].height);
    ctx.drawImage(imageArray["Level_1_Background.jpg"],backgroundScrollX,(backgroundScrollY % imageArray["Level_1_Background.jpg"].height)-imageArray["Level_1_Background.jpg"].height);
}