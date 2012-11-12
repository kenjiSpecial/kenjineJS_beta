/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/11/12
 * Time: 6:29 PM
 * To change this template use File | Settings | File Templates.
 */


(function () {

    /*
     * creating ball class
     */


    var Ball = function () {
        this.color = "rgba(100,100,100, 0.3)";
        this.size = 5;
    };


    Ball.prototype.draw = function (context, particle) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(particle.position.x, particle.position.y, this.size, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    };

    var Table = function () {
        this.color = "rgb(0, 0, 0)";
    };

    Table.prototype.draw = function (context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(0, 200, 600, 200);
        context.fill();
        context.closePath();
    };


    /*
     ********************
     ********************
     */

    var wd = 600;
    var hg = 400;

    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var myParticles = [];

    for (var i = 0; i < 5; i++) {
        var myParticle = new Particle();
        myParticle.mass = 10;
        myParticle.position = new Vector(wd * (0.4 + 0.2 * Math.random()), 20 * (i + 1) / 6);

        myParticle.velocity = new Vector(0, 0);
        myParticle.force = new Vector(0, 0);
        myParticle.acceleration = new Vector(0, 0);

        myParticles.push(myParticle);
    }

    var myBall = new Ball();
    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector( 0, 50);

    //setting the spring
    var mySprings = [];

    for (i = 0; i < 5; i++) {
        var mySpring = new Spring();
        if (i === 0) {
            mySpring.startVector = new Vector(wd / 2, 0);
            mySpring.endVector = myParticles[i].position.copy();
        } else {
            mySpring.startVector = myParticles[i - 1].position.copy();
            mySpring.endVector = myParticles[i].position.copy();
        }

        mySprings.push(mySpring);
    }


    var myArrow = new Arrow(myParticle.velocity);
    myArrow.setStartPt(myParticle.position);

    var myForceArrow = new Arrow(myParticle.acceleration);
    myForceArrow.setStartPt(myParticle.position);

    var startVector = new Vector(wd / 2, 0)

    drawing();

    /** creating drawing() function. **/

    function drawing() {
        contextClear.update_fill(myContext);

//        setting the gravity
        for(var i = 0 ; i < 5; i++){
            myParticles[i].setGravity(gravity);
            mySprings[i].calculation_spring_force(myParticles[i]);
        }

        for(i = 0; i < 5; i++){

            myParticles[i].update();
            if(i == 0){
                mySprings[i].setParticlePosition( myParticles[i]);
            }else{
                mySprings[i].setParticlePositions(myParticles[i -1], myParticles[i]);
            }
        }


//        myParticle.resetForce();
        //--------------
        //drawing phrase
        //--------------

        for(i = 0; i < 5; i++){
            mySprings[i].draw(myContext, myBall.size);

            myArrow.setVector( myParticles[i].velocity);
            myArrow.setStartPt( myParticles[i].position);
            myArrow.draw(myContext);

            myForceArrow.setVector( myParticles[i].acceleration);
            myForceArrow.setStartPt( myParticles[i].position);
            myForceArrow.draw(myContext);

            myBall.draw(myContext, myParticles[i]);
        }


//        myParticle.resetForce();
        requestAnimFrame(drawing);

    }
})();