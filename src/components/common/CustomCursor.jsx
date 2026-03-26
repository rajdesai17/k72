import React, { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isClicked, setIsClicked] = useState(false)
  const rotationRef = useRef(0)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 400 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => {
      setIsClicked(true)
    }

    const handleMouseUp = () => {
      setTimeout(() => {
        setIsClicked(false)
      }, 300)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  useEffect(() => {
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      const baseSpeed = 0.18
      const clickSpeed = 0.6
      const speed = isClicked ? clickSpeed : baseSpeed

      rotationRef.current += speed * deltaTime
      setRotation(rotationRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isClicked])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className='fixed pointer-events-none z-[9999]'
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-4px',
          translateY: '-4px',
        }}
      >
        <motion.svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          style={{
            transformOrigin: '5px 5px',
            rotate: rotation,
          }}
        >
          {/* Orange border (outermost) */}
          <polygon
            points='0,0 22,11 0,22'
            fill='none'
            stroke='#FF6B00'
            strokeWidth='2'
            transform='translate(3, 3)'
          />
          {/* Green border */}
          <polygon
            points='0,0 18,9 0,18'
            fill='none'
            stroke='#00C853'
            strokeWidth='2'
            transform='translate(3, 3)'
          />
          {/* White border */}
          <polygon
            points='0,0 14,7 0,14'
            fill='none'
            stroke='white'
            strokeWidth='2'
            transform='translate(3, 3)'
          />
          {/* Black fill (innermost) */}
          <polygon
            points='0,0 10,5 0,10'
            fill='black'
            transform='translate(3, 3)'
          />
        </motion.svg>
      </motion.div>
    </>
  )
}

export default CustomCursor
