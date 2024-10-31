import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const getcart = async () => {

    const token = localStorage.getItem('userToken');

    const { data } = await axios.get(`https://ecommerce-node4.onrender.com/cart`, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log('Products:', data.products);
    setCartItems(data.products);
  }
  const increaseqty = async (productId) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`, {
      productId: productId
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
    getcart();
  }
  const decreaseqty = async (productId) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/decraseQuantity`, {
      productId: productId
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
    getcart();
  }
  const removeItem = async (productId) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`, {
      productId: productId
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
    getcart();
  }

  const clearCart = async () => {
    const token = localStorage.getItem('userToken');

    const { data } = await axios.patch(`https://ecommerce-node4.onrender.com/cart/clear`, {}, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
    getcart();
  };
  useEffect(() => {
    getcart();
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 text-center mt-5'>
          < table className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th>Product</th>
                <th>name</th>
                <th>Availability</th>
                <th>Price</th>
                <th>Decrease qty</th>
                <th>Quantity </th>
                <th>Increase qty</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <img src={item.details?.mainImage?.secure_url} alt={item.details?.name} width="80" height="80" />
                  </td>
                  <td>{item.details?.name.split(' ').slice(0, 2).join(' ')}</td>
                  <td>{item.details?.stock ? 'Available' : 'Out of Stock'}</td>
                  <td>{item.details?.price}</td>
                  <td>
                    <button
                      onClick={() => decreaseqty(item.productId)}
                      className="btn btn-primary btn-sm"
                    >
                      -
                    </button>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      onClick={() => increaseqty(item.productId)}
                      className="btn btn-primary btn-sm"
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <svg
                      onClick={() => removeItem(item.productId)}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="20"
                      height="20"
                      style={{ cursor: 'pointer', fill: 'red' }}
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={clearCart} className="btn btn-warning mb-3 me-3" style={{ color: 'black' }}>
            Clear Cart
          </button>
          <Link to={`/check`} className="btn btn-warning mb-3" style={{ color: 'black' }}>
            Check-Order
          </Link>
        </div>
      </div>
    </div>
  )
}
