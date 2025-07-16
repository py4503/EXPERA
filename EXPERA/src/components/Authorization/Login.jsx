import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/AuthService';
import { login } from '../../store/authSlice';

function Login() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async(data) => {
        try {
            const session = await authService.login(data);
            
            if(session){
                const user = await authService.getCurrentUser();

                if(user){
                    dispatch(login(data))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
            console.log("Error while Logging in! ::", error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 px-6 py-12">
        
        {/* Left - Login Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Welcome Back
          </h2>
          <Link to={'/signup'}>
          <div>
            dont have an account?
          </div>
          </Link>
          <div>
            {error}
          </div>
          <form onSubmit={handleSubmit(Login)}  className="space-y-6">
            {/* <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div> */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                    required:true,
                    validate:{matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid"}
                })}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required:true,
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

export default Login
