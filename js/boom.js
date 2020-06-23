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

    // data
    var x=[],y=[],life=[],alpha=[],fade=[],size=[],grow=[],
        rot=[],rotspd=[],xspd=[],yspd=[],friction=[],sprnum=[],
        max=0,i=0;

    // functions
    this.update = function() {

        for (i=0; i<max; i++) {
            if (!life[i]) continue;
            life[i]--;
            x[i] += xspd[i];
            y[i] += yspd[i];
            rot[i] += rotspd[i];
            alpha[i] -= fade[i];
            size[i] += grow[i];
            xspd[i] *= friction[i];
            yspd[i] *= friction[i];
            rotspd[i] *= friction[i];
        }
    };

    this.draw = function() {
        for (i=0; i<max; i++) {
            ctx.save();
            ctx.translate(size[i]/2,size[i]/2);//place imaginary hand at pivot point
            ctx.rotate(rot[i]);// + Math.PI/2);//rotate with hand at pivot based in radians
            ctx.translate(-size[i]/2,-size[i]/2);//move imaginary hand back to original spot
            ctx.translate(x[i],y[i]);
            ctx.globalAlpha = alpha[i];
            ctx.drawImage(imageArray["boom.png"],
                u[i],v[i],256,256, // u,v,sw,sh
                0,0,size[i],size[i]);
            ctx.restore();
        }
    };

    this.explosion = function(x,y) {
        // find an unused array index
        // or a new one at the end
        for (i=0; i<max+1; i++) {
            if (!life[i]) break;
        }
        // fill in the new data
        x[i] = x;
        y[i] = y;
        u[i] = 0; // fixme: sprnum
        v[i] = 0;
        life[i] = 1000;
        alpha[i] = 1;
        fade[i] = 0.1;
        scale[i] = 0;
        grow[i] = 0.1;
        rot[i] = 0;
        rotspd[i] = (Math.random()*2-1) * (Math.PI*2)
        xspd[i] = Math.random()*10-5;
        yspd[i] = Math.random()*10-5;
        friction[i] = 0.95;
        sprnum[i] = 1;
    };

}(); // global boom is created immediately