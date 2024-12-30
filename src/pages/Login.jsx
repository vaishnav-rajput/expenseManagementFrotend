import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import {toast} from "react-hot-toast";
import axios from 'axios';
import { store } from '../redux/store';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    loginUser(data)
  };

  async function loginUser(data) {
    const reqBody = {
        email: data.email,
        password: data.password,
    };

    try {
        const response = await axios.post('http://localhost:4000/login', reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true, // Include cookies if required
        });
       
        if (response.data.success) {
          dispatch(setUser(response.data.user));
        }
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required'})}
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
