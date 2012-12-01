/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/1/12
 * Time: 8:26 AM
 * To change this template use File | Settings | File Templates.
 */


(function(){
    var wd = 600;
    var hg = 400;



    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#fff";
    myContext.fillRect(0, 0, wd, hg);


    var Vector01 = new Vector(100, 200);
    var Vector02 = new Vector(400, 80);


    var Vector01_magnitude = ((Vector01.getMagnitude()*1000)|0)/1000;
    var Vector02_magnitude = ((Vector02.getMagnitude()*1000)|0)/1000;

    var Vector_dot = Vector01.dotProduct(Vector02);


    myContext.font = '18px sans-serif';

    myContext.fillStyle = '#000000';

    myContext.fillText("magnitude = " + Vector01_magnitude.toString(), 150, 270);
    myContext.fillText("magnitude = " + Vector02_magnitude.toString(), 400, 160);
    myContext.fillText("dot product: " + Vector_dot.toString(), 420, 380);

    var centerPtVector = new Vector( 50, 50);

    var myCoordinate = new Coordinate( wd, hg, centerPtVector);
    myCoordinate.draw(myContext);

    var arrow01 = new Arrow(Vector01);
    arrow01.setStartPt(centerPtVector);
    arrow01.color = "#333333";
    arrow01.draw(myContext);
    myCoordinate.drawVector(myContext, Vector01);

    var arrow02 = new Arrow(Vector02);
    arrow02.setStartPt(centerPtVector);
    arrow02.color = "#333333";
    arrow02.draw(myContext);
    myCoordinate.drawVector(myContext, Vector02);



})();