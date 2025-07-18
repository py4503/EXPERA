import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header, Loader } from './components'
import authService from './appwrite/AuthService';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((user) => {
      if(user){
      dispatch(login(user))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => console.log("APP :: ",error))
    .finally(() => setLoading(false))
  }, [])
  return !loading? (
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    </>
  ) : (<Loader/>)
}

export default App
