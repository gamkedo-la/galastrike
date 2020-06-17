// a simple trail renderer made by McFunkypants for Galastrike

function trailsFX() {

    var i = 0; // reused
    var num = 32; // how many to draw
    var max = 0; // array size
    var alpha = 1; // opacity, reused
    var maxAlpha = 0.15; // starting opacity
    var xpos = [];
    var ypos = [];
    var rgba = "rgba(255,255,0,0.5)";
    var width = 16;
    var offsetx = 72;
    var offsety = 90;
    var trailSpeed = 4;

    this.draw = function(x,y) {

        // remember new position
        xpos[max] = x;
        ypos[max] = y;
        max++;

        if (max<num) return;


        alpha = 1;
        // draw each line segment more faded out
        for (i=max-num+1; i<max; i++) {

            alpha -= 1/num;
            if (alpha<0) alpha = 0;
            ctx.beginPath();
            //ctx.strokeStyle = rgba;
            ctx.strokeStyle = "rgba(255,255,0,"+(maxAlpha*(1-alpha))+")";
            ctx.lineWidth = width * (1-alpha);
            ctx.moveTo(xpos[i-1]+offsetx,ypos[i-1]+offsety);
            ctx.lineTo(xpos[i]+offsetx,ypos[i]+offsety);
            ctx.stroke();

            // move previous segments down
            ypos[i] += trailSpeed; // FIXME use starFieldSpeed?
    
        }
        
    };
}