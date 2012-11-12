/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/9/12
 * Time: 9:59 AM
 * To change this template use File | Settings | File Templates.
 */
var Bubble = function(x, y, wd, hg){
    this.x = x;
    this.y = y;

    this.wd = wd;
    this.hg = hg;
    this.color = "rgba( 0, 0, 255, 0.3)";

    this.rho = 1;
    this.rho_p = 0.99;

    this.gravity = 50;
    this.V = 1;

    this.windVelocity = new Vector( 140, 0);
    this.k_func = 0.03;

    this.count = 0;
}

Bubble.prototype.draw = function(context){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect( this.x, this.y, this.wd, this.hg);
    context.closePath();
};

Bubble.prototype.bubble_force = function(particle, myBall){
    var V = particle.mass / this.rho_p;
    this.k = Math.pow( myBall.size * 2, 2) * this.k_func;

//    calculation ot the force of the upthrust
    particle.force.subtract(0, V * this.rho * this.gravity);

    //    subtract the value of the drag
//    console.log(particle.velocity);

    var drag = particle.velocity.multiple(particle.velocity.getMagnitude() * this.k);

    particle.force.subtract(drag.x, drag.y);



    var relWind = this.windVelocity.subtractVector(particle.velocity);
    var windMagnitude = relWind.getMagnitude();



    var wind_force;
    if(windMagnitude > 0){
        //wind_force = -k * v * vector(v)
        wind_force = relWind.multipleVector(- this.k_func * windMagnitude);
    }else{
        wind_force = new Vector(0, 0);
    }

    particle.force.add( wind_force.x, wind_force.y);
    this.count++;
};