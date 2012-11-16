/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 12.11.12
 * Time: 12:39
 * To change this template use File | Settings | File Templates.
 */

 function centripetalForce(centerVector, movementParticle, velocityValue){
    var Cs = 1;
    var _g = 100;

    var distanceVector = movementParticle.position.subtractVector(centerVector);

    var centripetalForce = distanceVector.normalize().multipleVector( -movementParticle.mass * velocityValue * velocityValue / distanceVector.getMagnitude());
    var radialFriction = distanceVector.normalize().multipleVector( -Cs * movementParticle.mass * _g);


    if( radialFriction.getMagnitude() > centripetalForce.getMagnitude() ){
        movementParticle.force = centripetalForce;
    }else{
        movementParticle.force = radialFriction;
    }

}