/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 14.11.12
 * Time: 17:14
 * To change this template use File | Settings | File Templates.
 */

var orbitForce = function( _centerPosVector, _particle){
    //calculation of the force
    var G = 1.0;
    var CenterM = 1000000;

    var edgeVector = _particle.position.edge(_centerPosVector);
    var edgeVectorValue = edgeVector.getMagnitude();
    _particle.force = edgeVector.multipleVector(- G * CenterM * _particle.mass / (edgeVectorValue * edgeVectorValue * edgeVectorValue));

};