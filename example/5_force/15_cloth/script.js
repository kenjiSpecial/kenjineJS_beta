/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 27.11.12
 * Time: 12:07
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


    var myCloth = new Cloth(0, hg * 0.1, wd , hg * 1.2, 30, 20);
    myCloth.init();

    myCloth.draw(myContext);

    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector( 0, 30);

    loop();

    function loop(){
        contextClear.update_fill(myContext);

//        ---------------

        myCloth.setGravity(gravity);
        myCloth.calcForce();

        myCloth.update();

        myCloth.draw(myContext);

        requestAnimFrame(loop);
    }

})();