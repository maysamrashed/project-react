import { useFormik } from 'formik';
import React from 'react';
import axios from "axios";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../shoping-image/Shoping.avif';


export default function Register() {

  const navigate = useNavigate(); 

  const schema = yup.object({
    userName: yup.string().required().min(3).max(50), 
    email: yup.string().required().min(5).max(90).email(),
    password: yup.string().required().min(8).max(20),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: RegisterUser,
    validationSchema: schema
  });

  async function RegisterUser() {
   
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, formik.values);
      console.log(data);

      if (data.message === 'success') {
        
        localStorage.setItem('userToken', data.token);
       
        localStorage.setItem('userName', formik.values.userName);

        navigate('/home'); 
      } else {
        console.error('Registration failed:', data.message); 
      }
    } 
  
  return (
    <>
       <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='container w-25' style={{
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-dark mb-4 text-center">تسجيل</h2>
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              name='userName'
              id="userName"
              value={formik.values.userName}
              placeholder=" "
            />
            <label htmlFor="userName">User Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              onChange={formik.handleChange}
              name='email'
              id="email"
              value={formik.values.email}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              onChange={formik.handleChange}
              name='password'
              id="password"
              value={formik.values.password}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type='submit' className='btn btn-outline-info w-100 text-black'>Register</button>
        </form> 
      </div>
    </div>
    </>
  );
}