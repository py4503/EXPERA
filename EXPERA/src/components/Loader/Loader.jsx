import React from 'react'
import Lottie from 'lottie-react'
import Loading from '../../assets/Blocks.json'

function Loader() {
  return (
    <div className='flex items-center max-w-full justify-center min-h-screen'>
        <div className='w-40 h-40'>
        <Lottie animationData={Loading} loop/>
        </div>
    </div>
  )
}

export default Loader
