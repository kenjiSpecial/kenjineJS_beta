/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 19.11.12
 * Time: 14:53
 * To change this template use File | Settings | File Templates.
 */

var RigidBody = function(){
    this.mass = undefined;
    this.charge = undefined;
    this.posVector = undefined;

    this.centerMass = undefined;
    this.momentInteria = undefined;

    this.angVelocity = 0;
    this.rotation = 0;
};

RigidBody.prototype = new Particle();