var Wall = function () {
    this.beginVector = undefined;
    this.endVector = undefined;
    this.normalizeVector = undefined;
    this.normalVector = undefined;
    this.length = undefined;
    this.bounceValue = -1;

    this.wallAnimationDone = false;
    this.bouncing = true;

    this.cr = 0.4;

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

    this.prevCheck = false;
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


    if (distanceValue < JudgeSize) {

        var velocityVector = myParticle.velocity;
        var verticalVelocityValue = this.normalVector.dotProduct(velocityVector);
        verticalVelocityValue = verticalVelocityValue * (-1 + this.bounceValue);

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
    var gravityVal = myCircleRB.force.getMagnitude();
    var wallNormalForce = myCircleRB.force.dotProduct(this.normalVector);

    var coeff = Math.abs(wallNormalForce)/(1 + (myCircleRB.mass * myCircleRB.rad * myCircleRB.rad )/myCircleRB.momentInteria);
//    console.log("coeff: " + coeff);

    //calculating the force
    var wallNormalForceVector = this.normalVector.multipleVector(- wallNormalForce);

    // the force of the friction
    var frictionForeVector = this.normalizeVector.multipleVector(-coeff);


    //setting the force to ball
    myCircleRB.force = myCircleRB.force.addVector(wallNormalForceVector);
    myCircleRB.force = myCircleRB.force.addVector(frictionForeVector);

    var frictionVal = this.normalizeVector.dotProduct(frictionForeVector);

    var checkVal = this.normalizeVector.dotProduct(myCircleRB.velocity);

    if(checkVal > 0){
        myCircleRB.torque = -frictionVal * myCircleRB.rad;
    }else if(checkVal < 0){
        myCircleRB.torque = frictionVal * myCircleRB.rad;
    }else{
        myCircleRB.torque = 0;
    }
//    console.log(frictionVal);

};

Wall.prototype.checkRectangleRBBounce = function(myRectangleRB){

    var torque = 0;
//    torque += -k * myRectangleRB.angVelocity;

    var testCollision = false;
    var j;

    for(var i = 0; i < myRectangleRB.calculatedVertices.length; i++){
//        console.log(myRectangleRB.calculatedVertices[i].edge(this.beginVector).dotProduct(this.normalizeVector));
        var edgeVector = myRectangleRB.calculatedVertices[i].edge(this.beginVector);
        if(edgeVector.dotProduct(this.normalVector) < 0 ){
            testCollision = true;
            j = i;

        }
    }

    //Calculation
    if(testCollision){
        var distance = myRectangleRB.calculatedVertices[j].y - this.beginVector.y;
        myRectangleRB.posVector.subtract(0, 2 * distance);

        var rp1Vector = myRectangleRB.calculatedVertices[j].edge(myRectangleRB.posVector);
        var vp1Vector = myRectangleRB.velocity.addVector(rp1Vector.perp(- rp1Vector.getMagnitude() * myRectangleRB.angVelocity));

        var rp1XNormal = rp1Vector.crossProduct(this.normalVector);
        var impulse = - (1+ this.cr) * vp1Vector.dotProduct(this.normalVector) / (1/myRectangleRB.mass + rp1XNormal * rp1XNormal / myRectangleRB.momentInteria);

        myRectangleRB.velocity = myRectangleRB.velocity.addVector( this.normalVector.multipleVector(impulse/myRectangleRB.mass));
        myRectangleRB.angVelocity += rp1Vector.crossProduct(this.normalVector) * impulse/ myRectangleRB.momentInteria;
    }



    this.prevTestCollision = testCollision;

};

Wall.prototype.checkCircleRBBounce = function (myCircle) {
    var JudgeSize = myCircle.rad;

    if (this.normalizeVector === undefined) {
        throw "normalized is undefined."
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
