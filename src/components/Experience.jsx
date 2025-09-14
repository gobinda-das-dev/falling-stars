import { OrbitControls } from '@react-three/drei'
import React from 'react'
import RotatingBox from './RotatingBox'
import Lines from './Lines'
import { button, useControls } from 'leva'
import { useThree } from '@react-three/fiber'

const ScreenshotHelper = () => {
  const gl = useThree((s) => s.gl)

  const takeScreenshot = () => {
    const canvas = gl.domElement
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'screenshot.png'
      link.click()
    }
  }

  useControls({
    takeScreenshot: button(takeScreenshot),
  })

  return null
}

const Experience = () => {
  const { noOfStars, depth, size, speed } = useControls({
    noOfStars: { value: 1000, min: 0, max: 100000 },
    depth: { value: 2, min: -10, max: 10 },
    size: { value: 5, min: 1, max: 100 },
    speed: { value: 1, min: 0, max: 10 },
  })

  return (
    <>
      <Lines nPoints={noOfStars} depth={depth} size={size} speed={speed} />
      <ScreenshotHelper />
      {/* <OrbitControls /> */}
    </>
  )
}

export default Experience