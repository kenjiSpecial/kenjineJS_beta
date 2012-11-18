/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/18/12
 * Time: 5:10 PM
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

    //default;

    var myWall01 = new Wall();
    myWall01.beginVector = new Vector(0, 0);
    myWall01.endVector = new Vector(0, hg);
    myWall01.cal_normalize();
    myWall01.bouncing = -1;

    var myWall02 = new Wall();
    myWall02.beginVector = new Vector(wd, 0);
    myWall02.endVector = new Vector(wd, hg);
    myWall02.cal_normalize();
    myWall02.bouncing = -1;

    var myFloor = new Wall();
    myFloor.beginVector = new Vector(0, hg);
    myFloor.endVector = new Vector(wd, hg);
    myFloor.cal_normalize();
    myFloor.bouncing = -0.6;

    var Circle_case01 = new Circle();
    Circle_case01.size = 10;
    Circle_case01.mass = 10;
    var randomTheta = Math.PI * (1.25 + .5 * Math.random());
    Circle_case01.velocity = new Vector(100 * Math.cos(randomTheta), 100 * Math.sin(randomTheta));
    Circle_case01.position = new Vector(wd * 0.2, hg * 0.2);
    Circle_case01.init();

    var Circle_case02 = new Circle();
    Circle_case02.size = 16;
    Circle_case02.mass = 16;
    randomTheta = Math.PI * (1.25 + .5 * Math.random());
    Circle_case02.velocity = new Vector(120 * Math.cos(randomTheta), 120 * Math.sin(randomTheta));
    Circle_case02.position = new Vector( wd * 0.8, hg * 0.2);
    Circle_case02.init();

    var Circle_case03 = new Circle();
    Circle_case03.size = 24;
    Circle_case03.mass = 24;
    randomTheta = Math.PI * (1.25 + .5 * Math.random());
    Circle_case03.velocity = new Vector(90 * Math.cos(randomTheta), 90 * Math.sin(randomTheta));
    Circle_case03.position = new Vector(wd *0.5, hg * 0.2);
    Circle_case03.init();

    var gravity = new Vector(0, 50);

    init();

    function init() {

//        initializing the timer
        Circle_case01.initTime();
        Circle_case02.initTime();
        Circle_case03.initTime();

//        starting the loop
        loop();
    }

    function loop() {
//        clear the canvas
        contextClear.update_fill(myContext);

//        calculation of the force
        Circle_case01.setGravity(gravity);
        Circle_case02.setGravity(gravity);
        Circle_case03.setGravity(gravity);

        Circle_case01.update();
        Circle_case02.update();
        Circle_case03.update();

        Circle_case01.collision_detect(Circle_case02);
        Circle_case01.collision_detect(Circle_case03);
        Circle_case02.collision_detect(Circle_case03);

//        checking the bouncing of both walls and floor
        myWall01.checkBounce(Circle_case01, Circle_case01.size);
        myWall02.checkBounce(Circle_case01, Circle_case01.size);
        myFloor.checkBounce(Circle_case01, Circle_case01.size);

        myWall01.checkBounce(Circle_case02, Circle_case02.size);
        myWall02.checkBounce(Circle_case02, Circle_case02.size);
        myFloor.checkBounce(Circle_case02, Circle_case02.size);

        myWall01.checkBounce(Circle_case03, Circle_case03.size);
        myWall02.checkBounce(Circle_case03, Circle_case03.size);
        myFloor.checkBounce(Circle_case03, Circle_case03.size);

//        ----------
//        drawing
        myFloor.draw(myContext);
        Circle_case01.draw(myContext);
        Circle_case02.draw(myContext);
        Circle_case03.draw(myContext);

        requestAnimFrame(loop);
    }

})();