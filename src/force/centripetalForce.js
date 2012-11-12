/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 12.11.12
 * Time: 12:39
 * To change this template use File | Settings | File Templates.
 */

 function CentripetalForce(centerVector, movementParticle){
    var r = centerVector.edge(movementParticle.position).getMagnitude();
//    console.log(r);
    var g = 1;

    var omega = Math.sqrt(g * movementParticle.mass / (r * r * r));
}