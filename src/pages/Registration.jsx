import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    registerUser(data)
  };

  async function registerUser(data){
    const reqBody = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody)
    })

    const result = await response.json()
    if(result.success){
      toast.success("Registered successfully")
      navigate("/")
    }
  }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full px-4 py-2 mt-1 text-gray-800 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className={`w-full px-4 py-2 mt-1 text-gray-800 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required', minLength: 6 })}
              className={`w-full px-4 py-2 mt-1 text-gray-800 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-11 right-3 transform -translate-y-2/4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>


          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
