/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 16.11.12
 * Time: 16:51
 * To change this template use File | Settings | File Templates.
 */

var Circle = function () {
    this.size = undefined;
    this.color = "#ff0000";
//    this.particle = undefined;
};

Circle.prototype = new Particle();

Circle.prototype.draw = function (context) {

    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

};


Circle.prototype.collision_detect_one = function (Circle) {
    var distance = this.position.edge(Circle.position).getMagnitude();
    var circleSumR = this.size + Circle.size;


    if (distance < circleSumR) {
        //back distance

        var velocity_this = this.velocity.getMagnitude();
        var velocity_circle = Circle.velocity.getMagnitude();
        var dt;

        var sumVelocity = velocity_this + velocity_circle;
        var L = circleSumR - distance;

        if (velocity_circle == 0) {
            this.position = this.position.addScaledVector(this.velocity, L / velocity_this);
            dt = L / sumVelocity;

        } else if (velocity_this == 0) {
            Circle.position = Circle.position.addScaledVector(Circle.velocity, L / velocity_circle);
            dt = L / sumVelocity;

        } else {

            dt = L / sumVelocity;

            var thisBackDistance = L * velocity_this / sumVelocity;
            var circleBackDistance = L * velocity_circle / sumVelocity;

            Circle.position = Circle.position.addScaledVector(Circle.velocity, -circleBackDistance / velocity_circle);
            this.position = this.position.addScaledVector(this.velocity, -thisBackDistance / velocity_this);

        }


        //calculation the speed of the circle

        var tempThisVelocity = this.velocity.copy();

        var sumMass = this.mass + Circle.mass;
        var subtractMass = this.mass - Circle.mass;

//        var this_velocity_value = (subtractMass * velocity_this + 2 * this.mass * velocity_circle) / sumMass;
//        var circle_velocity_value = sumVelocity - this_velocity_value;

        this.velocity = this.velocity.multipleVector(subtractMass / sumMass);
        this.velocity = this.velocity.addScaledVector(Circle.velocity, 2 * Circle.mass / sumMass);

        Circle.velocity = Circle.velocity.multiple(-subtractMass / sumMass);
        Circle.velocity = Circle.velocity.addScaledVector(tempThisVelocity, 2 * this.mass / sumMass);
//        this.veloc


        this.position = this.position.addScaledVector(this.velocity, dt);
        Circle.position = Circle.position.addScaledVector(Circle.velocity, dt);
    }
};

Circle.prototype.collision_detect = function (Circle) {
    var edgeVector = this.position.edge(Circle.position);
    var distance = edgeVector.getMagnitude();
    var circleSumR = this.size + Circle.size;


    if (distance < circleSumR) {
        //back distance
        var collideNormalVector = edgeVector.normalize();

        //projection to the collideVector from circle and this
        var thisProjectionVal = collideNormalVector.dotProduct(this.velocity);
        var circleProjectionVal = collideNormalVector.dotProduct(Circle.velocity);


        var dt;

        var sumVelocity = circleProjectionVal - thisProjectionVal;
//        var absVelocity = Math.abs(circleProjectionVal) + Math.abs(thisProjectionVal);
//        console.log("circleProjectionVal: " + circleProjectionVal + ", thisProjectionVal: " + thisProjectionVal);
//        console.log("sumVelocity: " + sumVelocity);
        console.log("circleSumR: "+circleSumR);
        var L = circleSumR - distance;
//        console.log("L: " + L);

        //calculation the time
        dt = L / sumVelocity;

        if (circleProjectionVal == 0) {
            this.position = this.position.addScaledVector(collideNormalVector, L);
        } else if (thisProjectionVal == 0) {
            Circle.position = Circle.position.addScaledVector(collideNormalVector, -L);
        } else {
//            var circleBackDistance = L * Math.abs(circleProjectionVal) / absVelocity;

//            console.log("circleBackDistance: "+circleBackDistance);
            Circle.position = Circle.position.addScaledVector(collideNormalVector, - dt * circleProjectionVal);
            this.position = this.position.addScaledVector(collideNormalVector, - dt * thisProjectionVal);
        }

        console.log("distance: " + distance);
        var newDistance =Circle.position.edge(this.position).getMagnitude();
        console.log("newDistance: "+ newDistance);


        //calculation the speed of the circle

        var sumMass = this.mass + Circle.mass;
        var subtractMass = this.mass - Circle.mass;

        var newThisVelocityValue = (subtractMass * thisProjectionVal + 2 * this.mass * circleProjectionVal) / sumMass;
        var newCircleVelocityValue = thisProjectionVal + circleProjectionVal - newThisVelocityValue;

//        var sum = thisProjectionVal + circleProjectionVal;
//        console.log('before: thisVal: ' + thisProjectionVal + ", circleVal: " + circleProjectionVal + ", sum: " + sum);
//        sum = newThisVelocityValue + newCircleVelocityValue;
//        console.log('after: thisVal: ' + newThisVelocityValue + ", circleVal: " + newCircleVelocityValue+  ", sum: " + sum);


        this.velocity = this.velocity.addScaledVector(collideNormalVector, newThisVelocityValue - thisProjectionVal);
        Circle.velocity = Circle.velocity.addScaledVector(collideNormalVector, newCircleVelocityValue - circleProjectionVal);

        this.position = this.position.addScaledVector(collideNormalVector, dt*newThisVelocityValue);
        Circle.position = Circle.position.addScaledVector(collideNormalVector, dt*newCircleVelocityValue);

        newDistance =Circle.position.edge(this.position).getMagnitude();
        console.log("newDistance: "+ newDistance);

        console.log("");
        console.log("");

    }
};