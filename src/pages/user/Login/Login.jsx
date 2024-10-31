import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../../shoping-image/Shoping.avif';
export default function Login() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const schema = yup.object({
    email: yup.string().required().min(5).max(90).email(),
    password: yup.string().required().min(8).max(20),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: LoginUser,
    validationSchema: schema
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/home'); 
    }
  }, [navigate]);

  async function LoginUser() {
    
    try {
      const { data } = await axios.post(`https://ecommerce-node4.onrender.com/auth/signin`, formik.values);
      console.log('Response data:', data);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        navigate('/home'); 
      } else {
        setErrorMessage('Login failed: Invalid email or password'); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred while trying to log in. Please try again later.');
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
      <div className="login-box p-4 text-center" style={{
          
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-dark mb-4">تسجيل الدخول</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control text-dark"
              onChange={formik.handleChange}
              name='email'
              id="email"
              value={formik.values.email}
              placeholder=" "
            />
            <label htmlFor="email" className="text-dark">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control text-dark"
              onChange={formik.handleChange}
              name='password'
              id="password"
              value={formik.values.password}
              placeholder=" "
            />
            <label htmlFor="password" className="text-dark">Password</label>
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type='submit' className='btn btn-outline-info text-dark'>Login</button>
          <Link className='forget-password text-dark' to='/forget-password'>Forget-Password</Link>
        </form>
      </div>
    </div>
    </>
  );
}