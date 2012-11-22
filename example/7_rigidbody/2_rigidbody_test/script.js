/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 20.11.12
 * Time: 12:12
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context(wd, hg);

    recPositon = new Vector( wd/2, hg/2);
    var myRectangleRB = new RectangleRB( recPositon, 100, 100);
    myRectangleRB.mass = 10;
    myRectangleRB.momentInteria = 50;
    myRectangleRB.velocity = new Vector(0, 10);
    myRectangleRB.init();
    myRectangleRB.fillColor = "#000";

    myRectangleRB.angVelocity = 0;
    myRectangleRB.draw(myContext);

    var gravity = new Vector(0, 50);

    loop();

    function loop(){
        contextClear.update_fill(myContext);

//        calculation of the force

//        myRectangleRB.setGravity(gravity);
        myRectangleRB.resetForce();

//        calculation
        myRectangleRB.torque = 1;
        myRectangleRB.torque += - 0.1 * myRectangleRB.angVelocity;
        myRectangleRB.updateAngularVelocity();

        console.log(myRectangleRB.angVelocity);

//        update the position, velocity, and acceleration of rectangle
        myRectangleRB.update();

//        drawing the rectangle
        myRectangleRB.draw(myContext);


        requestAnimFrame(loop);
    }

})();