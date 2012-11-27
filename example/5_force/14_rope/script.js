/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 11/26/12
 * Time: 8:03 PM
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


    var myRope = new Rope(wd * 0.05, hg * 0.2, wd * 0.9, 20);
    myRope.init();

//    myRope.draw(myContext);
    var contextClear = new Canvas_Context(wd, hg);

    var gravity = new Vector(0, 10);

    setInterval(function () {

        var randomNum = ((myRope.num - 2) * Math.random() + 1) | 0;

        myRope.particles[randomNum].force = myRope.particles[randomNum].force.addVector(new Vector(0, -100000));
        myRope.update();

    }, 2000);

    loop();

    function loop() {
        contextClear.update_fill(myContext);

//        ----------

        myRope.setGravity(gravity);
        myRope.calcForce();

        myRope.update();

        myRope.draw(myContext);


        requestAnimFrame(loop);
    }

})();