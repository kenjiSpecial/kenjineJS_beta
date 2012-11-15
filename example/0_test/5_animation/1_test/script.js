/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 15.11.12
 * Time: 18:40
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var Ball = function(){
        this.color = "#999999";
        this.size = 12;
    };

    Ball.prototype.draw = function(ballPosition, myContext){
        myContext.beginPath();
        myContext.fillStyle = this.color;
        myContext.arc(ballPosition.x, ballPosition.y, this.size, 0, 2 * Math.PI, false);
        myContext.fill();
        myContext.closePath();
    };

    var AnimationBall = function(){
        this.color = "#ff0000";
        this.size = 5;

        this.lastTime = new Date().getTime();

        this.totalTime = .6;
        this.currentTime = 0;

        this.animationDone = false;
    };

    AnimationBall.prototype.startAnimation = function(){
        this.lastTime = new Date().getTime();
        this.currentTime = 0;

        this.animationDone = false;
    };

    AnimationBall.prototype.update = function(){
        if(this.animationDone == false){
            var dt = (new Date().getTime() - this.lastTime)/1000;
            this.currentTime += dt;

            this.lastTime = new Date().getTime();

            if(this.currentTime > this.totalTime){
                this.animationDone = true;
            }
        }

    };

    AnimationBall.prototype.draw = function( PositionVector, context){
        context.beginPath();
        context.fillStyle = this.color;
        var rate = this.currentTime / this.totalTime;
        var r = this.size * rate;
        context.arc( PositionVector.x, PositionVector.y, r, 0, Math.PI *rate*rate* 2, false);
        context.fill();
        context.closePath();
    };


//    ----------------
//    ----------------

    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context( wd, hg);

    var positionVector = new Vector(wd/2 * Math.random(), hg/2 * Math.random());
    var myAnimationBall = new AnimationBall();

    var particle01 = new Particle();
    particle01.position = positionVector.copy();
    particle01.init();

    console.log(particle01.velocity);


    loop01();

    function loop01(){
//        clear the canvas
        contextClear.update_fill(myContext);

        myAnimationBall.update();
        myAnimationBall.draw(positionVector, myContext);

        if(myAnimationBall.animationDone == false){
            requestAnimFrame(loop01);
        }else{
            set02();
        }
    }

    function set02(){
//        console.log("function02");

        loop02();
    }

    function loop02(){
//        console.log("loop02");

        requestAnimFrame(loop02);
    }

})();