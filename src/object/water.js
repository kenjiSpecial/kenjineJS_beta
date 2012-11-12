/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/8/12
 * Time: 9:17 AM
 * To change this template use File | Settings | File Templates.
 */

var Water = function(x, y, wd, hg){
    this.x = x;
    this.y = y;

    this.wd = wd;
    this.hg = hg;
    this.color = "rgba( 0, 0, 255, 0.3)";

    this.rho = 1.6;
    this.gravity = 50;
    this.V = 1;

    this.k = 0.01;

};

Water.prototype.draw = function(context){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect( this.x, this.y, this.wd, this.hg);
    context.closePath();
};

Water.prototype.floating_force = function(particle, size){
    var ball_yPos = particle.position.y;
    var ball_rate = (ball_yPos - this.y)/size;

    if(ball_rate < -1){
        this.rate = 0;
    }else if(ball_rate < 1){
        this.rate = 0.5 + 0.25*ball_rate*(3 - ball_rate * ball_rate);
    }else{
        this.rate = 1;
    }

//    -----------------------------
//    --- calculation the force ---
//    -----------------------------

//    var upthrust = new Vector(0, -this.rho * this.gravity *  this.V * this.rate);
//    subtract the value of the upthrust
    particle.force.subtract( 0, this.rho * this.gravity *  this.V * this.rate);

    var drag = particle.velocity.multiple(particle.velocity.getMagnitude() * this.k * this.rate);
//    subtract the value of the drag

    particle.force.subtract(drag.x, drag.y);

};