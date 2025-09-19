import * as THREE from 'three'

export const loadingManager = new THREE.LoadingManager()

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  // console.log(itemsLoaded)

  const percent = Math.round((itemsLoaded / itemsTotal) * 100)
  document.querySelector('.loader-progress').textContent = percent + '%'
}

loadingManager.onLoad = () => {
  document.querySelector('.loader').style.opacity = 0
  setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'
  }, 1000)
}

loadingManager.onError = (url) => {
  console.log('There was an error loading ' + url)
}
