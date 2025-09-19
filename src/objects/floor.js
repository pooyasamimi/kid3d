import * as THREE from 'three'

export function createFloor(textureLoader) {
  const floorColorTex = textureLoader.load('https://cdn.jsdelivr.net/gh/pooyasamimi/kid3d@glb-branch/textures/carpet/Color.jpg')
  const floorRoughnessTex = textureLoader.load('https://cdn.jsdelivr.net/gh/pooyasamimi/kid3d@glb-branch/textures/carpet/Roughness.jpg')
  const floorNormalMapTex = textureLoader.load('https://cdn.jsdelivr.net/gh/pooyasamimi/kid3d@glb-branch/textures/carpet/NormalGL.jpg')

  const floorGeometry = new THREE.PlaneGeometry(30, 30)
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTex,
    roughness: floorRoughnessTex,
    normalMap: floorNormalMapTex,
  })

  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotation.x = -Math.PI / 2

  return floor
}
