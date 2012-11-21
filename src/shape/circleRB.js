/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 21.11.12
 * Time: 11:43
 * To change this template use File | Settings | File Templates.
 */

var CircleRB = function( position, rad){
    this.fillColor = "#000000";
    this.strokeColor = '#ffffff';

    this.mass = undefined;

    this.posVector = position;
    this.rad = rad;

    this.angVelocity = 0;
    this.rotation = 0;

    this.crossPoints = [];
    this.calculatedCrossPoints = [];

};

CircleRB.prototype = new RigidBody();

CircleRB.prototype.draw = function(myContext){
//    drawing the circle
    myContext.beginPath();
    myContext.fillStyle = this.fillColor;
    myContext.arc(this.posVector.x, this.posVector.y, this.rad, 0, 2 *Math.PI, false);
    myContext.fill();
    myContext.closePath();

    myContext.strokeStyle = this.strokeColor;
    for(var i = 0; i < this.calculatedCrossPoints.length; i = i+2){
        myContext.beginPath();
        myContext.moveTo( this.calculatedCrossPoints[i].x, this.calculatedCrossPoints[i].y);
        myContext.lineTo( this.calculatedCrossPoints[i + 1].x, this.calculatedCrossPoints[i + 1].y);
        myContext.stroke();
        myContext.closePath();
    }
};

CircleRB.prototype.initCircle = function(){
    if(this.mass === undefined){
        this.mass = 1;
        console.log("this.mass is undefined.");
    }

    if(this.posVector === undefined){
        this.posVector = new Vector( 0, 0);
        console.log("this.posVector is undefined.")
    }

    for(var i = 0; i < 8; i++){
        if(i == 0){
            this.crossPoints[i] = new Vector( this.rad * 0.8 + 4, 0);
        }else if(i == 1){
            this.crossPoints[i] = new Vector( this.rad * 0.8 - 4, 0);
        }else if(i == 2){
            this.crossPoints[i] = new Vector( this.rad * 0.8 , 4);
        }else if(i == 3){
            this.crossPoints[i] = new Vector( this.rad * 0.8 , -4);
        }else if(i == 4){
            this.crossPoints[i] = new Vector( -this.rad * 0.8 + 3, 0);
        }else if(i == 5){
            this.crossPoints[i] = new Vector( -this.rad * 0.8 - 3, 0);
        }else if(i == 6){
            this.crossPoints[i] = new Vector( -this.rad * 0.8 , 3);
        }else{
            this.crossPoints[i] = new Vector( -this.rad * 0.8 , -3);
        }
    }

    for( i = 0; i < this.crossPoints.length; i++){
        this.calculatedCrossPoints[i] = this.crossPoints[i].addVector(this.posVector);
    }
}

CircleRB.prototype.resetForce = function(){
    this.torque = 0;
    this.force = new Vector(0, 0);
};

CircleRB.prototype.updateAngularVelocity = function(){
    this.angVelocity += this.torque / this.momentInteria;
};

CircleRB.prototype.update = function(){
    if(this.mass === undefined){
        throw "particle's mass undefined."
    }

    if(this.force === undefined){
        throw  "particle's force undefined."
    }

    var dt = (new Date().getTime() - this.lastTime)/1000;
    this.sum_time += dt;

    //setting the acceleration
    this.acceleration = this.force.multiple(1/this.mass);

    //TODO if this is heavy, you sholud change the addScaledVector
    //setting the velocity
    this.velocity = this.velocity.addScaledVector( this.acceleration, dt);
//    this.velocity = this.velocity.multipleVector(Math.pow(this.damping, dt));

    //setting the position
    this.posVector = this.posVector.addScaledVector( this.velocity, dt);
    this.rotation += dt * this.angVelocity;

//        calculation of the vertex each position;
    var matrix = new Matrix();
    matrix.rotate(this.rotation);


    for(var i = 0; i < this.crossPoints.length; i++){
        this.calculatedCrossPoints[i] = matrix.apply_Vector(this.crossPoints[i]);
        this.calculatedCrossPoints[i] = this.calculatedCrossPoints[i].addVector(this.posVector);
    }

    this.lastTime = new Date().getTime();
};