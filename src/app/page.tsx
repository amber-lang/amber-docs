'use client'

import style from './page.module.css'
import { getTableOfContents } from '@/utils/docs'
import SideBar from '@/components/SideBar/SideBar'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar/SearchBar'
import Sheet from '@/components/Sheet/Sheet'
import SettingsGrid from '@/components/SettingsGrid/SettingsGrid'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Mesh } from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'  


function Scene() {
  const amberModel = useGLTF('/internal/amber.glb')
  const light = useRef(null)
  const amberRef = useRef(null)
  let frame = 0;

  useFrame(() => {
    const amber: Mesh = amberRef.current!
    amber.rotation.y -= 0.01
    frame++;
    amber.position.y = Math.sin(frame / 50) / 8
    if (frame < 100) {
      // Increase scale logarithmically based on frame
      const factor = Math.log(frame) / 4.6
      amber.scale.set(factor, factor, factor)
    }
    
  })

  return (
    <>
      <ambientLight intensity={3} />
      <pointLight ref={light} position={[-1, 1.6, 1]} intensity={5} color='#FFF380' />
        <primitive object={amberModel.scene} ref={amberRef} position={[0.05, 0, 0]} scale={0.001} />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.3} intensity={2} />
      </EffectComposer>
    </>
  )
}

export default function Post() {
  const [toc] = getTableOfContents()

  return (
    <>
      <div className='left'>
        <SideBar headers={[]} isFixed />
      </div>
      <div className='right'>
        <div className={style.container}>
          <div className={style.jumbotron}>
            <div className={style['jumbotron-bg']} />
            <Suspense>
              <div className={style.amber}>
                <Canvas camera={{ position: [0, 0, 20] }}>
                  <Scene />
                </Canvas>
              </div>
            </Suspense>
          </div>
          <div className={style.title}>
            <span className={style.bold}>Amber</span>
            <span className={style.light}>Docs</span>
          </div>
          <div className={style.search}>
            <SearchBar variant='title' />
          </div>
          <Link href={toc.path} className={style['big-link']}>
            {toc.title}
          </Link>
        </div>
      </div>
      <Sheet>
        <SideBar headers={[]} />
        <SettingsGrid />
      </Sheet>
    </>
  )
}
