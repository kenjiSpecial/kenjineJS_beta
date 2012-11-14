/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 13.11.12
 * Time: 18:43
 * To change this template use File | Settings | File Templates.
 */

var Pendulum = function(){
    this.color = "#e0e000";
    this.centerPos = undefined;


    this.gravity = 50;
};

Pendulum.prototype.draw = function( particle, context){
//    var pendulumEndPosition = this.centerPos.addVector(this.particle.position);

    context.beginPath();
    context.strokeStyle = "#000000";
    context.moveTo(this.centerPos.x, this.centerPos.y);
    context.lineTo( particle.position.x, particle.position.y);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.fillStyle = this.color;
    context.arc( particle.position.x, particle.position.y, 10, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

};

Pendulum.prototype.calculateForce = function(particle){

    var verticalVector = new Vector( 0, 1);
    var edgeVector = particle.position.edge(this.centerPos);

    var dotProduct = verticalVector.dotProduct(edgeVector);

    var length = edgeVector.getMagnitude();
//    console.log(length);
    console.log("length: " + length + "dotProduct: " + dotProduct);

    var velocity = particle.velocity.getMagnitude();
    var forceValue = particle.mass * velocity * velocity / length;

    var ForceVector = edgeVector.multipleVector(-1/length * (forceValue + particle.mass * this.gravity *  dotProduct/length));

    particle.force = particle.force.addVector(ForceVector);
//    console.log(this.particle.force.getMagnitude());

};