/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 15.11.12
 * Time: 18:11
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var Ball = function(){
        this.color = "#999999";
        this.size = 12;
    };

    Ball.prototype.draw = function(ballPosition, myContext){
        myContext.beginPath();
        myContext.fillStyle = this.color;
        myContext.arc(ballPosition.x, ballPosition.y, this.size, 0, 2 * Math.PI, false);
        myContext.fill();
        myContext.closePath();
    };

//    ----------------
//    ----------------

    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context( wd, hg);

    var myWall = new Wall();
    myWall.beginVector = new Vector( wd * 0.1, hg * 0.9);
    myWall.endVector = new Vector( wd * 0.9, hg * 0.2);
    myWall.cal_normalize();

    var myParticle = new Particle();
    myParticle.mass = 20;
    myParticle.position = new Vector( wd/2, hg*0.1);
    var randomTheta = ( 0 + 90 * Math.random())/180 * Math.PI;
    myParticle.velocity = new Vector( 160 * Math.cos(randomTheta), 160 * Math.sin(randomTheta));

    var myBall = new Ball();

    var gravity = new Vector( 0, 100);

    loop();

    function loop(){
//        console.log("loop");
//        clear the canvas
        contextClear.update_fill(myContext);

//        calculation of the force
        myParticle.setGravity(gravity);
        myParticle.update();

        myWall.checkBounce( myParticle, myBall.size);

//        drawing
        myBall.draw( myParticle.position, myContext);
        myWall.draw( myContext);

        requestAnimFrame(loop);
    }

})();