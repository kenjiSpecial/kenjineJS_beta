/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 13.11.12
 * Time: 15:58
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var Ball = function () {
        this.color = "rgba(100, 100, 100, 1)";
        this.size = 12;
    };

    Ball.prototype.draw = function (ballPosition, myContext) {
        myContext.beginPath();
        myContext.fillStyle = this.color;
        myContext.arc(ballPosition.x, ballPosition.y, this.size, 0, 2 * Math.PI, false);
        myContext.fill();
        myContext.closePath();
    };

//    ---------------

    var wd = 600;
    var hg = 400;

    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    // myCenterBall
    var myCenterPositionVector = new Vector(wd / 2, hg / 2);
    var myCenterBall = new Ball();
    myCenterBall.color = "#26ade4";

//    myPlanetParticleVelocity
    var myPlanetParticleVelocityValue = 180;

    // myPlanetParticle
    var myPlanetParticle = new Particle();
    myPlanetParticle.mass = 10;
    myPlanetParticle.position = new Vector( wd *(.5 + Math.random()* 0.1 - 0.05)  , hg *(.5 + Math.random()* 0.1 - 0.05));
    var thetaRandom = Math.PI * 2 * Math.random();
    myPlanetParticle.velocity = new Vector(0, myPlanetParticleVelocityValue); //new Vector(myPlanetParticleVelocityValue * Math.cos(thetaRandom), myPlanetParticleVelocityValue * Math.sin(thetaRandom));


    var myPlanetBall = new Ball();
    myPlanetBall.size = 1;

    var myBackgroundFill = new Canvas_Context(wd, hg);
    myBackgroundFill.update_fill(myContext);

    var testCount = 0;

    myCenterBall.draw(myCenterPositionVector, myContext);

    loop();



    function loop() {


        //update the background of canvas.
//        myBackgroundFill.update_fill(myContext);

        //calculation of the velocity
        centripetalForce(myCenterPositionVector, myPlanetParticle, myPlanetParticleVelocityValue);


        myPlanetParticle.update();

        myPlanetBall.draw(myPlanetParticle.position, myContext);

        myPlanetParticle.resetForce();

        testCount++;


        requestAnimFrame(loop);
    }



})();
