/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 21.11.12
 * Time: 14:24
 * To change this template use File | Settings | File Templates.
 */

(function () {
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
    var firstPos = new Vector(hg / 4, hg / 4);
    var myCircle = new CircleRB(firstPos, 80);
    myCircle.velocity = new Vector(100 * Math.cos(Math.PI / 3), 100 * Math.sin(Math.PI / 3))
    myCircle.initCircle();

    var gravity = new Vector(0, 40);

    var myWall = new Wall();
    myWall.beginVector = new Vector(0, hg);
    myWall.endVector = new Vector(wd, hg);
    myWall.bouncing = -0.2;
    myWall.cal_normalize();

    init();

    function init() {
        myCircle.init();

        loop();
    }

    function loop() {
        contextClear.update_fill(myContext);

        //calculation the force
        myCircle.setGravity(gravity);
        if(myWall.bouncing  == false){
            myWall.createForce(myCircle);
        }


        myCircle.update();
        if (myWall.bouncing) {
            myWall.checkCircleRBBounce(myCircle);
        }
        myCircle.draw(myContext);

        myCircle.resetForce();

        requestAnimFrame(loop);
    }

})();