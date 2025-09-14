import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './Experience'

const Scene = () => {
  return (
    <div id="canvas">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <Experience />
      </Canvas>

      <p
        style={{
          position: 'fixed',
          bottom: 10,
          left: 10,
          color: 'white'
        }}
      >
        created by <a href="https://www.gobinda-das.dev/">gobinda</a> here's the <a href="https://github.com/gobinda-das-dev/falling-stars">repo</a>
      </p>
    </div>
  )
}

export default Scene
