import React from 'react'

function Navbar() {
  return (
    <nav className='w-full py-4 px-6 flex justify-between items-center fixed top-0 left-0 bg-black/40 backdrop-blur-sm'>
        <h2 className='text-white text-2xl font-bold'>TENSIONADO FITNESS GYM</h2>

        <div className='flex gap-10 text-white font-semibold'>
            <a>Home</a>
            <a>Program</a>
            <a>About</a>
        </div>


    </nav>
  )
}

export default Navbar