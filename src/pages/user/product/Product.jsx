import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import style from './Product.module.css';
import { CartContext } from '../../../context/CartContext';

export default function Product() {

  const [product, setProduct] = useState([]);
  
  const [productImages, setProductImages] = useState([]);
  
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const getProduct = async () => {
  
    const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`);
    setProduct(data.product);
    setProductImages(data.product.subImages);
  
  }
  
  useEffect(() => {
    getProduct();
  }, [])

  return (

    <section className={` container py-4`}>
      <div className="row">
        <div className="col-md-8">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          {product.mainImage && (
            <img className="img-fluid" src={product.mainImage.secure_url} alt="Main Product Image" />
          )}
        </div>

        {productImages.map((img, index) => (
          <div key={index} className="col-md-2 col-6 mb-3">
            <img className="img-fluid" src={img.secure_url} alt="Product Image" />
          </div>
        ))}
      </div>

      <div className="row">
        <div className={`prod-details d-flex flex-wrap p-3 gap-3 fs-5 ${style.prodDetails}`}>
          <div className="col-md-3">
            <h5>Stock</h5>
            <span>{product.stock}</span>
          </div>
          <div className="col-md-3">
            <h5>Price</h5>
            <span>{product.price}</span>
          </div>
          <div className="col-md-3">
            <h5>Discount</h5>
            <span>{product.discount}</span>
          </div>
          <div className="col-md-3">
            <h5>Price After Discount</h5>
            <span>{product.finalPrice}</span>
          </div>
        </div>
      </div>

      <div
        onClick={() => addToCart(product._id)}
        className="btn btn-dark mt-3 d-inline-flex align-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="24"
          height="24"
          style={{ fill: 'white', marginRight: '8px' }}
        >
          <path d="M528.12 301.319l47.273-208C580.858 81.71 572.19 64 557.315 64H140.057l-9.96-45.845C126.523 7.938 115.928 0 103.711 0H24C10.745 0 0 10.745 0 24c0 13.255 10.745 24 24 24h60.847l72.1 331.74c-20.169 10.764-34.719 32.305-34.719 57.26 0 35.346 28.654 64 64 64s64-28.654 64-64c0-6.375-1.008-12.541-2.884-18.396h201.768c-1.876 5.855-2.884 12.021-2.884 18.396 0 35.346 28.654 64 64 64s64-28.654 64-64c0-24.45-13.106-45.726-32.562-56.682 2.992-7.771 5.179-15.915 6.556-24.319zM183.389 352L153.055 192h346.682l-26.267 115.438c-7.328-1.562-14.832-2.438-22.47-2.438-52.935 0-96 43.065-96 96 0 5.543.539 10.979 1.365 16.286H198.025c.826-5.307 1.365-10.743 1.365-16.286 0-19.63-6.258-37.799-16.001-52.062zm343.747 56.286c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm-352 0c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16z" />
        </svg>
        Add to Cart
      </div>
    </section>
  )
}