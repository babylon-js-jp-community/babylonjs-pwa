import { registerSW } from "virtual:pwa-register";
import * as BABYLON from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';

import "pepjs";

async function main() {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);

    const light = new BABYLON.DirectionalLight("MainLight", new BABYLON.Vector3(0, -15, 12), scene);
    const camera = new BABYLON.ArcRotateCamera("MainCamera", 0, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
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
    const skyMesh = BABYLON.MeshBuilder.CreateBox("SkyBox", { size: 1000, updatable: false }, scene);
    skyMesh.infiniteDistance = true;
    skyMesh.material = skyMat;

    const sphereMesh = BABYLON.MeshBuilder.CreateSphere("SphereMesh", {diameter: 2, segments: 32}, scene);
    sphereMesh.position.y = 1;
    const ground = BABYLON.MeshBuilder.CreateTiledGround("GroundMesh", { xmin: -10, zmin: -10, xmax: 10, zmax: 10 }, scene);
    ground.receiveShadows = true;

    const shadow = new BABYLON.CascadedShadowGenerator(1024, light);
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
registerSW();
window.addEventListener("load", main);
