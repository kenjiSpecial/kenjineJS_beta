/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 20.11.12
 * Time: 18:23
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

    var pos01 = new Vector(wd/4 * 3, hg/2);
    var myTurbine01 = new TurbineRB(pos01, 120);
    myTurbine01.mass = 20;
    myTurbine01.momentInteria = 12;
    myTurbine01.angVelocity = 0;
    myTurbine01.torque = 0;
    myTurbine01.fillColor = "#000";
    myTurbine01.initPolygon();
    myTurbine01.init();

    var pos02 = new Vector( wd/4, hg/4);
    var myTurbine02 = new TurbineRB(pos02, 80);
    myTurbine02.mass = 16;
    myTurbine02.momentInteria = 8;
    myTurbine02.angVelocity = 0;
    myTurbine02.torque = 0;
    myTurbine02.fillColor = "#000";
    myTurbine02.initPolygon();
    myTurbine02.init();

    var pos03 = new Vector( wd/3, hg/4 * 3);
    var myTurbine03 = new TurbineRB( pos03, 100);
    myTurbine03.mass = 16;
    myTurbine03.momentInteria = 3;
    myTurbine03.angVelocity = 0;
    myTurbine03.torque = 0;
    myTurbine03.fillColor = "#000";
    myTurbine03.initPolygon();
    myTurbine03.init();


    $("#myCanvas").click(generatingWind);

    function generatingWind(){
        myTurbine01.torque = 20;
        myTurbine02.torque = 20;
        myTurbine03.torque = 20;
    }


    loop();

    function loop(){
        contextClear.update_fill(myContext);

        myTurbine01.torque += - 0.3 * myTurbine01.angVelocity;
        myTurbine02.torque += - 0.3 * myTurbine01.angVelocity;
        myTurbine03.torque += - 0.3 * myTurbine01.angVelocity;

        myTurbine01.updateAngularVelocity();
        myTurbine02.updateAngularVelocity();
        myTurbine03.updateAngularVelocity();

        myTurbine01.update();
        myTurbine02.update();
        myTurbine03.update();

        //drawing of turbines
//        console.log(ang)
        myTurbine01.draw(myContext);
        myTurbine02.draw(myContext);
        myTurbine03.draw(myContext);

        //reset the force
        myTurbine01.resetForce();
        myTurbine02.resetForce();
        myTurbine03.resetForce();

        requestAnimFrame(loop);
    }

})();