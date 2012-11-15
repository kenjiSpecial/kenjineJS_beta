var Wall = function(){
    this.beginVector = undefined;
    this.endVector = undefined;
    this.normalizeVector = undefined;
    this.normalVector = undefined;
    this.length = undefined;
    this.bouncing = -0.30;

    this.wallAnimationDone = false;
};

Wall.prototype.cal_normalize = function(){
    if(this.beginVector === undefined){
        throw "this.beginVector is undefined"
    }
    if(this.endVector === undefined){
        throw "this.endVector is undefined"
    }

    this.length = this.endVector.subtractVector(this.beginVector).getMagnitude();
    this.normalizeVector = this.endVector.subtractVector(this.beginVector).normalize();
    this.normalVector = this.normalizeVector.normal();
};

Wall.prototype.checkBounce = function(myParticle, mySize){
    var JudgeSize = mySize + 1;

    if(this.normalizeVector === undefined){
        throw "this.normalized is undefined."
    }

    var particleVector = myParticle.position.subtractVector(this.beginVector);

    var dotVectorValue = particleVector.dotProduct(this.normalizeVector)/this.length;

    var distanceValue;
    if(dotVectorValue > 1){
        distanceValue = Math.abs(myParticle.position.subtractVector(this.endVector).getMagnitude());
    }else if(dotVectorValue < 0){
        distanceValue = Math.abs(particleVector.getMagnitude());
    }else{
        distanceValue = Math.abs(particleVector.crossProduct(this.normalizeVector));
    }


    if(distanceValue <= JudgeSize){

//        console.log("bounce");
//        console.log(distanceValue);
//        console.log(myParticle.position);

        var velocityVector = myParticle.velocity;
        var verticalVelocityValue = this.normalVector.dotProduct(velocityVector);
        verticalVelocityValue *= this.bouncing - 1;
        myParticle.velocity = velocityVector.addScaledVector(this.normalVector, verticalVelocityValue);

        var hoseiDistance = JudgeSize - distanceValue;
//        console.log(hoseiDistance);
       myParticle.position = myParticle.position.addScaledVector(this.normalVector,  2 * hoseiDistance);

    }

};

Wall.prototype.draw = function( myContext){
    myContext.beginPath();
    myContext.strokeStyle = "#000";
    myContext.moveTo( this.beginVector.x, this.beginVector.y);
    myContext.lineTo( this.endVector.x, this.endVector.y);
    myContext.stroke();
    myContext.closePath();
};

Wall.prototype.animation