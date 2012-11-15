/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 15.11.12
 * Time: 09:56
 * To change this template use File | Settings | File Templates.
 */


var gravityFieldCalculation = function(particle, gravityArrays){
    var _g = 10000;

    for(var i = 0; i < gravityArrays.length; i++){
        var edgeVector = particle.position.edge(gravityArrays[i].position);
        var dist = edgeVector.getMagnitude();
        var mass = gravityArrays[i].mass;

        var force = edgeVector.multipleVector(-1 * _g * mass * particle.mass / (dist * dist * dist));
        particle.force = particle.force.addVector(force);
    }
};