import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/AuthService';
import { login } from '../../store/authSlice';
import { Link } from 'react-router-dom';
import { Input, Button } from '../index'
import Astronaut from '../Animations/Astronaut';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (data) => {
    try {
      const session = await authService.login(data);

      if (session) {
        const user = await authService.getCurrentUser();

        if (user) {
          dispatch(login(user))
          navigate('/')
        }
      }
    } catch (error) {
      setError(error.message)
      console.log("Error while Logging in! ::", error)
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
              Back to Your World of Words
            </h2>
            <p className="mt-2 text-gray-500">
              Log in to revisit your reflections or share new perspectives!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter you email..."
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                {...register('email', {
                  required: true,
                  validate: { matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter valid email address" }
                })}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password..."
                className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                {...register('password', {
                  required: true,
                })}
              />
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
              >
                login
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <Astronaut />
      </div>
    </div>
  );
}

export default Login
