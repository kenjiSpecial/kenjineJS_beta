/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 15.11.12
 * Time: 10:55
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

//


    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var myParticle = new Particle();
    myParticle.mass = 100;
    myParticle.velocity = new Vector(100, 0);
    myParticle.acceleration = new Vector(0, 0);
    myParticle.position = new Vector(wd * Math.random(), hg * Math.random());
    myParticle.force = new Vector( 0, 0);
    var damping = 50;

    var myBall = new Ball();
    myBall.color = "#333333";
    myBall.size = 1;

    var gravityPoints = [];
    var gravityBalls = [];

    for(var i = 0; i < 10; i++){
        var gravityPoint = { mass: 5 + (25 * Math.random())|0, position: new Vector( (Math.random() * wd)|0, (Math.random() * hg)|0)};
        var gravityBall = new Ball();
        gravityBall.size = gravityPoint.mass;
        gravityBall.color = "#000000";

        gravityPoints.push(gravityPoint);
        gravityBalls.push(gravityBall);
    }

    //clearing context
//    var contextClear = new Canvas_Context( wd, hg);


    for(var i = 0; i  < gravityPoints.length; i++){
        gravityBalls[i].draw(gravityPoints[i].position, myContext);
    }

    loop();

    function loop(){
        //contextClear.update_fill(myContext);

//        calculation of the force
        gravityFieldCalculation( myParticle, gravityPoints);
        myParticle.force.subtract(myParticle.velocity.x * damping, myParticle.velocity.y * damping);

        myParticle.update();
        if(myParticle.position.x < 0){
            myParticle.position.x += wd;
        }

        if(myParticle.position.x > wd){
            myParticle.position.x -= wd;
        }

        if(myParticle.position.y > hg){
            myParticle.position.y -= hg;
        }

        if(myParticle.position.y < 0){
            myParticle.position.y += hg;
        }

//        drawing the ball and gravity
        myBall.size = (myParticle.velocity.getMagnitude()/300);
        myBall.draw( myParticle.position, myContext);


        myParticle.resetForce();

        requestAnimFrame(loop);
    }

})();