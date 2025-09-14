import { useFrame, useThree } from '@react-three/fiber'
import React from 'react'
import { useMemo } from 'react'
import vertexShader from '../../shaders/lines/vertex.glsl'
import fragmentShader from '../../shaders/lines/fragment.glsl'
import { useEffect } from 'react'
import { Vector2 } from 'three'
import { lerp } from 'three/src/math/MathUtils'

const Lines = ({ nPoints = 1000, depth = 2.0, size = 5, speed = 1.0 }) => {
  const viewport = useThree(s => s.viewport);
  
  const data = useMemo(() => {
    const position = [];
    const random = [];

    for (let i = 0; i < nPoints; i++) {
      const x = (Math.random() - 0.5);
      const y = (Math.random() - 0.5);
      const z = (Math.random() - 0.5);

      position.push(x, y, z);
      random.push(Math.random());
    }

    return {
      position,
      random
    };
  }, [nPoints]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uViewPort: { value: new Vector2() },
    uSize: { value: size },
    uMouse: { value: new Vector2() },
    uDepth: { value: depth }
  }), []);

  useEffect(() => {
    uniforms.uViewPort.value.x = viewport.width;
    uniforms.uViewPort.value.y = viewport.height;
  }, [viewport]);

  useEffect(() => {
    uniforms.uDepth.value = depth;
    uniforms.uSize.value = size;
  }, [depth, size])

  useFrame(({ clock, mouse, viewport }) => {
    const time = clock.elapsedTime;

    uniforms.uTime.value = time * speed;

    uniforms.uMouse.value.x = mouse.x * viewport.width * 0.5;
    uniforms.uMouse.value.y = mouse.y * viewport.height * 0.5;
  })
  
  return (
    <points>
      <bufferGeometry key={nPoints}>
        <bufferAttribute
          attach="attributes-position"
          count={nPoints}
          array={new Float32Array(data.position)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={nPoints/3}
          array={new Float32Array(data.random)}
          itemSize={1}
        />
      </bufferGeometry>
      {/* <pointsMaterial size={0.1} color="white" /> */}

      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthFunc={false}
      />
    </points>
  )
}

export default Lines
