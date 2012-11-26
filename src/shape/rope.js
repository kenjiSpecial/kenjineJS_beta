/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 11/26/12
 * Time: 8:09 PM
 * To change this template use File | Settings | File Templates.
 */
/*
 @param {Number} x
 @param {Number} y
 @param {Number} wd
 @param {Number} num
 */

var Rope = function( x, y, wd, num){
    this.x = x;
    this.y = y;

    this.wd = wd;
    this.num = num;

    this.endY = undefined;

    this.k = 1;
};


Rope.prototype.init = function(){
    if(this.endY == undefined){
        this.endY = this.y;
    }

    var wd = this.wd/ (this.num - 1);
    var hg = (this.endY - this.y)/(this.num - 1);

    this.particles = [];

    for(var i = 0; i < this.num; i++){
        var x = this.x + wd * i;
        var y = this.y + hg * i;

        var particle = new Particle();
        particle.position = new Vector(x, y);
        particle.init();

        this.particles.push(particle);
    }

//    console.log(this.particles[0]);
};

Rope.prototype.initTime = function(){

    for(var i = 0; i < this.num; i++){
        this.particles[i].initTime();
    }

};


Rope.prototype.update = function(){
    for(var i = 0; i < this.num; i++){
        this.particles[i].update();
    }
};

Rope.prototype.calcForce = function(){
//    TODO calculation
};

Rope.prototype.draw = function(myContext){
    console.log("draw");
    for(var i = 0; i < this.num - 1; i++){
        myContext.beginPath();
        myContext.strokeStyle = "#666666";

        myContext.moveTo( this.particles[i].position.x, this.particles[i].position.y);
        myContext.lineTo( this.particles[i + 1].position.x, this.particles[i + 1].position.y);
        myContext.stroke();
        myContext.closePath();
    }

    for( i = 0; i < this.num; i++){
        myContext.beginPath();
        myContext.fillStyle = "#000000";
        myContext.arc(this.particles[i].position.x, this.particles[i].position.y, 3, 0, 2 * Math.PI, true);
        myContext.fill();
        myContext.closePath();
    }

};
