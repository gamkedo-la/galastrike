function uiOverlay() {
    this.leftPosX = 0;
    this.leftPosY = c.height - 220;
    this.rightPosX = c.width - 460;
    this.rightPosY = c.height - 220;
    this.speedMeterY = 100;
    this.speedMeterUp = true;
    this.speedMeterDown = false;




    this.draw = function() {
        ctx.drawImage(imageArray["leftUiSegment.png"], this.leftPosX, this.leftPosY);
        colorText("Shields: ", 15, c.height - 10, "15px arial", "white");
        this.shieldUiBars();
        colorText("Weapon: " + p1.weaponCurrent, 260, c.height - 10, "15px arial", "white"); 
        

        ctx.drawImage(imageArray["rightUiSegment.png"], this.rightPosX, this.rightPosY);
        colorText("Score: " + playerScore, c.width - 400, c.height - 10, "15px arial", "white");

        colorText("Speed", c.width - 70, c.height - 10, "15px arial", "white"); 
        this.speedMeter();

        //debugs - to be removed for release
        colorText("Speed Timer: " + p1.speedBurstCountdown, c.width - 200, c.height - 70, "15px arial", "orange"); // debug output - remove
        colorText("ShotCount: " + p1.myShot.length, c.width - 200, c.height - 50, "15px arial", "orange"); // debug output - remove
    }

    this.move = function() {
        this.moveSpeedMeter();
    }



    this.shieldUiBars = function() {
        if(p1.playerShields >= 5) {
            colorRect(15, c.height - 160, 50, 20, "white");
        }
         if(p1.playerShields >= 4) {
            colorRect(15, c.height - 135, 50, 20, "white");
        }
         if(p1.playerShields >= 3) {
            colorRect(15, c.height - 110, 50, 20, "white");
        }
         if(p1.playerShields >= 2) {
            colorRect(15, c.height - 85, 50, 20, "white");
        }
         if(p1.playerShields >= 1) {
            colorRect(15, c.height - 60, 50, 20, "white");
        }
        if(p1.playerShields == 6) {
            colorRect(15, c.height - 160, 50, 120, "green");
        }
    }

    this.speedMeterBottom = 0;

    this.speedMeter = function() {
         if(p1.speedBurstCountdown <= 0) {
            colorRect(c.width - 70, c.height - this.speedMeterY, 20, 65 + this.speedMeterBottom, "white");
        }
        if(p1.speedBurstCountdown <= 0) {
            colorRect(c.width - 40, c.height - this.speedMeterY, 20, 65 + this.speedMeterBottom, "white");
        }

        if(p1.speedBurstCountdown >= 1) {
            colorRect(c.width - 70, c.height - 160, 20, 125, "red");
            colorRect(c.width - 40, c.height - 160, 20, 125, "red");
        }
    }


    this.moveSpeedMeter = function() {
        if(this.speedMeterY <= 60) {
            this.speedMeterUp = true;
            this.speedMeterDown = false;
        }
        if(this.speedMeterY >= 110 ) {
            this.speedMeterUp = false;
            this.speedMeterDown = true;
        }

        if(this.speedMeterUp) {
            this.speedMeterY ++;
            this.speedMeterBottom ++;
        }
        if(this.speedMeterDown) {
            this.speedMeterY --;
            this.speedMeterBottom --;
        }
    }

}





const stabilizing = 0;
const shield = 1;
const ammo = 2;
const speedBurst = 3;

function uiMessages() {
    this.x = c.width/2;
    this.y = c.height - 20;


    this.draw = function(text) {

        switch(text) {
            case stabilizing:
            colorText('stabilizing', this.x, this.y,'30px Courier', 'white','center');
            break;

            case shield:
            colorText('shield', this.x, this.y,'30px Courier', 'white','center');
            break;

            case ammo:
            colorText('ammo', this.x, this.y,'30px Courier', 'white','center');
            break;

            case speedBurst:
            colorText('speed burst', this.x, this.y,'30px Courier', 'white','center');
            break;
        }


    }
}

function uiScore(){
    let currentScore = 0;
    let highScore = 0;
    const scoreToAdd = 5;
    let allHighScores = [];
    this.position = {x:position.x, y:position.y};

    this.getScore = function() {
        return currentScore;
    }

    this.getHighScore = function() {
        return highScore;
    }

    this.addToScore = function(scoreToAdd) {
        currentScore += scoreToadd;
        scoreText = currentScore.toString();
        while(scoreText.length < 11){
                scoreText = "0" + scoreText;
        }
    }

    this.updateHighScore = function(){
        allHighScores.push(currentScore);
        allHighScores.sort((a,b) >= b - a);
        if(allHighScores.length > 5){
            allHighScores.pop();
        }
    }

    this.saveHighScore = function(){
        for(let i=0; i<allHighScores.length; i++){
            this.localStorage.setFloat("highScore" + i, allHighScores[i]);
        }
    }

    this.draw = function(){
        colorText(scoreText, c.width / 2 - 80, 10, "30px arial", "white");
    }

    this.drawAllHighScores = function(){
        if(allHighScores.lenght > 0){
            for (var i=0; i++; i<=allHighScores.lenght){
                let highScoreText = allHighScores[i].toString;
                while(highScoreText < 11){
                    highScoreText = 0 + highScoreText;
                }
                colorText(scoreText, c.width / 2 - 80, 10, "30px arial", "white");
            }
        }
    }

    this.reset = function() {
        this.updateHighScore();
        this.saveHighScore();
            currentScore = 0;
            this.addToScore(currentScore);
    }

}
