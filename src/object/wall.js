var Wall = function () {
    this.beginVector = undefined;
    this.endVector = undefined;
    this.normalizeVector = undefined;
    this.normalVector = undefined;
    this.length = undefined;
    this.bouncing = -1;

    this.wallAnimationDone = false;
    this.bouncing = true;
};

Wall.prototype.cal_normalize = function () {
    if (this.beginVector === undefined) {
        throw "this.beginVector is undefined"
    }
    if (this.endVector === undefined) {
        throw "this.endVector is undefined"
    }

    this.length = this.endVector.subtractVector(this.beginVector).getMagnitude();
    this.normalizeVector = this.endVector.subtractVector(this.beginVector).normalize();
    this.normalVector = this.normalizeVector.normal();
};

Wall.prototype.checkBounce = function (myParticle, mySize) {
    var JudgeSize = mySize;

    if (this.normalizeVector === undefined) {
        throw "this.normalized is undefined."
    }

    var particleVector = myParticle.position.subtractVector(this.beginVector);

    var dotVectorValue = particleVector.dotProduct(this.normalizeVector) / this.length;

    var distanceValue;
    if (dotVectorValue > 1) {
        distanceValue = Math.abs(myParticle.position.subtractVector(this.endVector).getMagnitude());
    } else if (dotVectorValue < 0) {
        distanceValue = Math.abs(particleVector.getMagnitude());
    } else {
        distanceValue = Math.abs(particleVector.crossProduct(this.normalizeVector));
    }

    console.log(distanceValue);
    console.log(JudgeSize);

    if (distanceValue < JudgeSize) {
        console.log("bounce");

        var velocityVector = myParticle.velocity;
        var verticalVelocityValue = this.normalVector.dotProduct(velocityVector);
        verticalVelocityValue *= this.bouncing - 1;

        var hoseiDistance = JudgeSize - distanceValue;
        if (this.normalVector.dotProduct(myParticle.velocity) > 0) {
            myParticle.position = myParticle.position.addScaledVector(this.normalVector, -2 * hoseiDistance);
        } else {
            myParticle.position = myParticle.position.addScaledVector(this.normalVector, 2 * hoseiDistance);
        }

        myParticle.velocity = velocityVector.addScaledVector(this.normalVector, verticalVelocityValue);


    }

};

Wall.prototype.calcRBForce = function(myCircleRB){

};

Wall.prototype.checkCircleRBBounce = function (myCircle) {
    var JudgeSize = myCircle.rad;

    if (this.normalizeVector === undefined) {
        throw "this.normalized is undefined."
    }

    var circlePositionVector = myCircle.posVector.subtractVector(this.beginVector);

    var dotVectorValue = circlePositionVector.dotProduct(this.normalizeVector) / this.length;

    var distanceValue;
    if (dotVectorValue > 1) {
        distanceValue = Math.abs(myCircle.posVector.subtractVector(this.endVector).getMagnitude());
    } else if (dotVectorValue < 0) {
        distanceValue = Math.abs(circlePositionVector.getMagnitude());
    } else {
        distanceValue = Math.abs(circlePositionVector.crossProduct(this.normalizeVector));
    }


    if (distanceValue < JudgeSize) {

        var velocityVector = myCircle.velocity;
        var verticalVelocityValue = this.normalVector.dotProduct(velocityVector);
//        console.log(verticalVelocityValue);
        if (Math.abs(verticalVelocityValue) < 3) {
            verticalVelocityValue = 0;
            this.bouncing = false;
        } else {
            verticalVelocityValue *= this.bouncing - 1;
        }


        var hoseiDistance = JudgeSize - distanceValue;


        if (this.bouncing) {
            if (this.normalVector.dotProduct(myCircle.velocity) > 0) {
                myCircle.posVector = myCircle.posVector.addScaledVector(this.normalVector, -2 * hoseiDistance);
            } else {
                myCircle.posVector = myCircle.posVector.addScaledVector(this.normalVector, 2 * hoseiDistance);
            }
            myCircle.velocity = velocityVector.addScaledVector(this.normalVector, verticalVelocityValue);
        }else{
            if (this.normalVector.dotProduct(myCircle.velocity) > 0) {
                myCircle.posVector = myCircle.posVector.addScaledVector(this.normalVector, -1 * hoseiDistance);
            } else {
                myCircle.posVector = myCircle.posVector.addScaledVector(this.normalVector,  hoseiDistance);
            }
            myCircle.velocity = velocityVector.addScaledVector(this.normalVector, verticalVelocityValue);
        }

    }

};

Wall.prototype.draw = function (myContext) {
    myContext.beginPath();
    myContext.strokeStyle = "#000";
    myContext.moveTo(this.beginVector.x, this.beginVector.y);
    myContext.lineTo(this.endVector.x, this.endVector.y);
    myContext.stroke();
    myContext.closePath();
};
