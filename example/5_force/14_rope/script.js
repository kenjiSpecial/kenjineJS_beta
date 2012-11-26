/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 11/26/12
 * Time: 8:03 PM
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


    var myRope = new Rope(wd * 0.05, hg * 0.2, wd * 0.9, 20);
    myRope.init();

    myRope.draw(myContext);

    loop();

    function loop(){


        requestAnimFrame(loop);
    }

})();