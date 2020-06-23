function uiOverlay() {

    this.leftPosX = 0;
    this.leftPosY = c.height - 203;
    this.rightPosX = c.width - 460;
    this.rightPosY = c.height - 220;
   
    
    this.messageTimer = 0;
    this.messageToShow = undefined;
    this.stabilizing = 0;
    this.shield = 1;
    this.ammo = 2;
    this.speedBurst = 3;
    this.messagesPosX = c.width/2;
    this.messagesPosY = c.height - 20;
    
    this.uiNoShieldTimer = 0;
    
    //center brackets
    this.showCenterBrackets = false;
    this.uiCenterRightBracketPosX = c.width/2 + 10;
    this.uiCenterLeftBracketPosX = c.width/2 - 10;
    this.centerBracketPauseTimer = 0;
    this.moveCenterBrackets = false;
    this.openBracketsTimer = 0;
    this.openBrackets = false;
    this.closeBrackets = false;
    this.startOpeningBrackets = 0;
    this.startClosingBrackets = false;
    this.closingBracketTimer = 0;
    this.uiBracketMovingTime = 30; //fps, define this variable to adapt to message length. Defined in this.uiMessages();
    this.centerBracketSpeed = 5; // determining how fast brackets move, need to balance with this.uiBracketMovingTime
    

    this.draw = function() {
        ctx.drawImage(imageArray["uiLeftSegment.png"], this.leftPosX, this.leftPosY);
        this.shieldUiBars();
        //ctx.drawImage(imageArray["uiSmallBracket_Left.png"], 180, c.height - 30);        
        //ctx.drawImage(imageArray["uiSmallBracket_Right.png"], 250, c.height - 30);
        
        colorText(
            p1.weaponCurrent,       // string
            250, c.height - 10,     // x and y
            "20px arial",           // font
            "white",                // color
            "center",               // alignment
            false);                 // black 1x shadow?
        
        colorText(
            p1.ammoAmount,          // string
            330, c.height - 10,     // x and y
            "20px arial",           // font
            "white",                // color
            "center",               // alignment
            false);                 // black 1x shadow?
        

        ctx.drawImage(imageArray["uiRightSegment.png"], this.rightPosX, this.rightPosY);
        colorText(playerScore, c.width - 220, c.height - 10, "20px arial", "white", 'right');

        this.speedMeter();
        this.showModeInUi();

        //center messages
        this.showUiCenterMessages();
        if(this.showCenterBrackets) {
            ctx.drawImage(imageArray["uiCenterBracket_Left.png"], this.uiCenterLeftBracketPosX, c.height - 45);
            ctx.drawImage(imageArray["uiCenterBracket_Right.png"], this.uiCenterRightBracketPosX, c.height - 45);
        }
        
        //debugs - to be removed for release - DON'T DELETE
        //colorText("invincibleTimer: " + p1.invincibleTimer, c.width - 220, c.height - 90, "15px arial", "orange"); // debug output - remove
        //colorText("Speed Timer: " + p1.speedBurstCountdown, c.width - 220, c.height - 70, "15px arial", "orange"); // debug output - remove
        //colorText("ShotCount: " + p1.myShot.length, c.width - 220, c.height - 50, "15px arial", "orange"); // debug output - remove
    }

    this.move = function() {
        this.handleCenterBrackets();
        this.moveSpeedMeter();
        this.leftPosX = 0;
        this.leftPosY = c.height - 204;
        this.rightPosX = c.width - 460;
        this.rightPosY = c.height - 220;
    }


    this.shieldUiBars = function() {
        if(p1.playerShields >= 5) {
             ctx.drawImage(imageArray["uiShieldBar.png"], 16, c.height - 167);
        }
         if(p1.playerShields >= 4) {
            ctx.drawImage(imageArray["uiShieldBar.png"], 16, c.height - 139);
        }
         if(p1.playerShields >= 3) {
            ctx.drawImage(imageArray["uiShieldBar.png"], 16, c.height - 111);
        }
         if(p1.playerShields >= 2) {
            ctx.drawImage(imageArray["uiShieldBar.png"], 16, c.height - 83);
        }
         if(p1.playerShields >= 1) {
            ctx.drawImage(imageArray["uiShieldBar.png"], 16, c.height - 55);
        }
        if(p1.playerShields == 6) {
            ctx.drawImage(imageArray["uiShieldBarsInvincible.png"], 16, c.height - 167);
        }
        if(p1.playerShields <= 0) {
            this.flashNoShieldBars();
        }
    }

    this.flashNoShieldBars = function() {
        if(!this.shieldActive) {
            this.uiNoShieldTimer ++;
            if(this.uiNoShieldTimer <= 10) {
                ctx.drawImage(imageArray["uiShieldBarNoShields.png"], 16, c.height - 167);
            } 
            if(this.uiNoShieldTimer >= 20) {
                this.uiNoShieldTimer = 0;
            }
        }
    }
    
    this.speedMeter1Y = 102;
    this.speedMeter2Y = 102;
    this.speedMeterUp = true;
    this.speedMeterDown = false;
    this.speedMeterUp2 = false;
    this.speedMeterDown2 = true;
    this.speedMeterBottom1 = 0;
    this.speedMeterBottom2 = 0;
    this.maxSpeedMeter1 = 163;
    this.maxSpeedMeter2 = 163;

    this.speedMeter = function() {
         if(p1.speedBurstCountdown <= 0) { 
            colorRect(c.width - 67, c.height - this.speedMeter1Y, 25, 65 + this.speedMeterBottom1, "white"); // left meter
            colorRect(c.width - 40, c.height - this.speedMeter2Y, 25, 65 + this.speedMeterBottom2, "white"); // right meter
        }

        if(p1.speedBurstCountdown >= 1) {
            colorRect(c.width - 67, c.height - this.maxSpeedMeter1, 25, 126, "red"); //left meter
            colorRect(c.width - 40, c.height - this.maxSpeedMeter2, 25, 126, "red"); //right meter
        }
    } 

    this.moveSpeedMeter = function() {
        if(this.speedMeter1Y <= 100) {
            this.speedMeterUp = true;
            this.speedMeterDown = false;
        }
        if(this.speedMeter1Y >= 110 ) {
            this.speedMeterUp = false;
            this.speedMeterDown = true;
        }

        if(this.speedMeter2Y <= 100) {
            this.speedMeterUp2 = true;
            this.speedMeterDown2 = false;
        }
        if(this.speedMeter2Y >= 110 ) {
            this.speedMeterUp2 = false;
            this.speedMeterDown2 = true;
        }

        if(this.speedMeterUp) {
            this.speedMeter1Y ++;
            this.speedMeterBottom1 ++;
        }
        if(this.speedMeterDown) {
            this.speedMeter1Y --;
            this.speedMeterBottom1 --;
        }

        if(this.speedMeterUp2) {
            this.speedMeter2Y ++;
            this.speedMeterBottom2 ++;
        }
        if(this.speedMeterDown2) {
            this.speedMeter2Y --;
            this.speedMeterBottom2 --;
        }
    }


    this.uiMessages = function(text) {

        switch(text) {
            case this.stabilizing:
            this.uiBracketMovingTime = 30;
            colorText('stabilizing', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.shield:
            this.uiBracketMovingTime = 20;
            colorText('shield', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.ammo:
            this.uiBracketMovingTime = 20;
            colorText('ammo', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;

            case this.speedBurst:
            this.uiBracketMovingTime = 30;
            colorText('MAX SPEED', this.messagesPosX, this.messagesPosY,'30px Courier', 'white','center');
            break;
        }
    }

    this.showUiCenterMessages = function() {
       
       if(this.messageToShow != undefined) {
            this.showCenterBrackets = true; // drawing brackets in center of UI
            this.centerBracketPauseTimer ++;
            if(this.centerBracketPauseTimer >= 20) {
                this.openBrackets = true; // start to open brackets
                this.startOpeningBrackets ++;
                if(this.startOpeningBrackets >= this.uiBracketMovingTime) {
                    this.openBrackets = false; // stop opening brackets
                    this.messageTimer++
                    this.uiMessages(this.messageToShow);
                }  
            }

            if(this.messageToShow) {
                if(this.messageTimer >= 40) {
                    this.messageToShow = undefined; // shuts down first if statement in this.showUiCenterMessages function
                    this.messageTimer = 0;
                    this.startClosingBrackets = true;
                    this.centerBracketPauseTimer = 0;
                    this.startOpeningBrackets = 0;
                }
            }   
       }

     if(this.startClosingBrackets) {
        this.closingBracketTimer ++;
        this.closeBrackets = true;
       if (this.closingBracketTimer >= this.uiBracketMovingTime) {  
            this.closeBrackets = false;
            this.centerBracketPauseTimer ++;
            if(this.centerBracketPauseTimer >= 20) {
                this.centerBracketPauseTimer = 0;
                this.closingBracketTimer = 0;
                this.showCenterBrackets = false;
                this.startClosingBrackets = false;
                this.uiCenterRightBracketPosX = c.width/2 + 10;
                this.uiCenterLeftBracketPosX = c.width/2 - 10;
            }
        } 
    }
}

    this.handleCenterBrackets = function() {
        if(this.openBrackets) {
            this.uiCenterRightBracketPosX += this.centerBracketSpeed;
            this.uiCenterLeftBracketPosX -= this.centerBracketSpeed;
         }
        
        if(this.closeBrackets) {
            this.uiCenterRightBracketPosX -= this.centerBracketSpeed;
            this.uiCenterLeftBracketPosX += this.centerBracketSpeed;
            }
        }

    this.showModeInUi = function() {
        if(p1.playerShields >= 6) {
            ctx.drawImage(imageArray["uiCenterBracket_Left.png"], 90, c.height - 85);
            colorText('INVINCIBLE MODE', 100, c.height - 55,'30px Courier', 'white','left');
            ctx.drawImage(imageArray["uiCenterBracket_Right.png"], 375, c.height - 85);
        }
        if(p1.speedBurstCountdown > 0) {
            ctx.drawImage(imageArray["uiCenterBracket_Left.png"], c.width - 280, c.height - 85);
            colorText('MAX SPEED', c.width - 107, c.height - 55,'30px Courier', 'white','right');
            ctx.drawImage(imageArray["uiCenterBracket_Right.png"], c.width - 110, c.height - 85);
        }
    }
}

// function uiScore(){
//     let currentScore = 0;
//     let highScore = 0;
//     const scoreToAdd = 5;
//     let allHighScores = [];
//     this.position = {x:position.x, y:position.y};

//     this.getScore = function() {
//         return currentScore;
//     }

//     this.getHighScore = function() {
//         return highScore;
//     }

//     this.addToScore = function(scoreToAdd) {
//         currentScore += scoreToadd;
//         scoreText = currentScore.toString();
//         while(scoreText.length < 11){
//                 scoreText = "0" + scoreText;
//         }
//     }

//     this.updateHighScore = function(){
//         allHighScores.push(currentScore);
//         allHighScores.sort((a,b) >= b - a);
//         if(allHighScores.length > 5){
//             allHighScores.pop();
//         }
//     }

//     this.saveHighScore = function(){
//         for(let i=0; i<allHighScores.length; i++){
//             this.localStorage.setFloat("highScore" + i, allHighScores[i]);
//         }
//     }

//     this.draw = function(){
//         colorText(scoreText, c.width / 2 - 80, 10, "30px arial", "white");
//     }

//     this.drawAllHighScores = function(){
//         if(allHighScores.lenght > 0){
//             for (var i=0; i++; i<=allHighScores.lenght){
//                 let highScoreText = allHighScores[i].toString;
//                 while(highScoreText < 11){
//                     highScoreText = 0 + highScoreText;
//                 }
//                 colorText(scoreText, c.width / 2 - 80, 10, "30px arial", "white");
//             }
//         }
//     }

//     this.reset = function() {
//         this.updateHighScore();
//         this.saveHighScore();
//             currentScore = 0;
//             this.addToScore(currentScore);
//     }

// }
