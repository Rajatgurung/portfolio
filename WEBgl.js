import gsap, { TimelineMax, CSSPlugin } from "gsap";
import {
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import * as THREE from "three";
import { GUI } from "dat.gui";
import star from "./texture/star.png";
//render canvas to dom
const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.querySelector(".webGL").appendChild(renderer.domElement);

const scene = new Scene();
const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 1.2;
window.onresize = (ev) => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
const light = new THREE.DirectionalLight(0xffdddd, 1);
light.position.set(-1000, 3830.8, -7441.6);
scene.add(light);

const pointLight = new PointLight(0xff0000, 0);
const mouseLight = new PointLight(0xffff00, 0.5, 0.8);
mouseLight.scale.set(0.001, 0.001, 0.001);
pointLight.position.set(-3.4, 4, -4);
scene.add(pointLight);

const geometry = new SphereGeometry(0.5, 60, 60);
const material = new MeshStandardMaterial({
  flatShading: THREE.FlatShading,
  color: 0x0095dd,
});
material.roughness = 0.2;
material.metalness = 0.7;
const sphere = new Mesh(geometry, material);
scene.add(sphere);
let started = false;

// const gui = new GUI();
// gui.add(mouseLight.position, "x", -10, 10);
// gui.add(mouseLight.position, "y", -10, 10);
// gui.add(mouseLight.position, "z", -10, 10);

const pointLightHelper = new THREE.PointLightHelper(mouseLight);
// scene.add(pointLightHelper);
const { array } = sphere.geometry.attributes.position;
for (let i = 0; i < array.length; i++) {
  if (i % 3 == 0) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i] = x + (Math.random() - 0.05) * 0.02;
    array[i + 1] = y + (Math.random() - 0.05) * 0.02;
    array[i + 2] = z + (Math.random() - 0.05) * 0.02;
  }
}

const starGeo = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 6000; i++) {
  vertices.push(Math.random() * 100 - 50);
}

starGeo.setAttribute(
  "position",
  new THREE.BufferAttribute(new Float32Array(vertices), 3)
);

const sprite = new THREE.TextureLoader().load(star);
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.0,
  map: sprite,
  opacity: 0,
});

const stars = new THREE.Points(starGeo, starMaterial);

scene.add(stars);
const animate = function () {
  requestAnimationFrame(animate);

  if (!started) {
    const tl = new TimelineMax();

    gsap.registerPlugin(CSSPlugin);
    tl.to(
      light.position,
      {
        x: -1000,
        y: 2097,
        z: 146,
        duration: 5,
        ease: "easeOut",
      },
      "start"
    )
      .to(
        pointLight.position,
        {
          x: 2.5,

          duration: 5,
          ease: "easeOut",
        },
        "start"
      )
      .to(
        pointLight,
        {
          intensity: 1,

          duration: 5,
          ease: "easeOut",
        },
        "start"
      )
      .to(
        stars.material,
        {
          size: 0.08,
          ease: "easeIn",
        },
        "start"
      )
      .to("#hero-text", { y: 0, opacity: 1, duration: 2 }, "start")
      .to("#calltoaction", { opacity: 1, duration: 2, delay: 1 }, "start");

    scene.add(mouseLight);

    started = true;
  }

  sphere.rotation.y -= 0.001;
  stars.rotation.y -= 0.0001;
  renderer.render(scene, camera);
};
const mouse = { x: undefined, y: undefined };

const initWebGl = () => {
  document.getElementById("hero").addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    mouseLight.position.set(mouse.x, mouse.y, 1);
  });
  animate();
};
export default initWebGl;
