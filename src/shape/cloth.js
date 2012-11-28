/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 27.11.12
 * Time: 12:13
 * To change this template use File | Settings | File Templates.
 */


var Cloth = function( x, y, wd, hg, num_wd, num_hg){
    this.x = x;
    this.y = y;

    this.wd = wd;
    this.hg = hg;

    this.num_wd = num_wd;
    this.num_hg = num_hg;

    this.num = num_wd * num_hg;

};


Cloth.prototype.init = function(){
    if(this.endY == undefined){
        this.endY = this.y;
    }

    var wd = this.wd/ (this.num_wd - 1);
    var hg = this.hg / (this.num_hg - 1);

    this.particles = [];

    for(var i = 0; i < this.num_wd; i++){
        for(var j = 0; j < this.num_hg; j++){
            var x = this.x + wd * i;
            var y = this.y + hg * j;

            var particle = new Particle();
            particle.position = new Vector(x, y);
            particle.init();

            this.particles[i + j * this.num_wd] = particle;
        }
    }

};

Cloth.prototype.initTime = function(){

    for(var i = 0; i < this.num; i++){
        this.particles[i].initTime();
    }

};


Cloth.prototype.update = function(){
    for(var i = 0; i < this.num; i++){
        this.particles[i].update();
    }
};

Cloth.prototype.setGravity = function(g){
    for(var i = 1; i < this.num ; i++){
        if(i !== this.num_wd - 1 && i !== this.num_wd/2){
            this.particles[i].setGravity(g);
        }
    }
};

Cloth.prototype.calcForce = function(){

    var kDamping = 4;
    var springLength = 10;
    var kSpring = 180;

    var upPositionVector;
    var leftPositionVector;
    var rightPositionVector;
    var downPositionVector;

    var upVelocityVector;
    var leftVelocityVector;
    var rightVelocityVector;
    var downVelocityVector;


    for(var j = 0; j < this.num_hg; j++){
        for(var i = 0; i < this.num_wd; i++){
            var num = i + j*this.num_wd;

            if(num !== 0 && num !== this.num_wd - 1 && num !== (this.num_wd/2)){
                if(j == 0){
                    upPositionVector = this.particles[num].position;
                    upVelocityVector = this.particles[num].velocity;
                }else{
                    upPositionVector = this.particles[num - this.num_wd].position;
                    upVelocityVector = this.particles[num - this.num_wd].velocity;
                }

                if(j == this.num_hg - 1){
                    downPositionVector = this.particles[num].position;
                    downVelocityVector = this.particles[num].velocity;
                }else{
                    downPositionVector = this.particles[num + this.num_wd].position;
                    downVelocityVector = this.particles[num + this.num_wd].velocity;
                }

                if(i == 0){
                    leftPositionVector = this.particles[num].position;
                    leftVelocityVector = this.particles[num].velocity;
                }else{
                    leftPositionVector = this.particles[num - 1].position;
                    leftVelocityVector = this.particles[num - 1].velocity;
                }

                if(i == this.num_wd - 1){
                    rightPositionVector = this.particles[num].position;
                    rightVelocityVector = this.particles[num].velocity;
                }else{
                    rightPositionVector = this.particles[num + 1].position;
                    rightVelocityVector = this.particles[num + 1].velocity;
                }

                var velocityVector = this.particles[num].velocity.multipleVector(4).subtractVector(upVelocityVector).subtractVector(downVelocityVector).subtractVector(leftVelocityVector).subtractVector(rightVelocityVector);
                var dampingForce =  velocityVector.multipleVector(-1 * kDamping);

                var dispUpVector = this.particles[num].position.subtractVector(upPositionVector);
                var dispDownVector = this.particles[num].position.subtractVector(downPositionVector);
                var dispLeftVector = this.particles[num].position.subtractVector(leftPositionVector);
                var dispRightVector = this.particles[num].position.subtractVector(rightPositionVector);

                var extensionUpVector = dispUpVector.subtractVector(dispUpVector.normalize().multipleVector(springLength));
                var extensionDownVector = dispDownVector.subtractVector(dispDownVector.normalize().multipleVector(springLength));
                var extensionLeftVector = dispLeftVector.subtractVector(dispLeftVector.normalize().multipleVector(springLength));
                var extensionRightVector = dispRightVector.subtractVector(dispRightVector.normalize().multipleVector(springLength));

                var restoringUp = extensionUpVector.multipleVector(-1 * kSpring);
                var restoringDown = extensionDownVector.multipleVector(-1 * kSpring);
                var restoringLeft = extensionLeftVector.multipleVector(-1 * kSpring);
                var restoringRight = extensionRightVector.multipleVector(-1 * kSpring);


                this.particles[num].force = this.particles[num].force.addVector(dampingForce).addVector(restoringUp).addVector(restoringDown).addVector(restoringLeft).addVector(restoringRight);

            }

        }

    }


};



Cloth.prototype.draw = function(myContext){


    for(var j = 0; j < this.num_hg; j++){
        for(var i  = 0; i < this.num_wd - 1; i++){
            myContext.beginPath();
            myContext.strokeStyle = "#999999";

            myContext.moveTo( this.particles[i + j * this.num_wd].position.x, this.particles[i + j * this.num_wd].position.y);
            myContext.lineTo( this.particles[i + 1 + j * this.num_wd].position.x, this.particles[i + 1 + j * this.num_wd] .position.y);
            myContext.stroke();
            myContext.closePath();
        }
    }

    for( i = 0; i < this.num_wd; i++){
        for( j  = 0; j < this.num_hg - 1; j++){
            myContext.beginPath();
            myContext.strokeStyle = "#999999";

            myContext.moveTo( this.particles[i + j * this.num_wd].position.x, this.particles[i + j * this.num_wd].position.y);
            myContext.lineTo( this.particles[i + (1 + j) * this.num_wd].position.x, this.particles[i + (1 + j) * this.num_wd] .position.y);
            myContext.stroke();
            myContext.closePath();
        }
    }

    for( i = 0; i < this.num; i++){
        myContext.beginPath();
        myContext.fillStyle = "#000000";
        myContext.arc(this.particles[i].position.x, this.particles[i].position.y, 3, 0, 2 * Math.PI, true);
        myContext.fill();
        myContext.closePath();
    }

};
