import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../../store/authSlice'
import authService from '../../appwrite/AuthService'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Input, Button} from '../index'
import Astronaut from '../Animations/Astronaut'

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
            // console.log("Signup data ::",data);
            // console.log("Signup :: session ::", session);
             if(session){
                const user = await authService.getCurrentUser(session);
                if(user){
                dispatch(storeLogin(session));
                navigate('/')
                }
             }
             else{
              setError("An account with this email/username already exists.")
             }
         }
       } catch (error) {
        console.log("Error while signing up :: Signup() ");
        setError(error.message)
       }
    }
    return (
      <div className="flex w-full h-[calc(100vh-4rem)]">
        {/* Left Section: Form */}
        <div className="w-1/2 px-8 flex justify-center items-center">
          <div className="max-w-md w-full space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Your Words Deserve the World!
              </h2>
              <p className="mt-2 text-gray-500">
                Sign up and become part of a community that celebrates experiences, thoughts, and honest writing.
              </p>
            </div>
  
            {/* error */}
            <p className='text-red-700'>{error}</p>
            {/* Form */}
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter you name..."
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                  {...register('name', {
                    required:true,
                  })}
                />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                  {...register('email', {
                    required:true,
                    validate:{matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter valid email address"}
                  })}
                />
              </div>
  
              {/* password */}
              <div>
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                  {...register('password',{
                    required:true
                  })}
                />
              </div>
  
              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="#" className="text-blue-500 underline hover:text-blue-600">
                    Terms & Conditions
                  </Link>
                </label>
              </div>
  
              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
  
        {/* Right Section: Image */}
        <div className="w-1/2 bg-gray-100 flex justify-center items-center">
          <Astronaut/>
        </div>
      </div>
    );
}

export default Signup
