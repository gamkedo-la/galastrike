// boom - explosion generator
// by mcfunkypants

// a really simple particle system
// uses a relaxed and fast data-oriented style
// ideally no runtime GC, no new()

// example of spawning an effect
// boom.explosion(x,y);

// put in your main loop:
// boom.update();
// boom.draw();

var boom = new function() {

    const SPR_SIZE = 256; // pixel size of one sprite in the spritesheet
    const SPR_RAD = 128; // half that size, used for centering
    
    var xpos=[],ypos=[],life=[],alpha=[],fade=[],
        size=[],grow=[],rot=[],rotspd=[],
        xspd=[],yspd=[],friction=[],
        sprx=[],spry=[],max=0,i=0;

    this.update = function() {

        for (i=0; i<max; i++) {
            if (!life[i]) continue;
            life[i]--;
            xpos[i] += xspd[i];
            ypos[i] += yspd[i];
            rot[i] += rotspd[i];
            alpha[i] -= fade[i];
            size[i] += grow[i];
            xspd[i] *= friction[i];
            yspd[i] *= friction[i];
            //rotspd[i] *= friction[i];
            if (size[i] < 1) size = 1;
            if (alpha[i] < 0) alpha[i] = 0;
            if (alpha[i] > 1) alpha[i] = 1;
        }
    };

    this.draw = function() {
        for (i=0; i<max; i++) { // draw them all
            var scale = size[i]/SPR_SIZE;
            ctx.setTransform(scale, 0, 0 ,scale, xpos[i], ypos[i]);
            ctx.rotate(rot[i]);
            ctx.globalAlpha = alpha[i];
            ctx.drawImage(imageArray["boom.png"],sprx[i],spry[i],SPR_SIZE,SPR_SIZE,-SPR_RAD,-SPR_RAD,SPR_SIZE,SPR_SIZE);            

        }
        ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
        ctx.globalAlpha = 1;
    };

    function freeID() {
        // find an unused array index
        // or a new one at the end
        for (i=0; i<max+1; i++) {
            if (!life[i]) break;
        }
        if (i==max) { // a brand new one?
            max++; 
            //console.log("new boom at "+x+","+y+" - max: " + max)
        } 
        return i;
    }

    this.explosion = function(x,y) {
        i = freeID();
        xpos[i] = x;
        ypos[i] = y;
        sprx[i] = Math.floor(Math.random()*4)*256;
        spry[i] = Math.floor(Math.random()*4)*256;
        life[i] = 30;
        alpha[i] = 1;
        fade[i] = 1/30;
        size[i] = 1;
        grow[i] = 16;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = (Math.random()*2-1)*0.03;
        xspd[i] = Math.random()*30-15;
        yspd[i] = Math.random()*30-15;
        friction[i] = 0.8;
    };

}(); // global boom is created immediately