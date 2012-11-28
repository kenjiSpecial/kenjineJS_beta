/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 16.11.12
 * Time: 14:34
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
    myWall.beginVector = new Vector( wd * 0.1, hg * 0.6);
    myWall.endVector = new Vector( wd * 0.8, hg * 0.2);
    myWall.cal_normalize();
    myWall.bouncing = -0.8;

    var myWall02 = new Wall();
    myWall02.beginVector = new Vector( 0, 0);
    myWall02.endVector = new Vector( 0, hg);
    myWall02.cal_normalize();
    myWall02.bouncing = -0.8;

    var myWall03 = new Wall();
    myWall03.beginVector = new Vector( 0, hg * 0.8);
    myWall03.endVector = new Vector( wd, hg);
    myWall03.cal_normalize();
    myWall03.bouncing = -0.8;

    var particleNum = 200;
    var particles = [];

    for(var i = 0; i < particleNum; i++){

        var myParticle = new Particle();
        myParticle.mass = 20;
        myParticle.position = new Vector( wd/2, hg*0.1);
        var randomTheta = ( 0 + 180 * Math.random())/180 * Math.PI;
        myParticle.velocity = new Vector( 160 * Math.cos(randomTheta), 160 * Math.sin(randomTheta));

        particles.push(myParticle);
    }


    var myBall = new Ball();

    var gravity = new Vector( 0, 100);

    loop();

    function loop(){
//        console.log("loop");
//        clear the canvas
        contextClear.update_fill(myContext);

//        calculation of the force
        for(var i =0; i < particleNum; i++){
            var myParticle = particles[i];

            myParticle.setGravity(gravity);
            myParticle.update();

            myWall.checkBounce( myParticle, myBall.size);
            myWall02.checkBounce( myParticle, myBall.size);
            myWall03.checkBounce( myParticle, myBall.size);

            myBall.draw( myParticle.position, myContext);
        }

//        drawing

        myWall.draw( myContext);
        myWall03.draw( myContext);

        requestAnimFrame(loop);
    }

})();