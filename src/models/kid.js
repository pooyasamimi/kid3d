import * as THREE from 'three'

export function loadKid(gltfLoader, scene, textureLoader) {
  const fabricColorTex = textureLoader.load('./textures/fabric/Color.jpg')
  const fabricRoughnessTex = textureLoader.load('./textures/fabric/Roughness.jpg')
  const fabricNormalMapTex = textureLoader.load('./textures/fabric/NormalGL.jpg')

  gltfLoader.load(
    'https://cdn.jsdelivr.net/gh/pooyasamimi/kid3d@glb-branch/models/kid-compress.glb',
    function (gltf) {
      const kidModel = gltf.scene
      scene.add(kidModel)

      kidModel.scale.set(0.03, 0.03, 0.03)
      kidModel.position.set(0, 0.2, 0)
      kidModel.rotation.y = -Math.PI / 3

      kidModel.traverse(child => {
        if (child.isMesh) {
          switch (child.name) {
            case 'Toenails_312_Shape_1':
            case 'Fingernails_424_Shape_1':
              child.material.color = new THREE.Color(0xe80e32)
              break
            case 'Diaper_4085_Shape_1':
              child.material = new THREE.MeshStandardMaterial({
                map: fabricColorTex,
                roughness: fabricRoughnessTex,
                normalMap: fabricNormalMapTex,
              })
              break
          }
        }
      })
    },
    undefined,
    function (error) {
      alert('Kid load error' + error)
    }
  )
}
