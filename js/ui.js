function uiOverlay() {
    this.leftPosX = 0;
    this.leftPosY = c.height - 220;
    this.rightPosX = c.width - 460;
    this.rightPosY = c.height - 220;
    this.speedMeterY = 100;
    this.speedMeterUp = true;
    this.speedMeterDown = false;
    this.messageTimer = 0;
    this.messageToShow = undefined;
    this.stabilizing = 0;
    this.shield = 1;
    this.ammo = 2;
    this.speedBurst = 3;
    this.invincible = 4;




    this.draw = function() {
        ctx.drawImage(imageArray["leftUiSegment.png"], this.leftPosX, this.leftPosY);
        colorText("Shields: ", 15, c.height - 10, "15px arial", "white");
        this.shieldUiBars();
        colorText("Weapon: " + p1.weaponCurrent, 260, c.height - 10, "15px arial", "white"); 
        

        ctx.drawImage(imageArray["rightUiSegment.png"], this.rightPosX, this.rightPosY);
        colorText("Score: " + playerScore, c.width - 400, c.height - 10, "15px arial", "white");

        colorText("Speed", c.width - 70, c.height - 10, "15px arial", "white"); 
        this.speedMeter();

        //center messages
        this.showUiCenterMessages();

        //debugs - to be removed for release
        colorText("invincibleTimer: " + p1.invincibleTimer, c.width - 220, c.height - 90, "15px arial", "orange"); // debug output - remove
        colorText("Speed Timer: " + p1.speedBurstCountdown, c.width - 220, c.height - 70, "15px arial", "orange"); // debug output - remove
        colorText("ShotCount: " + p1.myShot.length, c.width - 220, c.height - 50, "15px arial", "orange"); // debug output - remove
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


   
    this.messagesPosX = c.width/2;
    this.messagesPosY = c.height - 20;

    this.uiMessages = function(text) {

        switch(text) {
            case this.stabilizing:
            colorText('stabilizing', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.shield:
            colorText('shield', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.ammo:
            colorText('ammo', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.speedBurst:
            colorText('MAX SPEED', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.invincible:
            colorText('INVINCIBLE', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;
        }
    }

    this.showUiCenterMessages = function() {
       if(this.messageToShow != undefined) {
            this.messageTimer++
            this.uiMessages(this.messageToShow);

            if(this.messageToShow != this.invincible) {
                if(this.messageTimer >= 60) {
                    this.messageToShow = undefined;
                    this.messageTimer = 0;
                }
            }
            if(this.messageToShow == this.invincible) {
                this.messageToShow = undefined;
                this.messageTimer = 0;
            }
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
