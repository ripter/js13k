AFRAME.registerGeometry('extrudeShape', {
  schema: {
    vertices: {
      default: ['-1 1 0', '-1 -1 0', '1 -1 0'],
    }
  },

  // init: function (data) {
  //   this.geometry = new THREE.BoxGeometry(1, 1, 1);
  // }

  init(data) {
    var length = 1, width = 0.8;

    // var shape = new THREE.Shape();
    // shape.moveTo( 0,0 );
    // shape.lineTo( 0, width );
    // shape.lineTo( length, width );
    // shape.lineTo( length, 0 );
    // shape.lineTo( 0, 0 );

    /*
    M 0.528 0.097 C 0.58 0.032 0.644 0 0.722 0 C 0.798 0 0.864 0.032 0.919 0.097 L 0.922 0.097 C 0.974 0.161 1 0.236 1 0.322 C 1 0.395 0.982 0.458 0.944 0.512 L 0.919 0.547 L 0.539 0.981 L 0.5 1 C 0.485 1 0.472 0.994 0.461 0.981 L 0.081 0.547 L 0.056 0.512 C 0.019 0.458 0 0.395 0 0.322 C 0 0.236 0.027 0.161 0.081 0.097 C 0.136 0.032 0.202 0 0.278 0 C 0.356 0 0.42 0.032 0.472 0.097 L 0.5 0.134 L 0.528 0.097
     */
     /*
        M 10,30
       A 20,20 0,0,1 50,30
       A 20,20 0,0,1 90,30
       Q 90,60 50,90
       Q 10,60 10,30 z

      */

    const shape = new THREE.Shape();

    // triangle
    // shape.moveTo(0.75, 0.50);
    // shape.lineTo(1, 0.75);
    // shape.lineTo(1, 0.25)

    // storm cloud: https://codepen.io/stephenrichard/pen/jEqmjr
    // shape.moveTo(100, 200);
    // shape.lineTo(350, 200);
    // shape.bezierCurveTo(400, 200, 400, 100, 350, 100);
    // shape.bezierCurveTo(350, 20, 220, 20, 210, 80);
    // shape.bezierCurveTo(210, 80, 150, 50, 120, 120);
    // shape.bezierCurveTo(120, 120, 50, 140,100, 200);

    // lightning: https://codepen.io/stephenrichard/pen/jEqmjr
    // shape.moveTo(240, 200);
    // shape.lineTo(290, 200);
    // shape.lineTo(270, 240);
    // shape.lineTo(310, 240);
    // shape.lineTo(230, 330);
    // shape.lineTo(250, 280);
    // shape.lineTo(200, 280);


    // Converted SVG Heart using http://demo.qunee.com/svg2canvas/
    shape.moveTo(0.528,0.097);
    shape.bezierCurveTo(0.58,0.032,0.644,0,0.722,0);
    shape.bezierCurveTo(0.798,0,0.864,0.032,0.919,0.097);
    shape.lineTo(0.922,0.097);
    shape.bezierCurveTo(0.974,0.161,1,0.236,1,0.322);
    shape.bezierCurveTo(1,0.395,0.982,0.458,0.944,0.512);
    shape.lineTo(0.919,0.547);
    shape.lineTo(0.539,0.981);
    shape.lineTo(0.5,1);
    shape.bezierCurveTo(0.485,1,0.472,0.994,0.461,0.981);
    shape.lineTo(0.081,0.547);
    shape.lineTo(0.056,0.512);
    shape.bezierCurveTo(0.019,0.458,0,0.395,0,0.322);
    shape.bezierCurveTo(0,0.236,0.027,0.161,0.081,0.097);
    shape.bezierCurveTo(0.136,0.032,0.202,0,0.278,0);
    shape.bezierCurveTo(0.356,0,0.42,0.032,0.472,0.097);
    shape.lineTo(0.5,0.134);
    shape.lineTo(0.528,0.097);


    var extrudeSettings = {
      depth: 0.15,
      bevelEnabled: false,
      // bevelEnabled: true,
      // bevelThickness: 0.05,
      // bevelSize: 0.01,
      // bevelOffset: 0,
    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

    // used for cloud/lighting
    // geometry.scale(0.01, 0.01, 0.01);
    geometry.rotateX(3.14159);

    geometry.computeBoundingBox();
    // geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.mergeVertices();
    // geometry.computeFaceNormals();
    // geometry.computeVertexNormals();

    this.geometry = geometry;
  },
});
