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
    
    // hardcoded spritesheet coordinates (4x4 sprites of 256x256 pixels each)
    const UVSMOKE = [0*SPR_SIZE,0*SPR_SIZE]; 
    const UVIMPACT = [1*SPR_SIZE,0*SPR_SIZE]; 
    const UVMOON = [2*SPR_SIZE,0*SPR_SIZE]; 
    const UVFIRE = [3*SPR_SIZE,0*SPR_SIZE]; 
    const UVPLASMA = [0*SPR_SIZE,1*SPR_SIZE]; 
    const UVSPARKS = [1*SPR_SIZE,1*SPR_SIZE]; 
    const UVFLASH = [2*SPR_SIZE,1*SPR_SIZE]; 
    const UVRING = [3*SPR_SIZE,1*SPR_SIZE]; 
    const UVENEMYA = [0*SPR_SIZE,2*SPR_SIZE]; 
    const UVENEMYB = [1*SPR_SIZE,2*SPR_SIZE]; 
    const UVENEMYC = [2*SPR_SIZE,2*SPR_SIZE]; 
    const UVBOSSBITS = [3*SPR_SIZE,2*SPR_SIZE]; 
    const UVROCKA = [0*SPR_SIZE,3*SPR_SIZE]; 
    const UVROCKB = [1*SPR_SIZE,3*SPR_SIZE]; 


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
        // reuse an idle particle
        for (i=0; i<max+1; i++) {
            if (!life[i]) break;
        }
        // didn't find one? increase pool size
        if (i==max) { 
            max++; 
        } 
        return i;
    }

    function impact(x,y) {
        // short spiky flash
        i = freeID();
        sprx[i] = UVIMPACT[0];
        spry[i] = UVIMPACT[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 8;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 256; 
        grow[i] = 0;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = 0;
    }

    function flash(x,y) {
        // huge faint circle
        i = freeID();
        sprx[i] = UVFLASH[0];
        spry[i] = UVFLASH[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 10;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 256; 
        grow[i] = 0;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = 0;
        rotspd[i] = 0;
    }

    function fireball(x,y) {
        // slow big red fireball
        i = freeID();
        sprx[i] = UVFIRE[0];
        spry[i] = UVFIRE[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 60;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 0; 
        grow[i] = 5;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = (Math.random()*2-1)*0.05;
    }

    function plasma(x,y) {
        // bright plasma fireball
        i = freeID();
        sprx[i] = UVPLASMA[0];
        spry[i] = UVPLASMA[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 30;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 0; 
        grow[i] = 10;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = (Math.random()*2-1)*0.05;
    }

    function shockwave(x,y) {
        // a huge ring like the death star explosion
        i = freeID();
        sprx[i] = UVRING[0];
        spry[i] = UVRING[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 60;
        alpha[i] = 0.75; 
        fade[i] = 2/life[i];
        size[i] = 0; 
        grow[i] = 24;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = 0;
        rotspd[i] = 0;
    }

    function sparks(x,y) {
        // fast moving sparkles
        i = freeID();
        sprx[i] = UVSPARKS[0];
        spry[i] = UVSPARKS[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 16;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 24; 
        grow[i] = 64;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = 0;
    }

    function smallSparks(x,y) {
        // fast moving sparkles
        i = freeID();
        sprx[i] = UVSPARKS[0];
        spry[i] = UVSPARKS[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 8;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 1; 
        grow[i] = 32;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = 0;
    }

    function moon(x,y) {
        // anime-inspired crescent moon of energy
        i = freeID();
        sprx[i] = UVMOON[0];
        spry[i] = UVMOON[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 33;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 256; 
        grow[i] = 0;
        friction[i] = 0;
        xspd[i] = 0;
        yspd[i] = 0;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = 0;
    }    

    function debris(x,y,UV=UVENEMYA) {
        // anime-inspired crescent moon of energy
        i = freeID();
        sprx[i] = UV[0];
        spry[i] = UV[1];
        xpos[i] = x;
        ypos[i] = y;
        life[i] = 60;
        alpha[i] = 1; 
        fade[i] = 1/life[i];
        size[i] = 100; 
        grow[i] = 4;
        friction[i] = 0.7;
        xspd[i] = Math.random()*8-4;
        yspd[i] = Math.random()*8-4;
        rot[i] = Math.random()*Math.PI*2;
        rotspd[i] = Math.random()*0.05-0.025;
    }

    function rnd(min, max) {
        return Math.random() * (max - min) + min;
    }

    // random values example
    // xspd[i] = Math.random()*30-15; // subtle movement
    // friction[i] = 0.9; // decrease speed
    // rot[i] = Math.random()*Math.PI*2; // 0-360 deg in radians
    // rotspd[i] = (Math.random()*2-1)*0.03; // subtle slow spins

    this.bigExplosion = function(x,y) {
        fireball(x+rnd(-20,20),y+rnd(-20,20));
        fireball(x+rnd(-20,20),y+rnd(-20,20));
        fireball(x+rnd(-20,20),y+rnd(-20,20));
        plasma(x+rnd(-20,20),y+rnd(-20,20));
        plasma(x+rnd(-20,20),y+rnd(-20,20));
        plasma(x+rnd(-20,20),y+rnd(-20,20));
        shockwave(x,y);
        sparks(x,y);
        moon(x,y);
        flash(x,y);
        impact(x,y);
    };

    this.smallExplosion = function(x,y) {
        plasma(x+rnd(-20,20),y+rnd(-20,20));
        plasma(x+rnd(-20,20),y+rnd(-20,20));
        moon(x,y);
        flash(x,y);
        impact(x,y);
    };

    this.bigImpact = function(x,y) {
        smallSparks(x,y);
        moon(x,y);
    };

    this.smallImpact = function(x,y) {
        smallSparks(x,y);
    };

    this.debrisA = function(x,y) {
        debris(x,y,UVENEMYA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYA);
    }
    this.debrisB = function(x,y) {
        debris(x,y,UVENEMYB);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYB);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYB);
    }
    this.debrisC = function(x,y) {
        debris(x,y,UVENEMYC);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYC);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVENEMYC);
    }
    this.debrisBOSS = function(x,y) {
        debris(x,y,UVBOSSBITS);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVBOSSBITS);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVBOSSBITS);
    }
    this.debrisROCKA = function(x,y) {
        debris(x,y,UVROCKA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVROCKA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVROCKA);
    }
    this.debrisROCKB = function(x,y) {
        debris(x,y,UVROCKA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVROCKA);
        debris(x+rnd(-8,8),y+rnd(-8,8),UVROCKA);
    }

}(); // global boom is created immediately