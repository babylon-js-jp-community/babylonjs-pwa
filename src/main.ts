import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { CascadedShadowGenerator } from "@babylonjs/core/Lights/Shadows/cascadedShadowGenerator";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Rendering/depthRendererSceneComponent";
import { Scene } from "@babylonjs/core/scene";
import { SkyMaterial } from '@babylonjs/materials';
import { registerSW } from "virtual:pwa-register";

async function main() {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    const light = new DirectionalLight("MainLight", new Vector3(0, -15, 12), scene);
    const camera = new ArcRotateCamera("MainCamera", 0, Math.PI / 4, 10, Vector3.Zero(), scene);
    camera.attachControl(true);
    const skyMat = new SkyMaterial("SkyMat", scene);
    skyMat.azimuth = 0.25;
    skyMat.inclination = 0.15;
    skyMat.luminance = 0.8;
    skyMat.mieCoefficient = 0.015;
    skyMat.mieDirectionalG = 0.9;
    skyMat.rayleigh = 1.2;
    skyMat.turbidity = 7.0;
    skyMat.cullBackFaces = false;
    const skyMesh = MeshBuilder.CreateBox("SkyBox", { size: 1000, updatable: false }, scene);
    skyMesh.infiniteDistance = true;
    skyMesh.material = skyMat;

    const sphereMesh = MeshBuilder.CreateSphere("SphereMesh", {diameter: 2, segments: 32}, scene);
    sphereMesh.position.y = 1;
    const ground = MeshBuilder.CreateTiledGround("GroundMesh", { xmin: -10, zmin: -10, xmax: 10, zmax: 10 }, scene);
    ground.receiveShadows = true;

    const shadow = new CascadedShadowGenerator(1024, light);
    shadow.autoCalcDepthBounds = true;
    shadow.addShadowCaster(sphereMesh);

    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener("resize", () => {
        engine.resize();
    });
}

// entry
registerSW({ immediate: true });
window.addEventListener("load", main);
