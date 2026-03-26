import React, { useState, useEffect, useRef } from 'react'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicked, setIsClicked] = useState(false)
  const rotationRef = useRef(0)
  const animationRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
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
  }, [])

  useEffect(() => {
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      const baseSpeed = 0.18
      const clickSpeed = 0.6
      const speed = isClicked ? clickSpeed : baseSpeed

      rotationRef.current += speed * deltaTime

      const cursor = document.getElementById('custom-cursor-triangle')
      if (cursor) {
        cursor.style.transform = `rotate(${rotationRef.current}deg)`
      }

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
      <div
        className='fixed pointer-events-none z-[9999]'
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-2px, -2px)',
        }}
      >
        <svg
          id='custom-cursor-triangle'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          style={{
            transformOrigin: '3px 3px',
          }}
        >
          <polygon
            points='0,0 12,6 0,12'
            fill='black'
          />
        </svg>
      </div>
    </>
  )
}

export default CustomCursor
