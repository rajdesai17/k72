import React, { useContext, useRef } from 'react'
import { NavbarColorContext, NavbarContext } from '../../context/NavContext'

const Navbar = () => {

    const navGreenRef = useRef(null)
    const [navOpen,setNavOpen] = useContext(NavbarContext)
    const [navColor, setNavColor] = useContext(NavbarColorContext)

    return (
        <div className='z-4 flex fixed top-0 w-full items-start justify-between'>
            <div className='lg:p-5 p-2 '>
                <div className='lg:w-36 w-24'>
                    <svg className='w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
                        {/* Pixelated K */}
                        <rect fill={navColor} x="0" y="0" width="8" height="40"/>
                        <rect fill={navColor} x="8" y="16" width="8" height="8"/>
                        <rect fill={navColor} x="16" y="8" width="8" height="8"/>
                        <rect fill={navColor} x="16" y="24" width="8" height="8"/>
                        <rect fill={navColor} x="24" y="0" width="8" height="8"/>
                        <rect fill={navColor} x="24" y="32" width="8" height="8"/>
                        {/* Pixelated 7 */}
                        <rect fill={navColor} x="40" y="0" width="32" height="8"/>
                        <rect fill={navColor} x="64" y="8" width="8" height="8"/>
                        <rect fill={navColor} x="56" y="16" width="8" height="8"/>
                        <rect fill={navColor} x="48" y="24" width="8" height="16"/>
                        {/* Pixelated 2 */}
                        <rect fill={navColor} x="80" y="0" width="32" height="8"/>
                        <rect fill={navColor} x="104" y="8" width="8" height="8"/>
                        <rect fill={navColor} x="80" y="16" width="32" height="8"/>
                        <rect fill={navColor} x="80" y="24" width="8" height="8"/>
                        <rect fill={navColor} x="80" y="32" width="32" height="8"/>
                    </svg>
                </div>
            </div>
            <div onClick={()=>{
                setNavOpen(true)
            }} onMouseEnter={() => {
                navGreenRef.current.style.height = '100%'
            }}
                onMouseLeave={() => {
                    navGreenRef.current.style.height = '0%'
                }}
                className='lg:h-16 h-10 bg-black relative lg:w-[16vw] w-48'>
                <div ref={navGreenRef} className='bg-[#D3FD50] transition-all absolute top-0 h-0 w-full'></div>
                <div className='relative h-full lg:px-12 px-8 flex flex-col justify-center items-end lg:gap-1.5 gap-0.5'>
                    <div className="lg:w-18 w-12 h-0.5 bg-white"></div>
                    <div className="lg:w-10 w-6 h-0.5 bg-white"></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
