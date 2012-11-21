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
//    var myCanvas = $("#myCanvas")[0];
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context(wd, hg);
//    var firstPos = new Vector(0, hg * 0.2 - 40);


    var gravity = new Vector(0, 40);

    var myWall = new Wall();
    myWall.beginVector = new Vector(0, hg * 0.2);
    myWall.endVector = new Vector(wd, hg * 0.8);
    myWall.bouncing = -0.2;
    myWall.cal_normalize();

    var myWallEdgeVector = myWall.endVector.edge(myWall.beginVector);
    var myWallNormalVector = myWallEdgeVector.normal();

    var firstPos = myWall.beginVector.addScaledVector(myWallEdgeVector, 0.2).addScaledVector(myWallNormalVector, 40);
    var myCircle = new CircleRB(firstPos, 40);
    myCircle.initCircle();

    myCircle.draw(myContext);
    myWall.draw(myContext);


})();