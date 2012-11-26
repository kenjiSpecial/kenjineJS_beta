/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 23.11.12
 * Time: 16:53
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var circleForTest = function(){
        this.vector = undefined;
    };

    circleForTest.prototype.draw = function(context){

        context.beginPath();
        context.fillStyle = "#ff0000";
        context.arc( this.vector.x, this.vector.y, 4, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    };

    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");

    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context(wd, hg);

    var recPosition = new Vector( wd/10, hg/2);
    var myRectangleRB01 = new RectangleRB( recPosition, 100, 100);
    myRectangleRB01.mass = 100;
    myRectangleRB01.momentInteria = momentOfInteria(100, 100);
    myRectangleRB01.velocity = new Vector(50, 0);
//    myRectangleRB01.velocity = new Vector(0, 0);
    myRectangleRB01.init();
    myRectangleRB01.fillColor = "#000";
    myRectangleRB01.rotation = Math.PI/6;
    myRectangleRB01.update();

    recPosition = new Vector( wd/10 * 6, hg/2);
    var myRectangleRB02 = new RectangleRB( recPosition, 100, 100);
    myRectangleRB02.mass = 100;
    myRectangleRB02.momentInteria = momentOfInteria( 100, 100);
    myRectangleRB02.velocity = new Vector( -40, 0);
//    myRectangleRB02.velocity = new Vector( 0, 0);
    myRectangleRB02.init();
    myRectangleRB02.fillColor = "#000";
    myRectangleRB02.rotation = Math.PI/4;
    myRectangleRB02.update();

//    ------------------------

    myRectangleRB01.draw(myContext);
    myRectangleRB02.draw(myContext);

    var myCircleTest = new circleForTest();
    myCircleTest.vector =  myRectangleRB01.calculatedVertices[3];
    myCircleTest.draw(myContext);

    myCircleTest.vector =  myRectangleRB02.calculatedVertices[0];
    myCircleTest.draw(myContext);



//    RectangleBetweenForce(myRectangleRB01, myRectangleRB02, myContext);

    $("canvas").click(function(){
//        alert("click");
        contextClear.update_fill(myContext);

        myRectangleRB01.update();
        myRectangleRB02.update();

        myRectangleRB01.draw(myContext);
        myRectangleRB02.draw(myContext);
    });


    loop();

    function loop(){
        contextClear.update_fill(myContext);

        myRectangleRB01.update();
        myRectangleRB02.update();

        RectangleBetweenForce(myRectangleRB01, myRectangleRB02);
        RectangleBetweenForce(myRectangleRB02, myRectangleRB01);

        myRectangleRB01.draw(myContext);
        myRectangleRB02.draw(myContext);

//        calculatedVerticeCheck
        myCircleTest.vector =  myRectangleRB02.calculatedVertices[3];
        myCircleTest.draw(myContext);

        myCircleTest.vector =  myRectangleRB01.calculatedVertices[3];
        myCircleTest.draw(myContext);



        //repeat loop() function
        requestAnimFrame(loop);
    }

    function momentOfInteria(pmass, wid){
        return pmass * wid * wid / 6;
    }

})();