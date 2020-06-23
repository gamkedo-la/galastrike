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

    var xpos=[],ypos=[],life=[],alpha=[],fade=[],
        size=[],grow=[],rot=[],rotspd=[],
        xspd=[],yspd=[],friction=[],
        sprnum=[],sprx=[],spry=[],max=0,i=0;

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
            rotspd[i] *= friction[i];
            if (size[i] < 1) size = 1;
            if (alpha[i] < 0) alpha[i] = 0;
            if (alpha[i] > 1) alpha[i] = 1;
        }
    };

    this.draw = function() {
        for (i=0; i<max; i++) {
            ctx.save();
            //ctx.translate(size[i]/2,size[i]/2);
            //ctx.rotate(rot[i]);
            ctx.translate(-size[i]/2,-size[i]/2);
            ctx.translate(xpos[i],ypos[i]);
            ctx.globalAlpha = alpha[i];
            ctx.drawImage(imageArray["boom.png"],
                sprx[i],spry[i],256,256,0,0,size[i],size[i]);
            ctx.restore();
        }
    };

    this.explosion = function(x,y) {
        // find an unused array index
        // or a new one at the end
        for (i=0; i<max+1; i++) {
            if (!life[i]) break;
        }
        if (i==max) { // new one?
            max++; 
            console.log("boom at "+x+","+y+" - max: " + max)
        } 
        xpos[i] = x;
        ypos[i] = y;
        sprx[i] = 768;
        spry[i] = 0;
        life[i] = 30;
        alpha[i] = 1;
        fade[i] = 1/30;
        size[i] = 1;
        grow[i] = 16;
        rot[i] = 0;
        rotspd[i] = (Math.random()*2-1)*0.5;
        xspd[i] = 0;//Math.random()*50-25;
        yspd[i] = 0;//Math.random()*50-25;
        friction[i] = 0.8;
        sprnum[i] = 1;
    };

}(); // global boom is created immediately