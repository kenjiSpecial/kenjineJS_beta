/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 14.11.12
 * Time: 17:17
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

    var centerPosition = new Vector( wd/2, hg/2);
    var myCenterBall = new Ball();
    myCenterBall.color = "#ff0000";
    myCenterBall.size = 20;

    var particle01 = new Particle();
    particle01.mass = 10;
    particle01.position = new Vector(400, 50);
    particle01.velocity = new Vector( 0, 0);
    var myBall01 = new Ball();
    myBall01.size = 10;

    var particle02 = new Particle();
    particle02.mass = 6;
    particle02.position = new Vector(500, 300);
    particle02.velocity = new Vector( 0, 0);
    var myBall02 = new Ball();
    myBall02.size = 6;

    var particle03 = new Particle();
    particle03.mass = 12;
    particle03.position = new Vector(200, 300);
    particle03.velocity = new Vector( 0, 0);
    var myBall03 = new Ball();
    myBall03.size = 12;

    var initVector = new Vector(0, 0);

    var arrow01 = new Arrow(initVector);
    var arrow02 = new Arrow(initVector);
    var arrow03 = new Arrow(initVector);

    var contextClear = new Canvas_Context( wd, hg);

    loop();

    function loop(){
        contextClear.update_fill(myContext);

//        calculating the force
        orbitForce(centerPosition, particle01);
        orbitForce(centerPosition, particle02);
        orbitForce(centerPosition, particle03);

//        update the position, velocity, acceleration of the particle
        particle01.update();
        particle02.update();
        particle03.update();

//
//         changing the value of startVector and setVector in the arrow.
        arrow01.setStartPt(particle01.position);
        arrow01.setVector(particle01.force);

        arrow02.setStartPt(particle02.position);
        arrow02.setVector(particle02.force);

        arrow03.setStartPt(particle03.position);
        arrow03.setVector(particle03.force);

//        drawing the ball on canvas
        myCenterBall.draw(centerPosition, myContext);

        myBall01.draw( particle01.position, myContext);
        myBall02.draw( particle02.position, myContext);
        myBall03.draw( particle03.position, myContext);

//        drawing the arrow
        arrow01.draw(myContext);
        arrow02.draw(myContext);
        arrow03.draw(myContext);

        requestAnimFrame(loop);
    }

})();