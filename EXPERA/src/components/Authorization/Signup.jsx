import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../../store/authSlice'
import authService from '../../appwrite/AuthService'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Input, Button} from '../index'

function Signup() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const handleSignup = async(data) => {
        setError('')
       try {
         if(data){
             const session = await authService.createAccount(data)
            // .createAccount will give session Id
            console.log("Signup data ::",data);
            console.log("Signup :: session ::", session);
             if(session){
                const user = await authService.getCurrentUser(session);
                if(user){
                dispatch(storeLogin(session));
                navigate('/')
                }
             }
         }
       } catch (error) {
        console.log("Error while signing up :: Signup() ");
        setError(error.message)
       }
    }
   return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12">
        
        {/* Left - Login Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Welcome!
          </h2>
          <Link to={'/login'}>
          <div>
            already have an account?
          </div>
          </Link>
          <div>
            {error && <span className='text-red-800'>{error}</span>}
          </div>
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <Input type = "text" placeholder = "Enter your name" label = ""
                {...register("name", {
                    required:true
                })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <Input type = "text" placeholder = "email" label = ""
                {...register("email", {
                    required:true,
                    validate:{matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter valid email address"}
                })}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <Input type = "password" placeholder = "password" label = "password"
              {...register("password",{
                required:true
              })}
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 mt-4 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition"
            >
              Login
            </Button>
          </form>
        </div>

        {/* Right - Image Placeholder */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://www.apple.com/v/siri/compare/images/overview/compare_siri_apple_watch__fcw5cpaymj6y_large.jpg"
            alt="Siri Preview"
            className="rounded-xl shadow-xl max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup
