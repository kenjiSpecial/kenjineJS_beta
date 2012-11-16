/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 16.11.12
 * Time: 16:51
 * To change this template use File | Settings | File Templates.
 */

var Circle = function(){
    this.size = undefined;
    this.color = "#ff0000";
    this.position = undefined;
};

Circle.prototype = new Particle();

Circle.prototype.draw = function(context){
    if(this.position == undefined){
        throw "Circle's position is undefined"
    }

    context.beginPath();
    context.fillStyle = this.color;
    context.arc( this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

};


Circle.prototype.collision_detect = function(Circle){

};