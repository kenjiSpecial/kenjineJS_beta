/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 20.11.12
 * Time: 18:13
 * To change this template use File | Settings | File Templates.
 */


var TurbineRB = function( position, length){
    this.vertices = [];
    this.fillColor = undefined;
    this.strokeColor = undefined;

    this.posVector = position;
    this.length = length;

    this.calculatedVertices = [];
};

TurbineRB.prototype = new RigidBody();

TurbineRB.prototype.draw = function(myContext){
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

TurbineRB.prototype.initPolygon = function(){
    if(this.mass == undefined){
        throw "Polygon's mass is undefined";
    }

    if(this.posVector === undefined){
        throw "Polygon's posVector is undefined"
    }

    var num;
    var vector;

    for(var i = 0; i < 6; i++){
        var theta = i/3 * Math.PI;

        if(i%2 == 0){
            vector  = new Vector(this.length * 0.1 * Math.cos(theta), this.length * 0.1 * Math.sin(theta));
        }else{
            vector = new Vector(this.length * Math.cos(theta), this.length * Math.sin(theta));
        }

        this.vertices.push(vector);
    }

    for( i = 0; i < 6; i++){
        this.calculatedVertices.push(this.posVector.addVector(this.vertices[i]));
    }
};

TurbineRB.prototype.resetForce = function(){
    this.torque = 0;
    this.force = new Vector(0, 0);
};

TurbineRB.prototype.updateAngularVelocity = function(){
    this.angVelocity += this.torque / this.momentInteria;
};

TurbineRB.prototype.update = function(){
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