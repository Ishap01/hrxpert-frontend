
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import loginVector from '../assets/login_vector.jfif';
import { useAuth } from '../context/authContext';
const Login = () => {
  const navigate = useNavigate();
    const {login} = useAuth(); 
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', values);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log(localStorage.getItem('user'))
        login(user);
      alert('Login successful');

      if (user.role === 'HR') navigate('/hr-dashboard');
      else if (user.role === 'Admin') navigate('/admin-dashboard');
      else navigate('/employee-dashboard');
    } catch (err) {
      if (err.response?.data?.error) {
        setFieldError('email', err.response.data.error);
      } else {
        alert('Server error');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-400 flex flex-col items-center">
      {/* Header */}
      <header className="w-full text-white text-3xl font-bold py-6 px-10">
        HR Xpert
      </header>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mt-10 w-full max-w-md mx-auto flex flex-col items-center">
        <img src={loginVector} alt="login vector" className="w-20 h-20 mb-4" />
        <h2 className="text-2xl font-semibold mb-6 text-teal-600">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-4">
              {/* Email */}
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-teal-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
