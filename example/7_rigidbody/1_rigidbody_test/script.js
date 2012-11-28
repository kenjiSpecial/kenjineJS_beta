/**
 * Created with JetBrains WebStorm.
 * User: saito
 * Date: 19.11.12
 * Time: 14:51
 * To change this template use File | Settings | File Templates.
 */

(function () {

    var Polygons = function(){
        this.vertices = undefined;
        this.fillColor = undefined;
        this.strokeColor = undefined;

        this.calculatedVertices = [];
    };

    Polygons.prototype = new RigidBody();

    Polygons.prototype.draw = function(myContext){
        myContext.beginPath();
        myContext.moveTo(this.calculatedVertices[0].x, this.calculatedVertices[0].y);
        for(var i = 1; i < this.calculatedVertices.length; i++){
            myContext.lineTo( this.calculatedVertices[i].x, this.calculatedVertices[i].y);
        }
        myContext.lineTo( this.calculatedVertices[0].x, this.calculatedVertices[0].y);


        if(this.fillColor !== undefined){
            myContext.fillStyle = this.fillColor;
            myContext.fill();
        }

        if(this.strokeColor !== undefined){
            myContext.strokeStyle = this.strokeColor;
            myContext.stroke();
        }

        myContext.closePath();
    };

    Polygons.prototype.initPolygon = function(){
        if(this.mass == undefined){
            throw "Polygon's mass is undefined";
        }

        if(this.posVector === undefined){
            throw "Polygon's posVector is undefined"
        }

        if(this.vertices === undefined){
            throw "Polygon's vertices are undefined"
        }

        for(var i = 0; i < this.vertices.length; i++){
            this.calculatedVertices[i] = this.vertices[i].addVector(this.posVector);
        }
    };

    Polygons.prototype.update = function(){
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
        this.posVector = this.posVector.addScaledVector( this.velocity, dt);

        this.rotation += dt * this.angVelocity;

//        calculation of the vertex each position;
        var matrix = new Matrix();
        matrix.rotate(this.rotation);
        console.log(this.rotation);


        for(var i = 0; i < this.vertices.length; i++){
            this.calculatedVertices[i] = matrix.apply_Vector(this.vertices[i]);
            this.calculatedVertices[i] = this.calculatedVertices[i].addVector(this.posVector);
        }

        this.lastTime = new Date().getTime();
    };

//

    var wd = 600;
    var hg = 400;
    var myCanvas = document.getElementById("myCanvas");
    myCanvas.width = wd;
    myCanvas.height = hg;

    var myContext = myCanvas.getContext("2d");

    myContext.fillStyle = "#ffffff";
    myContext.fillRect(0, 0, wd, hg);

    var contextClear = new Canvas_Context(wd, hg);

    var myPolygon = new Polygons();

    //default;
    var vertices = [];

    var vertex01 = new Vector( -50 * Math.random() - 50, -50 - 50* Math.random());
    vertices.push(vertex01);
    var vertex02 = new Vector( 50 + 50 * Math.random(), -50 - 50 * Math.random());
    vertices.push(vertex02);
    var vertex03 = new Vector( 50 + 50 * Math.random(), 50 + 50 * Math.random());
    vertices.push(vertex03);
    var vertex04 = new Vector( -50 - 50 * Math.random(), 50 + 50 * Math.random());
    vertices.push(vertex04);


    myPolygon.mass = 100;
    myPolygon.posVector = new Vector(wd/2 , hg/5);
    myPolygon.vertices = vertices;
    myPolygon.velocity = new Vector(10, 0);
    myPolygon.angVelocity = 1;
    myPolygon.initPolygon();
    myPolygon.init();

    myPolygon.fillColor = "#000";

    var gravity = new Vector(0, 50);

    init();

    function init() {
//        starting the loop
        loop();
    }

    function loop(){
//        clear the background
        contextClear.update_fill(myContext);

//      ------------
        myPolygon.setGravity(gravity);

        myPolygon.update();
        myPolygon.draw(myContext);

        requestAnimFrame(loop);
    }

})();