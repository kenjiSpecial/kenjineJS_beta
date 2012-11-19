/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/18/12
 * Time: 9:30 PM
 * To change this template use File | Settings | File Templates.
 */
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



    var circles = [];
    var circleNum = 12;

    var gravity = new Vector(0, 50);

    myCanvas.onclick = function(){
//        alert("click");
        for(var i = 0; i < circles.length; i++){
            console.log(i);
            console.log("velocity: "+circles[i].velocity.x + ", " + circles[i].velocity.y);
            console.log("position: "+circles[i].position.x + ", " + circles[i].position.y);
        }

        console.log("");
    };

    init();

    function init() {

//        initializing the timer

        countDown();

//        starting the loop
        loop();
    }

    function countDown(){

        circleNum--;

        var Circle_case01 = new Circle();
        Circle_case01.size = 60 + (10 * Math.random())|0;
        Circle_case01.mass = 60 + (10 * Math.random())|0;
        var randomTheta = Math.PI * ( 0.4 + .2 * Math.random());
        Circle_case01.velocity = new Vector(100 * Math.cos(randomTheta), 100 * Math.sin(randomTheta));
        Circle_case01.position = new Vector(wd/2, hg * 0.2);
        Circle_case01.init();
        Circle_case01.initTime();

        circles.push(Circle_case01);

        if(circleNum > 0) {
            setTimeout(countDown, 600);
        }
    }

    function loop() {
//        clear the canvas
        contextClear.update_fill(myContext);

//        calculation of the force

        for(var i = 0; i < circles.length; i++){
            circles[i].setGravity(gravity);
            circles[i].update();
        }


        for(i = 0; i < circles.length; i++){
            for(var j = i+1; j < circles.length; j++){
                circles[i].collision_detect(circles[j]);
            }
        }

//        checking the bouncing of both walls and floor
        for(i = 0; i < circles.length; i++){
            myWall01.checkBounce( circles[i], circles[i].size);
            myWall02.checkBounce( circles[i], circles[i].size);
            myFloor.checkBounce( circles[i], circles[i].size);
        }


//        ----------
//        drawing;
        for(i = 0; i < circles.length; i++){
            circles[i].draw(myContext);
        }


        requestAnimFrame(loop);
    }

})();