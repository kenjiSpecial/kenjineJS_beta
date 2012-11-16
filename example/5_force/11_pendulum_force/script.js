/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 13.11.12
 * Time: 18:48
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
    var myCenterPositionVector = new Vector(wd / 2, 40);

    //pendulum length
    var theta = 30 / 180 * Math.PI;
    var length = 180;

    // myPlanetParticle
    var myParticle = new Particle();
    myParticle.mass = 10;
    var endVector = new Vector( length * Math.sin(theta), length * Math.cos(theta));
    myParticle.velocity = new Vector(0, 0);
    myParticle.position = myCenterPositionVector.addVector(endVector);

    var myPendulum = new Pendulum();
    myPendulum.centerPos = myCenterPositionVector;

    var forceArrow = new Arrow(new Vector(0, 0));
    forceArrow.color = "#999999";

    var gravity = new Vector(0, 50);
    var contextClear = new Canvas_Context(wd, hg);

    loop();



    function loop() {

        //calculation of the velocity
        contextClear.update_fill(myContext);

        myParticle.setGravity(gravity);
        myPendulum.calculateForce(myParticle);
        myParticle.update();

        //drawing the pendulum.
        myPendulum.draw( myParticle, myContext);
        forceArrow.setVector(myParticle.force);
        forceArrow.setStartPt(myParticle.position);
        forceArrow.draw(myContext);

        requestAnimFrame(loop);
    }



})();