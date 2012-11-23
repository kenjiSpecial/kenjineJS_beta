/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 20.11.12
 * Time: 11:28
 * To change this template use File | Settings | File Templates.
 */

var RectangleRB = function( position, wd, hg){
    this.vertices = [];
    this.fillColor = undefined;
    this.strokeColor = undefined;

    this.posVector = position;
    this.wd = wd;
    this.hg = hg;

    this.calculatedVertices = [];
};

RectangleRB.prototype = new RigidBody();

RectangleRB.prototype.draw = function(myContext){
    myContext.beginPath();
    myContext.moveTo(this.calculatedVertices[0].x, this.calculatedVertices[0].y);
    for(var i = 1; i < this.calculatedVertices.length; i++){
        myContext.lineTo( this.calculatedVertices[i].x, this.calculatedVertices[i].y);
    }
    myContext.lineTo( this.calculatedVertices[0].x, this.calculatedVertices[0].y);

    if(this.fillColor !== undefined){
        myContext.fillStyle = this.fillColor;
        myContext.fill();
    }

    if(this.strokeColor !== undefined){
        myContext.strokeStyle = this.strokeColor;
        myContext.stroke();
    }

    myContext.closePath();
};

RectangleRB.prototype.init = function(){
    RigidBody.prototype.init.call(this);

    if(this.mass == undefined){
        throw "Polygon's mass is undefined";
    }

    if(this.posVector === undefined){
        throw "Polygon's posVector is undefined"
    }


    for(var i = 0; i < 4; i++){
        if(i == 0){
            this.vertices[i] = new Vector( this.wd/2, this.hg/2);
        }else if(i == 1){
            this.vertices[i] = new Vector( -this.wd/2, this.hg/2);
        }else if(i == 2){
            this.vertices[i] = new Vector( -this.wd/2, -this.hg/2);
        }else if(i == 3){
            this.vertices[i] = new Vector( this.wd/2, -this.hg/2);
        }
    }

    for( i = 0; i < 4; i++){
        this.calculatedVertices.push(this.posVector.addVector(this.vertices[i]));
    }
};

RectangleRB.prototype.resetForce = function(){
    this.torque = 0;
    this.force = new Vector(0, 0);
};

RectangleRB.prototype.updateAngularVelocity = function(){
    this.angVelocity += this.torque / this.momentInteria;
};

RectangleRB.prototype.maxVertex = function(){
    var maxLength = 0;

    for(var i = 0; i < this.calculatedVertices.length; i++){
        var tempVector = this.calculatedVertices[i].subtractVector(this.posVector);
        var tempLength = tempVector.getMagnitude();

        if(tempLength > maxLength){
            maxLength = tempLength;
        }
    }

    return maxLength;
};

RectangleRB.prototype.update = function(){
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



    for(var i = 0; i < this.vertices.length; i++){
        this.calculatedVertices[i] = matrix.apply_Vector(this.vertices[i]);
        this.calculatedVertices[i] = this.calculatedVertices[i].addVector(this.posVector);
    }

    this.lastTime = new Date().getTime();
};

