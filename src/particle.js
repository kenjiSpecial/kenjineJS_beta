/**
 * Created with JetBrains WebStorm.
 * User: saitoukenji
 * Date: 11/4/12
 * Time: 10:26 AM
 * To change this template use File | Settings | File Templates.
 */
var Particle = function(){
    this.mass = undefined;
    this.velocity = undefined;
    this.acceleration = undefined;
    this.position = undefined;

    this.force = undefined;

    this.lastTime = new Date().getTime();
};

Particle.prototype.update = function(){
    if(this.mass === undefined){
        throw "particle's mass undefined."
    }

    if(this.force === undefined){
        throw  "particle's force undefined."
    }

    var dt = (new Date().getTime() - this.lastTime)/1000;
    this.sum_time += dt;

    //setting the acceleration
    this.acceleration = this.force.multiple(1/this.mass);

    //TODO if this is heavy, you sholud change the addScaledVector
    //setting the velocity
    this.velocity = this.velocity.addScaledVector( this.acceleration, dt);
//    this.velocity = this.velocity.multipleVector(Math.pow(this.damping, dt));

    //setting the position
    this.position = this.position.addScaledVector( this.velocity, dt);

    this.lastTime = new Date().getTime();

};

Particle.prototype.setGravity = function(gravity){
    this.force = gravity.multiple(this.mass);
};

Particle.prototype.resetForce = function(){
    this.force.x = 0;
    this.force.y = 0;
}


//--------------------

var SpaceParticle = function(){
    this.mass = undefined;
    this.position = undefined;

    this.omega = undefined;
    this.g = 1;
    this.radius = undefined;

    this.centerPos = undefined;

    this.lastTime = new Date().getTime();
};

SpaceParticle.prototype.update = function(){
    var sumTime = (new Date().getTime() - this.lastTime)/1000;

    if(this.centerPos === undefined){
        this.position = new Vector(this.radius * Math.cos(this.omega * sumTime), this.radius * Math.sin(this.omega * sumTime));
    }else{
        this.position = new Vector(this.radius * Math.cos(this.omega * sumTime) + this.centerPos.x, this.radius * Math.sin(this.omega * sumTime)  + this.centerPos.y);
    }
};