function uiOverlay() {
    this.leftPosX = 0;
    this.leftPosY = c.height - 220;
    this.rightPosX = c.width - 460;
    this.rightPosY = c.height - 220;


    this.draw = function() {
        ctx.drawImage(imageArray["leftUiSegment.png"], this.leftPosX, this.leftPosY);
        ctx.drawImage(imageArray["rightUiSegment.png"], this.rightPosX, this.rightPosY);
    }

}

const stabilizing = 0;
const shield = 1;
const ammo = 2;
const speedBurst = 3;

function uiMessages() {
    this.x = c.width/2;
    this.y = c.height - 20;


    this.draw = function(mode) {

        switch(mode) {
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
