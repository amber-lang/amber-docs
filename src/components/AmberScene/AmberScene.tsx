"use client"

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import style from "./AmberScene.module.css";

function Scene() {
    const amberModel = useGLTF("/internal/amber.glb");
    const light = useRef(null);
    const amberRef = useRef(null);
    let frame = 0;

    useFrame(() => {
        const amber: Mesh = amberRef.current!;
        amber.rotation.y -= 0.01;
        frame++;
        amber.position.y = Math.sin(frame / 50) / 8;
        if (frame < 100) {
            // Increase scale logarithmically based on frame
            const factor = Math.log(frame) / 4.6;
            amber.scale.set(factor, factor, factor);
        }
    });

    return (
        <>
            <ambientLight intensity={3} />
            <pointLight
                ref={light}
                position={[-1, 1.6, 1]}
                intensity={5}
                color="#FFF380"
            />
            <primitive
                object={amberModel.scene}
                ref={amberRef}
                position={[0.05, 0, 0]}
                scale={0.001}
            />
            <EffectComposer>
                <Bloom mipmapBlur luminanceThreshold={0.3} intensity={2} />
            </EffectComposer>
        </>
    );
}

export default function AmberScene() {
    return (
        <div className={style.amber}>
            <Canvas camera={{ position: [0, 0, 20] }}>
                <Scene />
            </Canvas>
        </div>
    )
}
