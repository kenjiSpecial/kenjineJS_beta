/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 23.11.12
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */



var RectangleBetweenForce = function( myRectangle01, myRectangle02){

    var Distance = myRectangle01.posVector.edge(myRectangle02.posVector).getMagnitude();
//    console.log("distance: "+ Distance);

    if(Distance < myRectangle01.maxVertex() + myRectangle02.maxVertex()){
//        alert("test");
        var vertex01;
        var vertex02;
//        var side02;

        //calculate the sides of myRectangle02
        var sides02 = [];
        for(var k = 0; k < myRectangle02.vertices.length - 1; k++){
            sides02.push( myRectangle02.calculatedVertices[k + 1].edge(myRectangle02.calculatedVertices[k]));
        }
        sides02.push(myRectangle02.calculatedVertices[0].edge(myRectangle02.calculatedVertices[myRectangle02.vertices.length - 1]));

        //detect the collision in detail
        for(var i = 0; i < myRectangle01.calculatedVertices.length; i++){
            vertex01 = myRectangle01.calculatedVertices[i];
            for(var j = 0; j < myRectangle02.calculatedVertices.length; j++){

                vertex02 = myRectangle02.calculatedVertices[j];
//                console.log("j: "+j+ ", vertex01: (" + vertex02.x + ", " + vertex02.y + ")");

//                if(j === myRectangle02.calculatedVertices.length - 1){
//                    side02 = myRectangle02.calculatedVertices[j + 1].edge(myRectangle02.calculatedVertices[j]);
//                }else{
//                    side02 = myRectangle02.calculatedVertices[0].edge(myRectangle02.calculatedVertices[j]);
//                }

                var displace_vertices = vertex02.subtractVector(vertex01);
//                console.log("val: " + displace_vertices.dotProduct(sides02[j].normal()))
                if(displace_vertices.dotProduct(sides02[j].normal()) < 0){
                    break;
                }

            }

//            console.log("------");
//            console.log("");

            if(j == myRectangle02.calculatedVertices.length){
//                console.log("i: "+i + ", vertex01: (" + vertex01.x + ", " + vertex01.y + ")");
//                console.log("---");

                var angRef = 3 * Math.PI;
                var displaceVector;

                for(var j = 0; j < myRectangle02.calculatedVertices.length;j++){
                    vertex02 = myRectangle02.calculatedVertices[j];
                    displace_vertices = vertex02.subtractVector(vertex01);

//                    var vectCheck = displace_vertices.dotProduct(sides02[j].normalize());
                    var dotProductVal = displace_vertices.dotProduct(sides02[j]) / (sides02[j].getMagnitude() * sides02[j].getMagnitude()) ;
                    var vectorCheck = sides02[j].multipleVector(dotProductVal);
                    var normalVector = displace_vertices.subtractVector(vectorCheck);
                    //
//                    var myArrow = new Arrow(normalVector);
//                    myArrow.setStartPt(vertex01);
//                    myArrow.color = "#ffffff";
//                    myArrow.lineColor = "#ffffff";
//                    myArrow.draw(myContext);


//                    if(Math.abs())
                    var myRectangle01SideVector = vertex01.subtractVector(myRectangle01.posVector).multipleVector(-1);
//                    var nextArrow = new Arrow(myRectangle01SideVector);
//                    nextArrow.setStartPt(vertex01);
//                    nextArrow.color = "#ffffff";
//                    nextArrow.lineColor = "#ffffff";
//                    nextArrow.draw(myContext);

                    var theta = Math.abs( Math.acos(myRectangle01SideVector.dotProduct(normalVector)/(normalVector.getMagnitude() * myRectangle01SideVector.getMagnitude())));

                    if(theta < angRef){
                        displaceVector = normalVector;
                        angRef = theta;
                    }

                    if(normalVector.getMagnitude() <1){
//                        console.log('J is'+ j);
                        break;
                    }
                }
//                console.log(displaceVector);

//                console.log(myRectangle01.posVector);
                myRectangle01.posVector = myRectangle01.posVector.addVector(displaceVector);
                var normal = displaceVector.normal();
                var rp1 = vertex01.subtractVector(myRectangle01.posVector);
                var rp2 = vertex01.subtractVector(myRectangle02.posVector);
                var vp1 = myRectangle01.velocity.addVector(rp1.perp(-myRectangle01.angVelocity * rp1.getMagnitude()));
                var vp2 = myRectangle02.velocity.addVector(rp2.perp(-myRectangle02.angVelocity * rp2.getMagnitude()));


                var vr = vp1.subtractVector(vp2);
                console.log(vr);
                var invm1 = 1/myRectangle01.mass;
                var invm2 = 1/myRectangle02.mass;
                var invT1 = 1/myRectangle01.momentInteria;
                var invT2 = 1/myRectangle02.momentInteria;
                var rp1Xn = rp1.crossProduct(normal);
                var rp2Xn = rp2.crossProduct(normal);
                var _cr = .5;
                var impulase = -(1 +_cr) * vr.dotProduct(normal) / (invm1 + invm2 + rp1Xn * rp1Xn * invT1 + rp2Xn * rp2Xn * invT2);
                console.log(impulase);
                console.log(impulase * invm1);
//                console.log(myRectangle01.velocity);
                myRectangle01.velocity = myRectangle01.velocity.addVector(normal.multiple(impulase * invm1));
//                console.log(normal.multiple(impulase * invm1));
//                console.log(myRectangle01.velocity);
                myRectangle01.angVelocity += rp1.crossProduct(normal) * impulase * invT1;

                myRectangle02.velocity = myRectangle02.velocity.addVector(normal.multiple(impulase * invm2));
                myRectangle02.angVelocity += rp2.crossProduct(normal) * impulase * invT2;



            }

        }
    }

};