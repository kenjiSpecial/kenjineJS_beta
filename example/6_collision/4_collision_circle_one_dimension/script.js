/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 16.11.12
 * Time: 16:33
 * To change this template use File | Settings | File Templates.
 */

(function () {

// default begin

    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

//    default end

    var contextClear = new Canvas_Context(wd, hg);

    var myWall = new Wall();
    myWall.beginVector = new Vector(0, 0);
    myWall.endVector = new Vector(0, hg);
    myWall.cal_normalize();
    myWall.bouncing = -1;

    var myWall02 = new Wall();
    myWall02.beginVector = new Vector(wd, 0);
    myWall02.endVector = new Vector(wd, hg);
    myWall02.cal_normalize();
    myWall02.bouncing = -1;

    var myFloor = new Wall();
    myFloor.beginVector = new Vector(0, hg * 0.8);
    myFloor.endVector = new Vector(wd, hg * 0.8);


    var Circle_case01 = new Circle();
    Circle_case01.size = 20;
    Circle_case01.mass = 20;
    Circle_case01.velocity = new Vector(100, 0);
    Circle_case01.position = new Vector(wd * 0.2, hg * 0.8 - Circle_case01.size);
    Circle_case01.init();

    var Circle_case02 = new Circle();
    Circle_case02.size = 30;
    Circle_case02.mass = 30;
    Circle_case02.velocity = new Vector(-120, 0);
    Circle_case02.position = new Vector( wd * 0.8, hg * 0.8 - Circle_case02.size);
    Circle_case02.init();

    var Circle_case03 = new Circle();
    Circle_case03.size = 50;
    Circle_case03.mass = 50;

    Circle_case03.velocity = new Vector(0, 0);
    Circle_case03.position = new Vector(wd * .5, hg * 0.8 - Circle_case03.size);
    Circle_case03.init();


    init();

    function init() {

//        initializing the timer
        Circle_case01.initTime();
        Circle_case02.initTime();

//        starting the loop
        loop();
    }

    function loop() {
//        clear the canvas
        contextClear.update_fill(myContext);

//        calculation of the force
        Circle_case01.update();
        Circle_case02.update();
        Circle_case03.update();

        Circle_case01.collision_detect_one(Circle_case02);
        Circle_case01.collision_detect_one(Circle_case03);
        Circle_case02.collision_detect_one(Circle_case03);

        myWall.checkBounce(Circle_case01, Circle_case01.size);
//        myWall02.checkBounce(Circle_case03, Circle_case03.size);

        myWall02.checkBounce(Circle_case02, Circle_case02.size);


//        drawing
        myFloor.draw(myContext);
        Circle_case01.draw(myContext);
        Circle_case02.draw(myContext);
        Circle_case03.draw(myContext);

        requestAnimFrame(loop);
    }

})();