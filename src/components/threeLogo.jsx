import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { useEffect, useRef } from "react";

const ThreeLogo = () => {
  const containerRef = useRef(null);
  let scene, camera, renderer, pageX, pageY;

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    pageX = 0.5;
    pageY = 0.5;

    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    containerRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    camera.position.z = 20;

    let directLight = new THREE.DirectionalLight("#333", 4);
    directLight.position.set(0, 7, 5);
    scene.add(directLight);

    var light = new THREE.AmbientLight(0x000000);
    scene.add(light);

    var loader = new FontLoader();
    loader.load("media/typography/Anurati_Regular.json", function (font) {
      var geometry = new TextGeometry("CHATTY", {
        font: font,
        size: 7,
        height: 0.5,
        curveSegments: 2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelSegments: 3,
      });
      geometry.center();
      var material = new THREE.MeshPhongMaterial({
        color: "#dbe4eb",
        specular: "#dbe4eb",
      });
      var mesh = new THREE.Mesh(geometry, material);
      mesh.name = "myText";

      scene.add(mesh);
      animate();
    });

    document.body.addEventListener("mousemove", (event) => {
      pageX = event.pageX / window.innerWidth;
      pageY = event.pageY / window.innerHeight;

      const maxShift = 0.03;
      pageX = Math.min(0.5 + maxShift, Math.max(0.5 - maxShift, pageX));
      pageY = Math.min(0.5 + maxShift, Math.max(0.5 - maxShift, pageY));
    });

    return () => {
      window.removeEventListener("resize", () => {});
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    const targetRotationX = (pageY - 0.5) * 2;
    const targetRotationY = (pageX - 0.5) * 2;
    scene.getObjectByName("myText").rotation.x +=
      (targetRotationX - scene.getObjectByName("myText").rotation.x) * 0.05;
    scene.getObjectByName("myText").rotation.y +=
      (targetRotationY - scene.getObjectByName("myText").rotation.y) * 0.01;
    renderer.render(scene, camera);
  }

  return <div ref={containerRef} className="w-100"></div>;
};

export default ThreeLogo;
