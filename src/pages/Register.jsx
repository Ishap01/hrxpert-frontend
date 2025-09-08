import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
//import signup_img  from '../assets/signup_img.png'
//import img11  from '../assets/img11.png'
//import hr22 from '../assets/hr22.png'
import hr11 from '../assets/hr11.png'
import { useState } from 'react';
//import hr33 from '../assets/hr33.png'
//import img22  from '../assets/img22.png'
const Register = () => {
  const navigate = useNavigate();
  const[error, setError] = useState("")
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    role: Yup.string().oneOf(['Employee', 'HR', 'Admin']).required('Role is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, values);
      alert("Registration successful! Redirecting to login...");
      resetForm();
      navigate('/login');
    } catch (err) {
      if(err.response && err.response.status ===400){
        setError(err.response.data.message); 
      }
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-400 to-cyan-300 px-4 py-6 sm:py-8">
      <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 w-full max-w-5xl overflow-hidden">
        
        {/* Left Side - Illustration or Message */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-teal-500 to-cyan-400 p-6 md:p-10">
          <div className="text-white text-center space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">Welcome to HR Xpert</h2>
            <p className="text-sm md:text-lg">Join us and simplify your employee management!</p>
            <img src={hr11} alt="Register" className="max-w-xs md:max-w-md mx-auto mt-4 bg-transparent" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-600 mb-6">Create Your Account</h2>

          <Formik
            initialValues={{ name: '', email: '', password: '', role: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              {/* Name */}
                {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="relative">
                <UserIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                <Field
                  name="name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                  placeholder="Full Name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                <Field
                  name="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Email Address"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                <Field
                  name="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Role */}
              <div>
                <Field
                  as="select"
                  name="role"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select Role</option>
                  <option value="Employee">Employee</option>
                 
                  <option value="Admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] shadow text-sm sm:text-base"
              >
                Register
              </button>
            </Form>
          </Formik>

          {/* Login Link */}
          <p className="text-center text-xs sm:text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-600 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
