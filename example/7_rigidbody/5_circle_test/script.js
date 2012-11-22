/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 21.11.12
 * Time: 17:24
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

    var gravity = new Vector(0, 40);

    var myWall = new Wall();
    myWall.beginVector = new Vector(0, hg * 0.9);
    myWall.endVector = new Vector(wd, hg * 0.1);
    myWall.bouncing = -0.2;
    myWall.cal_normalize();

    var myWallEdgeVector = myWall.endVector.edge(myWall.beginVector);
    var myWallNormalVector = myWallEdgeVector.normal();

    var firstPos = myWall.beginVector.addScaledVector(myWallEdgeVector, 0.9).addScaledVector(myWallNormalVector, 10);
    var myCircle = new CircleRB(firstPos, 10);
    myCircle.mass = 1;
    myCircle.momentInteria = .5 * myCircle.rad * myCircle.rad * myCircle.mass;
//    console.log(myCircle.momentInteria);
    myCircle.init();

    var nextPos = myWall.beginVector.addScaledVector(myWallEdgeVector, 0.4).addScaledVector(myWallNormalVector, 80);
    var bigCircle = new CircleRB(nextPos, 80);
    bigCircle.mass = 40;
    bigCircle.momentInteria = .5 * bigCircle.rad * bigCircle.rad * bigCircle.mass;
    bigCircle.init();

    loop();

    function loop(){
        contextClear.update_fill(myContext);

        myCircle.setGravity(gravity);
        myWall.calcRBForce(myCircle);

        bigCircle.setGravity(gravity);
        myWall.calcRBForce(bigCircle);

        myCircle.update();
        bigCircle.update();

        myWall.draw(myContext);
        myCircle.draw(myContext);
        bigCircle.draw(myContext);

        requestAnimFrame(loop);
    }

})();