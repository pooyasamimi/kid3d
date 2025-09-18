import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export function createText(fontLoader, floor) {
    return new Promise((resolve) => {
        fontLoader.load('./fonts/helvetiker_regular.typeface.json', function (font) {
            const textGeometry = new TextGeometry('BoOs Yoo', {
                font: font,
                size: 0.5,
                depth: 0.3,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.02,
                bevelSegments: 3,
            })

            textGeometry.translate(2.4, 0, 0)
            textGeometry.rotateX(Math.PI / 2.5)
            textGeometry.rotateZ(-Math.PI / 2)

            const textMaterial = new THREE.MeshStandardMaterial({
                color: 0xcf132a,
            })

            const textMesh = new THREE.Mesh(textGeometry, textMaterial)
            floor.add(textMesh)

            resolve(textMesh)
        })
    })
}
