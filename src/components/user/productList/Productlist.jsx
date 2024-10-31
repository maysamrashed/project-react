import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import style from './Productlist.module.css';

export default function Productlist() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useContext(CartContext);

  const getProductList = async () => {
    const { data } = await axios.get('https://ecommerce-node4.onrender.com/products?page=1&limit=10');
    setProductList(data.products);
    setLoading(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <section className={style.productsList}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mt-5">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row g-4">
                {productList.map((product) => {
                  const productName = product.name.split(" ").slice(0, 2).join(" ");
                  return (
                    <div key={product._id} className="col-md-4 d-flex align-items-stretch">
                      <div className="card h-100">
                        <img
                          className="card-img-top"
                          src={product.mainImage?.secure_url || "default.jpg"}
                          alt={product.name}
                          style={{ height: '300px', objectFit: 'contain' }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{productName}</h5>
                          <p className="card-text">Price: ${product.price || 'N/A'}</p>
                          <div className="mt-auto d-flex justify-content-center">
                            <button
                              onClick={() => addToCart(product._id)}
                              className="btn me-2"
                              style={{ backgroundColor: 'black', color: 'white' }} 
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                width="20"
                                height="20"
                                style={{ fill: 'white', marginRight: '5px' }}
                              >
                                <path d="M528.12 301.319l47.273-208C580.858 81.71 572.19 64 557.315 64H140.057l-9.96-45.845C126.523 7.938 115.928 0 103.711 0H24C10.745 0 0 10.745 0 24c0 13.255 10.745 24 24 24h60.847l72.1 331.74c-20.169 10.764-34.719 32.305-34.719 57.26 0 35.346 28.654 64 64 64s64-28.654 64-64c0-6.375-1.008-12.541-2.884-18.396h201.768c-1.876 5.855-2.884 12.021-2.884 18.396 0 35.346 28.654 64 64 64s64-28.654 64-64c0-24.45-13.106-45.726-32.562-56.682 2.992-7.771 5.179-15.915 6.556-24.319zM183.389 352L153.055 192h346.682l-26.267 115.438c-7.328-1.562-14.832-2.438-22.47-2.438-52.935 0-96 43.065-96 96 0 5.543.539 10.979 1.365 16.286H198.025c.826-5.307 1.365-10.743 1.365-16.286 0-19.63-6.258-37.799-16.001-52.062zm343.747 56.286c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm-352 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16z" />
                              </svg>
                              Add to Cart
                            </button>
                            <Link to={`/product/${product._id}`} className="btn btn-primary">
                              View Product
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}