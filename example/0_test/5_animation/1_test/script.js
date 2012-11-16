/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 15.11.12
 * Time: 18:40
 * To change this template use File | Settings | File Templates.
 */

(function(){
    var Ball = function(){
        this.color = "#000";
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
        this.color = "#000";
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

    var Line = function(){
        this.beginVector = undefined;
        this.endVector = undefined;

        this.finishTime = 1;
        this.currentTime = 0;

        this.color = "#000";

        this.bouncing = -0.3;

        this.lineAnimation = false;
    };

    Line.prototype = new Wall();

    Line.prototype.init = function(){
        if(this.beginVector === undefined){
            throw 'this.beginVector is undefined'
        }

        if(this.endVector === undefined){
            throw 'this.endVector is undefined'
        }

        this.edgeVector = this.endVector.edge(this.beginVector);

        this.currentTime = 0;
        this.lastTime = new Date().getTime();
    };

    Line.prototype.update = function(){
        this.currentTime = (new Date().getTime() - this.lastTime)/1000;
        var rate = this.currentTime / this.finishTime;

        if(rate < 1){
            this.tempVector = this.beginVector.addScaledVector(this.edgeVector, rate * rate);
        }else{
            this.lineAnimation = true;
        }

    };

    Line.prototype.draw = function(context){

        context.beginPath();
        context.strokeStyle = this.color;
        context.moveTo( this.beginVector.x, this.beginVector.y);

        if(this.lineAnimation == true){
            context.lineTo( this.endVector.x, this.endVector.y);
        }else{
            context.lineTo( this.tempVector.x, this.tempVector.y);
        }
        context.stroke();
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

    var positionVector = new Vector(wd/4 * Math.random(), hg/2 * (0.5 + 0.5 * Math.random()));
    var positionVector02 = new Vector(wd *(3/4 + Math.random()/4), hg/2 * (0.5 + 0.5 * Math.random()));
    var positionVector03 = new Vector(wd *Math.random()/4, hg * (0.5 + 0.5 * Math.random()));
    var positionVector04 = new Vector(wd *(3/4 + Math.random()/4), hg * (0.5 + 0.5 * Math.random()));

    var myAnimationBall = new AnimationBall();

    var particle01 = new Particle();
    particle01.position = positionVector.copy();
    var randomTheta = (300 + 90 * Math.random())/180 * Math.PI;
    particle01.velocity = new Vector( 100 * Math.cos(randomTheta), 100 * Math.sin(randomTheta));
    particle01.init();

    var particle02 = new Particle();
    particle02.position = positionVector02.copy();
    var randomTheta02 = (160 + 90 * Math.random())/180 * Math.PI;
    particle02.velocity = new Vector( 100 * Math.cos(randomTheta02), 100 * Math.sin(randomTheta02));
    particle02.init();

    var particle03 = new Particle();
    particle03.position = positionVector03.copy();
    var randomTheta03 = (300 + 40 * Math.random())/180 * Math.PI;
    particle03.velocity = new Vector( 100 * Math.cos(randomTheta03), 100 * Math.sin(randomTheta03));
    particle03.init();

    var particle04 = new Particle();
    particle04.position = positionVector04.copy();
    var randomTheta04 = (180 + 30 * Math.random())/180 * Math.PI;
    particle04.velocity = new Vector( 100 * Math.cos(randomTheta04), 100 * Math.sin(randomTheta04));
    particle04.init();




    var myBall01 = new Ball();
    myBall01.size = 5;

    var gravity = new Vector( 0, 50);

    var line01 = new Line();
    var line02 = new Line();
    var line03 = new Line();
    var line04 = new Line();

    var particles = [];
    var particleNum = 100;

    for(var i = 0; i < particleNum; i++){
        var testParticle = new Particle();
        testParticle.position = new Vector( wd/2, hg * 0.2);
        var randomTestTheta = (225 + 90 * Math.random())/180 * Math.PI;
        testParticle.velocity = new Vector( 100 * Math.cos(randomTestTheta), 100 * Math.sin(randomTestTheta));
        testParticle.init();

        particles.push(testParticle);
    }


    var testBll = new Ball();
    testBll.size = 15;

    loop01();

    function loop01(){
//        clear the canvas
        contextClear.update_fill(myContext);

        myAnimationBall.update();
        myAnimationBall.draw(positionVector, myContext);
        myAnimationBall.draw(positionVector02, myContext);
        myAnimationBall.draw(positionVector03, myContext);
        myAnimationBall.draw(positionVector04, myContext);


        if(myAnimationBall.animationDone == false){
            requestAnimFrame(loop01);
        }else{
            setTimeout(set02, 500);

        }
    }

    function set02(){
//        console.log("function02");
        particle01.initTime();
        particle02.initTime();
        particle03.initTime();
        particle04.initTime();

        setTimeout(changeStatus, 2000);
        loop02();
    }

    function changeStatus(){
//        alert('changeStatus');
        loop02Moving = false;
    }

    var loop02Moving = true;

    function loop02(){

        contextClear.update_fill(myContext);

//        calculation the force of the particle.
        particle01.setGravity(gravity);
        particle02.setGravity(gravity);
        particle03.setGravity(gravity);
        particle04.setGravity(gravity);

        particle01.update();
        particle02.update();
        particle03.update();
        particle04.update();


//        drawing the animation ball and ball.
        myAnimationBall.draw( positionVector, myContext);
        myAnimationBall.draw(positionVector02, myContext);
        myAnimationBall.draw(positionVector03, myContext);
        myAnimationBall.draw(positionVector04, myContext);

        myBall01.draw( particle01.position, myContext);
        myBall01.draw( particle02.position, myContext);
        myBall01.draw( particle03.position, myContext);
        myBall01.draw( particle04.position, myContext);


        if(loop02Moving){
            requestAnimFrame(loop02);
        }else{
            set03();
        }
    }

    function set03(){
        line01.beginVector = positionVector;
        line01.endVector = particle01.position;
        line01.init();

        line02.beginVector = positionVector02;
        line02.endVector = particle02.position;
        line02.init();

        line03.beginVector = positionVector03;
        line03.endVector = particle03.position;
        line03.init();

        line04.beginVector = positionVector04;
        line04.endVector = particle04.position;
        line04.init();

        //-------------------

        loop03();
    }

    function loop03(){

        contextClear.update_fill(myContext);

        line01.update();
        line02.update();
        line03.update();
        line04.update();


        myAnimationBall.draw( positionVector, myContext);
        myAnimationBall.draw(positionVector02, myContext);
        myAnimationBall.draw(positionVector03, myContext);
        myAnimationBall.draw(positionVector04, myContext);

        myBall01.draw( particle01.position, myContext);
        myBall01.draw( particle02.position, myContext);
        myBall01.draw( particle03.position, myContext);
        myBall01.draw( particle04.position, myContext);

        line01.draw(myContext);
        line02.draw(myContext);
        line03.draw(myContext);
        line04.draw(myContext);

        if(line01.lineAnimation){
            set04();
        }else{
            requestAnimFrame(loop03);
        }
    }

    function set04(){
//        testParticle.initTime();
        for(var i = 0; i < particles.length; i++){
            particles[i].initTime();
        }

        line01.cal_normalize();
        line02.cal_normalize();
        line03.cal_normalize();
        line04.cal_normalize();

        loop04();
    }

    function loop04(){

        // clear the background color
        contextClear.update_fill(myContext);

        // update the particle
        for(var i = 0; i< particleNum; i++){
            var temParticle = particles[i];

            temParticle.setGravity(gravity);
            temParticle.update();

            line01.checkBounce( temParticle, testBll.size);
            line02.checkBounce( temParticle, testBll.size);
            line03.checkBounce( temParticle, testBll.size);
            line04.checkBounce( temParticle, testBll.size);

            testBll.draw( temParticle.position, myContext);
        }


        //drawing the shape

        myAnimationBall.draw( positionVector, myContext);
        myAnimationBall.draw(positionVector02, myContext);
        myAnimationBall.draw(positionVector03, myContext);
        myAnimationBall.draw(positionVector04, myContext);

        myBall01.draw( particle01.position, myContext);
        myBall01.draw( particle02.position, myContext);
        myBall01.draw( particle03.position, myContext);
        myBall01.draw( particle04.position, myContext);

        line01.draw(myContext);
        line02.draw(myContext);
        line03.draw(myContext);
        line04.draw(myContext);



        requestAnimFrame(loop04);
    }

})();