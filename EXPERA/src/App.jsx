import { useState } from 'react'
import './App.css'
import RealTimeEditor from './components/Editor/RealTimeEditor'
import { useForm } from 'react-hook-form'

function App() {
  const [count, setCount] = useState(0)
  const {control} = useForm();
  return (
    <>
    <div className='w-2xl rounded-2xl overflow-hidden border-2'>
    <RealTimeEditor control={control}/>
    </div>
    </>
  )
}

export default App
