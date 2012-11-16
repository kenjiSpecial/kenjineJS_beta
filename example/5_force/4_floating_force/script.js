/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/8/12
 * Time: 9:00 AM
 * To change this template use File | Settings | File Templates.
 */


(function () {

    /*
     * creating ball class
     */

    var Ball = function () {
        this.color = "rgba(100,100,100, 0.3)";
        this.size = 40;
    };


    Ball.prototype.draw = function (context, particle) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(particle.position.x, particle.position.y, this.size, 0, Math.PI * 2, false);
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

    var myParticle = new Particle();

    myParticle.mass = 1;
    myParticle.position = new Vector(40, 40);
    myParticle.velocity = new Vector(200, 100);
    myParticle.acceleration = new Vector(0, 0);

    var myBall = new Ball();
    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector(0, 50);

    //setting the Riser class
    var myWater = new Water(0, hg /3, wd, hg /3 * 2);

    var myArrow = new Arrow(myParticle.velocity);
    myArrow.setStartPt(myParticle.position);

    var myForceArrow = new Arrow(myParticle.acceleration);
    myForceArrow.setStartPt(myParticle.position);

    drawing();

    /** creating drawing() function. **/

    function drawing() {
        contextClear.update_fill(myContext);

        //--------------
        //drawing phrase
        //--------------

//        setting the gravity
        myParticle.setGravity(gravity);

//        setting the force of the water
        myWater.floating_force(myParticle, myBall.size);

        myParticle.update();

        //--------------
        //drawing phrase
        //--------------

        myWater.draw(myContext);

        myArrow.setVector(myParticle.velocity);
        myArrow.setStartPt(myParticle.position);
        myArrow.draw(myContext);

        myForceArrow.setVector(myParticle.acceleration);
        myForceArrow.setStartPt(myParticle.position);
        myForceArrow.draw(myContext);

        myBall.draw(myContext, myParticle);

        myParticle.resetForce();
        requestAnimFrame(drawing);
    }
})();