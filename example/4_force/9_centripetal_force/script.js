/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 12.11.12
 * Time: 11:39
 * To change this template use File | Settings | File Templates.
 */

(function () {

    var Ball = function () {
        this.color = "rgba(100, 100, 100, 1)";
        this.size = 24;
    };

    Ball.prototype.draw = function (ballPosition, myContext) {
        myContext.beginPath();
        myContext.fillStyle = this.color;
        myContext.arc(ballPosition.x, ballPosition.y, this.size, 0, 2 * Math.PI, false);
        myContext.fill();
        myContext.closePath();
    };

    var centripetalParticle = function(){
        this.mass = undefined;
        this.velocity = undefined;
        this.position = undefined;

        this.lastTime = new Date().getTime();
    };




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

    // myPlanetParticle
    var myPlanetParticle = new Particle();
    myPlanetParticle.mass = 100;
    myPlanetParticle.position = new Vector(wd * 3 / 4, hg / 2);
    myPlanetParticle.velocity = new Vector(0, 0);
    myPlanetParticle.force = new Vector(0, 0);
    myPlanetParticle.acceleration = new Vector(0, 0);

    var myPlanetBall = new Ball();
    myPlanetBall.size = 5;

    var myBackgroundFill = new Canvas_Context(wd, hg);
    myBackgroundFill.update_fill(myContext);


    loop();

    function loop() {
        //update the background of canvas.
        myBackgroundFill.update_fill(myContext);

        //calculation of the velocity
//        CentripetalForce(myCenterPositionVector, myPlanetParticle);
//        myPlanetParticle.update();



        myPlanetBall.draw(myPlanetParticle.position, myContext);
        myCenterBall.draw(myCenterPositionVector, myContext);

        requestAnimFrame(loop);
    }


})();