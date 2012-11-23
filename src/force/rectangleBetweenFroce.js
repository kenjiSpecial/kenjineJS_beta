/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 23.11.12
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */

var RectangleBetweenForce = function( myRectangle01, myRectangle02){

    var Distance = myRectangle01.posVector.edge(myRectangle02.posVector).getMagnitude();

    if(Distance < myRectangle01.maxVertex() + myRectangle02.maxVertex()){
//        alert("test");
        var vertex01;
        var vertex02;

        //calculate the sides of myRectangle02
        var sides02 = [];
        for(var k = 0; k < myRectangle02.vertices.length - 1; k++){
            sides02.push( myRectangle02.vertices[k + 1].edge(myRectangle02.vertices[k]));
        }
        sides02.push(myRectangle02.vertices[myRectangle02.vertices.length - 1].edge(myRectangle02.vertices[0]));

        //detect the collision in detail
        for(var i = 0; i < myRectangle01.calculatedVertices.length; i++){
            vertex01 = myRectangle01.calculatedVertices[i];
            for(var j = 0; j < myRectangle02.calculatedVertices.length; j++){
                vertex02 = myRectangle02.calculatedVertices[j];





            }
        }
    }

};