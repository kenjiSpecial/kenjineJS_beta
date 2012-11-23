/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 22.11.12
 * Time: 16:45
 * To change this template use File | Settings | File Templates.
 */

(function () {
    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector(0, 40);

    var myWall = new Wall();
    myWall.beginVector = new Vector(0, hg * 0.9);
    myWall.endVector = new Vector(wd, hg * 0.9);
    myWall.bouncing = -0.2;
    myWall.cal_normalize();

    recPosition = new Vector( wd/2, hg/2);
    var myRectangleRB = new RectangleRB( recPosition, 100, 100);
    myRectangleRB.mass = 10;
    myRectangleRB.momentInteria = 5000;
    myRectangleRB.velocity = new Vector(0, 100);
    myRectangleRB.init();
    myRectangleRB.fillColor = "#000";
    myRectangleRB.rotation = Math.PI/6;
    myRectangleRB.update();



    myRectangleRB.angVelocity = 0;

    loop();

    function loop(){
        contextClear.update_fill(myContext);

        myRectangleRB.setGravity(gravity);

        myRectangleRB.update();

        myRectangleRB.draw(myContext);
        myWall.draw(myContext);

        myWall.checkRectangleRBBounce(myRectangleRB);

        requestAnimFrame(loop);
    }

})();