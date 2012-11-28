/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/9/12
 * Time: 9:58 AM
 * To change this template use File | Settings | File Templates.
 */
//    TODO Not working well

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
    myParticle.mass = 10;
    myParticle.position = new Vector(wd * Math.random(), hg * Math.random());
    myParticle.velocity = new Vector(10 * Math.random() - 5, 10 * Math.random() - 5);
    myParticle.acceleration = new Vector(0, 0);

    var myBall = new Ball();
    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector(0, 50);

    //setting the Riser class
    var myBubble = new Bubble(0, 0, wd, hg);

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
        myBubble.bubble_force(myParticle, myBall);

        myParticle.update();

        //--------------
        //drawing phrase
        //--------------

        myBubble.draw(myContext);

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