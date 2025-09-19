import * as THREE from 'three'

export function loadPodium(gltfLoader, scene, textureLoader) {
  const rubberColorTex = textureLoader.load('./textures/rubber/Color.jpg')
  const rubberRoughnessTex = textureLoader.load('./textures/rubber/Roughness.jpg')
  const rubberNormalMapTex = textureLoader.load('./textures/rubber/NormalGL.jpg')

  gltfLoader.load(
    'https://cdn.jsdelivr.net/gh/pooyasamimi/kid3d@glb-branch/models/podium-draco.glb',
    function (gltf) {
      const podiumModel = gltf.scene
      scene.add(podiumModel)

      podiumModel.traverse(child => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: rubberColorTex,
            roughness: rubberRoughnessTex,
            normalMap: rubberNormalMapTex,
          })
        }
      })
    },
    undefined,
    function (error) {
      alert('Podium load error' + error)
    }
  )
}
