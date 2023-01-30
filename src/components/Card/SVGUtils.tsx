import * as THREE from "three";
import { SVGLoader, SVGResult, SVGResultPaths } from "three/examples/jsm/loaders/SVGLoader";

export class SVGUtils{
    static svgToGroup(data:SVGResult){
        const paths:SVGResultPaths[] = data.paths;
	    const group = new THREE.Group();
		for ( let i = 0; i < paths.length; i ++ ) {  // addPathToGroup
            console.log('svgToGroup: i=' + i)
            SVGUtils.addPathToGroup(paths[i], group)
        }
        return group
    }
    static addPathToGroup(path:SVGResultPaths, group:THREE.Group){
        const material = new THREE.MeshBasicMaterial( {
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false
        } );
        const shapes = SVGLoader.createShapes( path );
        for ( let j = 0; j < shapes.length; j ++ ) {
            console.log('addPathToGroup: j=' + j)
            const shape = shapes[ j ];
            SVGUtils.addShapeToGroup(shape, material, group)
        }
    }
    static addShapeToGroup(shape:THREE.Shape, material:THREE.MeshBasicMaterial, group:THREE.Group){
        const geometry = new THREE.ShapeGeometry( shape );
        const mesh = new THREE.Mesh(geometry, material);
        group.add( mesh );
    }

/*
    static svgToGroup(data:SVGResult){
        const paths:SVGResultPaths[] = data.paths;
		const group = new THREE.Group();
		for ( let i = 0; i < paths.length; i ++ ) {  // addPathToGroup
			const path = paths[ i ];
            console.log('path.color', path.color)
			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );
            console.log('shapes', shapes)
			for ( let j = 0; j < shapes.length; j ++ ) {
				const shape = shapes[ j ];
                console.log('shapes', shape)
				const geometry = new THREE.ShapeGeometry( shape );
                console.log('geometry', geometry)
				const mesh = new THREE.Mesh( geometry, material );
                console.log('mesh', mesh)
				group.add( mesh );
			}
        }
        return group
    }
    static shapesToGroup(shapes:THREE.Shape[], group:THREE.Group){

    }
    */
}