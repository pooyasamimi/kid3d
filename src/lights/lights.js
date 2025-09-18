import * as THREE from 'three'

export function createLights() {
  const rectLightFront = new THREE.RectAreaLight(0xffffff, 2, 2, 4)
  rectLightFront.position.set(0, 1, 1)

  const rectLightBack = new THREE.RectAreaLight(0xffffff, 2, 2, 4)
  rectLightBack.position.set(0, 1, -1)
  rectLightBack.rotation.x = Math.PI

  const rectLightFloor = new THREE.RectAreaLight(0xffffff, 1, 30, 30)
  rectLightFloor.position.set(0, -0.1, 0)
  rectLightFloor.rotation.x = Math.PI / 2

  return [rectLightFront, rectLightBack, rectLightFloor]
}
