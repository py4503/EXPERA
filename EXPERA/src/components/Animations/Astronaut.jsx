import React from 'react'
import Lottie from 'lottie-react'
import astronaut from '../../assets/astronaut_hi.json'

function Astronaut() {
  return (
    <div>
      <Lottie
        animationData={astronaut}
        loop
      />
    </div>
  )
}

export default Astronaut
