import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import style from './Navbar.module.css';
export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));
  const { cart } = useContext(CartContext);
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="container">
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">M-Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="btn btn-success position-relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24" style={{ fill: 'white' }}>
                      <path d="M528.12 301.319l47.273-208C580.858 81.71 572.19 64 557.315 64H140.057l-9.96-45.845C126.523 7.938 115.928 0 103.711 0H24C10.745 0 0 10.745 0 24c0 13.255 10.745 24 24 24h60.847l72.1 331.74c-20.169 10.764-34.719 32.305-34.719 57.26 0 35.346 28.654 64 64 64s64-28.654 64-64c0-6.375-1.008-12.541-2.884-18.396h201.768c-1.876 5.855-2.884 12.021-2.884 18.396 0 35.346 28.654 64 64 64s64-28.654 64-64c0-24.45-13.106-45.726-32.562-56.682 2.992-7.771 5.179-15.915 6.556-24.319zM183.389 352L153.055 192h346.682l-26.267 115.438c-7.328-1.562-14.832-2.438-22.47-2.438-52.935 0-96 43.065-96 96 0 5.543.539 10.979 1.365 16.286H198.025c.826-5.307 1.365-10.743 1.365-16.286 0-19.63-6.258-37.799-16.001-52.062zm343.747 56.286c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm-352 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16z" />
                    </svg>
                    {cart.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>

          {isLoggedIn && (
            <div className="d-flex align-items-center">
            <Link to="/userProfile" className="btn btn-outline-primary me-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z" />
            </svg>
          </Link>
            <button className="btn btn-success" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </button>
          </div>
          )}
        </div>
      </div>
    </nav>
  </div>
);
}