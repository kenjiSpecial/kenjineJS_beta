/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/8/12
 * Time: 9:31 AM
 * To change this template use File | Settings | File Templates.
 */


var Riser = function(x, y, wd, hg){
    this.x = x;
    this.y = y;

    this.wd = wd;
    this.hg = hg;
    this.color = "rgba( 0, 0, 255, 0.3)";

    this.rhoP = 1.1;
    this.rho = 1.6;
    this.gravity = 50;
};

Riser.prototype.draw = function(context){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect( this.x, this.y, this.wd, this.hg);
    context.closePath();
};

Riser.prototype.rising_force = function(particle){
    if(particle.position.x >= this.x && particle.position.x <= this.x + this.wd && particle.position.y >= this.y && particle.position.y <= this.y + this.hg){
        var V = particle.mass / this.rhoP;
        particle.force.subtract(0, V * this.rho * this.gravity);
    }
};