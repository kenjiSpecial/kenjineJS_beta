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



//----------------------

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
    var myPlanetParticle = new SpaceParticle();
    myPlanetParticle.mass = 10000;
    myPlanetParticle.radius = 100;

    myPlanetParticle.omega = Math.sqrt(myPlanetParticle.g * myPlanetParticle.mass/ (myPlanetParticle.radius * myPlanetParticle.radius * myPlanetParticle.radius));

    myPlanetParticle.centerPos = myCenterPositionVector;


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
        myPlanetParticle.update();

        myPlanetBall.draw(myPlanetParticle.position, myContext);
        myCenterBall.draw(myCenterPositionVector, myContext);

        requestAnimFrame(loop);
    }

})();