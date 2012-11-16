/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/9/12
 * Time: 6:43 PM
 * To change this template use File | Settings | File Templates.
 */

var Spring = function(){
    this.baseLength = 0;
    this.startVector = new Vector(0, 0);
    this.endVector = new Vector(0, 0);
    this.color = "rgb(100, 100, 100)";
    this.k = 3;
};

Spring.prototype.draw = function( _context, _circle_size){
//    var maxLength = 600;

    var edgeVector = this.endVector.edge( this.startVector);
    var smallEdgeVector = edgeVector.multipleVector(1/24);
    var normalEdgeNormalizedVector = smallEdgeVector.normal();

    var springValue = 1 - edgeVector.getMagnitude()/500;

    if(springValue > 1) springValue = 1;
    if(springValue < 0) springValue = 0;

    var SpringHeight = _circle_size * 0.8 * Math.pow( springValue, 2);

    var springPlusVector = smallEdgeVector.addVector(normalEdgeNormalizedVector.multipleVector(SpringHeight));
    var springMinusVector = smallEdgeVector.addVector(normalEdgeNormalizedVector.multipleVector(-SpringHeight));


    var tempVector = this.startVector.copy();

    _context.strokeStyle = this.color;
    _context.beginPath();
    _context.moveTo(tempVector.x, tempVector.y);
    for(var i = 0; i < 24; i++){
//        console.log(tempVector);
        if(i%4 == 0 || i%4 == 3){
            tempVector = tempVector.addVector(springPlusVector);
            _context.lineTo(tempVector.x, tempVector.y);
        }else{
            tempVector = tempVector.addVector(springMinusVector);
            _context.lineTo(tempVector.x, tempVector.y);
        }
    }
    _context.stroke();
    _context.closePath();

};

Spring.prototype.calculation_spring_force = function(particle){

    var ForceVector = particle.position.edge(this.startVector);
    var judgeMagnitude = ForceVector.getMagnitude();

    if(judgeMagnitude > this.baseLength){
        var ForceVectorMagnitude = - this.k * (judgeMagnitude - this.baseLength);
        ForceVector = ForceVector.normalize().multiple(ForceVectorMagnitude);
        particle.force.add(ForceVector.x, ForceVector.y);
    }
};

Spring.prototype.setParticlePosition = function(particle){
    this.endVector = particle.position.copy();
};

Spring.prototype.setParticlePositions = function( startParticle, endParticle){
    this.startVector  = startParticle.position.copy();
    this.endVector = endParticle.position.copy();
};