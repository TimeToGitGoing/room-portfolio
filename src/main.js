import './style.scss'
import gsap from "gsap"
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js"
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
const roomTex1 = textureLoader.load('/textures/room/room-tex-1.webp')
const roomTex2 = textureLoader.load('/textures/room/room-tex-2.webp')
const booksTex = textureLoader.load('/textures/room/books-tex.webp')
const floorTex = textureLoader.load('/textures/room/floor-tex.webp')
const monitorsTex = textureLoader.load('/textures/room/monitors-tex.webp')
const nzTex = textureLoader.load('/textures/room/nz-tex.webp')
const tuscanyTex = textureLoader.load('/textures/room/tuscany-tex.webp')
const OuterWildsTex = textureLoader.load('/textures/room/Outerwilds-tex.webp')
const pascal1Tex = textureLoader.load('/textures/room/Pascal1-tex.webp')
const pascal2Tex = textureLoader.load('/textures/room/Pascal2-tex.webp')
const pascal3Tex = textureLoader.load('/textures/room/pascal3-tex.webp')
const plantTex = textureLoader.load('/textures/room/plant-tex.webp')
const miscTex = textureLoader.load('/textures/room/misc-tex.webp')
const shelfbookTex = textureLoader.load('/textures/room/shelf-book-tex.webp')
const tableChairStuffTex = textureLoader.load('/textures/room/tablechairstuff-tex.webp')
const screenRtTex = textureLoader.load('/textures/room/screenRt-tex.webp')
const screenLfTex = textureLoader.load('/textures/room/screenLf-tex.webp')

// Emission materials
const outsideLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const redLightMaterial = new THREE.MeshBasicMaterial({ color: 0xe32f22 })

// Environment map
const environmentMap = new THREE.CubeTextureLoader()
  .setPath( 'textures/skybox/' )
  .load([
        'px.webp',
        'nx.webp',
        'py.webp',
        'ny.webp',
        'pz.webp',
        'nz.webp'
])

// Glass material
const glassMaterial = new THREE.MeshPhysicalMaterial({
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  envMap: environmentMap,
  envMapIntensity: 1,
})


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
        if (child.name.includes("glassPanel")){
          child.material = glassMaterial
        }
        if (child.name.includes("clockGlass")){
          child.material = glassMaterial
        }
        if (child.name.includes("ScreenRt-monitors")){
          child.material = new THREE.MeshBasicMaterial({
            map: screenRtTex
          })
        }
        if (child.name.includes("ScreenLf-monitors")){
          child.material = new THREE.MeshBasicMaterial({
            map: screenLfTex
          })
        }
        if (child.name.includes("Raycaster")) {
          raycasterObjects.push(child);
        }
        if (child.name.includes("Hover")) {
          child.userData.initialScale = new THREE.Vector3().copy(child.scale)
          child.userData.initialPosition = new THREE.Vector3().copy(child.position)
          child.userData.initialRotation = new THREE.Euler().copy(child.rotation)
        }


        const windowLightMesh = gltf.scene.children.find((child) => child.name === 'windowlight')
        const doorLightMesh = gltf.scene.children.find((child) => child.name === 'doorlight')
        const monitorLightMesh = gltf.scene.children.find((child) => child.name === 'monitorRed')
        const pcLightMesh = gltf.scene.children.find((child) => child.name === 'PCRed')

        windowLightMesh.material = outsideLightMaterial
        doorLightMesh.material = outsideLightMaterial
        monitorLightMesh.material = redLightMaterial
        pcLightMesh.material = redLightMaterial
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
screenRtTex.flipY = false
screenLfTex.flipY = false

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
screenRtTex.colorSpace = THREE.SRGBColorSpace
screenLfTex.colorSpace = THREE.SRGBColorSpace

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 35, sizes.width / sizes.height, 0.1, 1000 )
camera.position.z = 5
// controls.update() must be called after any manual changes to the camera's transforms
camera.position.set(20, 7, 20)


const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls( camera, renderer.domElement )
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.target.set(1.2, -0.9, -0.6)

// Limit camera angles and movement
controls.minDistance = 5
controls.maxDistance = 100
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI / 2
controls.minAzimuthAngle = 0
controls.maxAzimuthAngle = Math.PI / 2 * 0.92

// Raycaster
const raycasterObjects = []
let currentIntersects = []
let currentHoveredObject = null

if (currentHoveredObject) {
  playHoverAnimation(currentHoveredObject, false)
  currentHoveredObject = null
}

const portfolioLinks = {
  "ScreenRt": "https://www.artistwan.com/showreel",
  "ScreenLf": "https://www.artistwan.com/projects"
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
})

window.addEventListener("click", (e) => {
  if(currentIntersects.length>0){
    const object = currentIntersects[0].object

    Object.entries(portfolioLinks).forEach(([key, url]) => {
      if(object.name.includes(key)){
        const newWindow = window.open()
        newWindow.opener = null
        newWindow.location = url
        newWindow.target = "_blank"
        newWindow.rel = "noopener noreferrer"
      }
    })
  }
})

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

function playHoverAnimation (object, isHovering){
  let scale = 1.15
  gsap.killTweensOf(object.scale)
  gsap.killTweensOf(object.rotation)
  gsap.killTweensOf(object.position)

  if(isHovering){
    // scale animation for all objects
    gsap.to(object.scale, {
      x: object.userData.initialScale.x * scale,
      y: object.userData.initialScale.y * scale,
      z: object.userData.initialScale.z * scale,
      duration: 0.5,
      ease: "back.out(2)"
    })
    gsap.to(object.rotation, {
      x: object.userData.initialRotation.x + Math.PI / 10,
      duration: 0.5,
      ease: "back.out(2)",
    })
  }else{
    // reset scale for all objects
    gsap.to(object.scale, {
      x: object.userData.initialScale.x,
      y: object.userData.initialScale.y,
      z: object.userData.initialScale.z,
      duration: 0.3,
      ease: "back.out(2)"
    })
    gsap.to(object.rotation, {
      x: object.userData.initialRotation.x,
      duration: 0.3,
      ease: "back.out(2)",
    })
  }
}

const render = () => {
  controls.update()
 
  // Raycaster
  raycaster.setFromCamera(pointer, camera)

	// calculate objects intersecting the picking ray
	currentIntersects = raycaster.intersectObjects(raycasterObjects)

	for ( let i = 0; i < currentIntersects.length; i ++ ) {
	}

  if(currentIntersects.length>0){
    const currentIntersectObject = currentIntersects[0].object

    if(currentIntersectObject.name.includes("Hover")){
      if(currentIntersectObject !== currentHoveredObject){
        
        if(currentHoveredObject){
          playHoverAnimation(currentHoveredObject, false)
        }
        
        playHoverAnimation(currentIntersectObject, true)
        currentHoveredObject = currentIntersectObject
      }
    }

    if(currentIntersectObject.name.includes("Raycaster")){
      document.body.style.cursor = "pointer"
    }else{
      document.body.style.cursor = "default"
    }
  }else{
    if (currentHoveredObject) {
      playHoverAnimation(currentHoveredObject, false)
      currentHoveredObject = null
    }
    document.body.style.cursor = "default"
  }


  renderer.render(scene, camera)

  window.requestAnimationFrame(render)
}

render()