import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

const canvas = document.querySelector("#experience-canvas")
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Loaders
const textureLoader = new THREE.TextureLoader()

// DRACO loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

// Textures
const roomTex1 = textureLoader.load('/textures/room-tex-1.webp')
const roomTex2 = textureLoader.load('/textures/room-tex-2.webp')
const booksTex = textureLoader.load('/textures/books-tex.webp')
const floorTex = textureLoader.load('/textures/floor-tex.webp')
const monitorsTex = textureLoader.load('/textures/monitors-tex.webp')
const nzTex = textureLoader.load('/textures/nz-tex.webp')
const tuscanyTex = textureLoader.load('/textures/tuscany-tex.webp')
const OuterWildsTex = textureLoader.load('/textures/Outerwilds-tex.webp')
const pascal1Tex = textureLoader.load('/textures/Pascal1-tex.webp')
const pascal2Tex = textureLoader.load('/textures/Pascal2-tex.webp')
const pascal3Tex = textureLoader.load('/textures/pascal3-tex.webp')
const plantTex = textureLoader.load('/textures/plant-tex.webp')
const miscTex = textureLoader.load('/textures/misc-tex.webp')
const shelfbookTex = textureLoader.load('/textures/shelf-book-tex.webp')
const tableChairStuffTex = textureLoader.load('/textures/tablechairstuff-tex.webp')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
  '/models/Room_Portfolio.glb',
  (gltf) => {
    gltf.scene.traverse((child)=>{
      if (child.isMesh) {
        if (child.name.includes("tex1")){
          const material = new THREE.MeshBasicMaterial({
            map: roomTex1
          })
          child.material = material
        }
        if (child.name.includes("tex2")){
          const material = new THREE.MeshBasicMaterial({
            map: roomTex2
          })
          child.material = material
        }
        if (child.name.includes("Books")){
          const material = new THREE.MeshBasicMaterial({
            map: booksTex
          })
          child.material = material
        }
        if (child.name.includes("floor")){
          const material = new THREE.MeshBasicMaterial({
            map: floorTex
          })
          child.material = material
        }
        if (child.name.includes("Monitors")){
          const material = new THREE.MeshBasicMaterial({
            map: monitorsTex
          })
          child.material = material
        }
        if (child.name.includes("nz")){
          const material = new THREE.MeshBasicMaterial({
            map: nzTex
          })
          child.material = material
        }
        if (child.name.includes("tuscany")){
          const material = new THREE.MeshBasicMaterial({
            map: tuscanyTex
          })
          child.material = material
        }
        if (child.name.includes("outerwilds")){
          const material = new THREE.MeshBasicMaterial({
            map: OuterWildsTex
          })
          child.material = material
        }
        if (child.name.includes("pascal1")){
          const material = new THREE.MeshBasicMaterial({
            map: pascal1Tex
          })
          child.material = material
        }
        if (child.name.includes("pascal2")){
          const material = new THREE.MeshBasicMaterial({
            map: pascal2Tex
          })
          child.material = material
        }
        if (child.name.includes("pascal3")){
          const material = new THREE.MeshBasicMaterial({
            map: pascal3Tex
          })
          child.material = material
        }
        if (child.name.includes("bigPlant")){
          const material = new THREE.MeshBasicMaterial({
            map: plantTex
          })
          child.material = material
        }
        if (child.name.includes("Shelves")){
          const material = new THREE.MeshBasicMaterial({
            map: shelfbookTex
          })
          child.material = material
        }
        if (child.name.includes("monitors")){
          const material = new THREE.MeshBasicMaterial({
            map: monitorsTex
          })
          child.material = material
        }
        if (child.name.includes("Misc")){
          const material = new THREE.MeshBasicMaterial({
            map: miscTex
          })
          child.material = material
        }
        if (child.name.includes("otherStuff")){
          const material = new THREE.MeshBasicMaterial({
            map: tableChairStuffTex
          })
          child.material = material
        }
      }
      
    })
    scene.add(gltf.scene)
    console.log(gltf.scene)
  }
)

// Materials
roomTex1.flipY = false
roomTex2.flipY = false
booksTex.flipY = false
floorTex.flipY = false
monitorsTex.flipY = false
nzTex.flipY = false
tuscanyTex.flipY = false
OuterWildsTex.flipY = false
pascal1Tex.flipY = false
pascal2Tex.flipY = false
pascal3Tex.flipY = false
shelfbookTex.flipY = false
plantTex.flipY = false
miscTex.flipY = false
tableChairStuffTex.flipY = false

roomTex1.colorSpace = THREE.SRGBColorSpace
roomTex2.colorSpace = THREE.SRGBColorSpace
booksTex.colorSpace = THREE.SRGBColorSpace
floorTex.colorSpace = THREE.SRGBColorSpace
monitorsTex.colorSpace = THREE.SRGBColorSpace
nzTex.colorSpace = THREE.SRGBColorSpace
tuscanyTex.colorSpace = THREE.SRGBColorSpace
OuterWildsTex.colorSpace = THREE.SRGBColorSpace
pascal1Tex.colorSpace = THREE.SRGBColorSpace
pascal2Tex.colorSpace = THREE.SRGBColorSpace
pascal3Tex.colorSpace = THREE.SRGBColorSpace
shelfbookTex.colorSpace = THREE.SRGBColorSpace
plantTex.colorSpace = THREE.SRGBColorSpace
miscTex.colorSpace = THREE.SRGBColorSpace
miscTex.colorSpace = THREE.SRGBColorSpace
tableChairStuffTex.colorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 )
camera.position.z = 5
// controls.update() must be called after any manual changes to the camera's transforms
camera.position.set(0, 20, 100)


const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls( camera, renderer.domElement )
controls.enableDamping = true
controls.dampingFactor = 0.05

// Event Listeners
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const render = () => {
  controls.update()
  
  renderer.render(scene, camera)

  window.requestAnimationFrame(render)
}

render()