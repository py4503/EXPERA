import { useState } from 'react'
import './App.css'
import RealTimeEditor from './components/Editor/RealTimeEditor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-2xl'>
    <RealTimeEditor/>
    </div>
    </>
  )
}

export default App
