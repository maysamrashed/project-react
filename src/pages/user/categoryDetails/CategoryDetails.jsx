import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './CategoryDetails.module.css';

export default function CategoryDetails() {

  const [products,setProducts] = useState([]);
  const {categoryId} = useParams();
  const getProducts = async ()=>{
      const {data} = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
      console.log(data);
      setProducts(data.products);
  }
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <section className="products py-4">
      <div className="container">
        <h3 className="mb-4">Other Category</h3>
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="product card h-100 text-center p-3">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <Link className="btn btn-outline-primary" to={`/product/${product._id}`}>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )}
