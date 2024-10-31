import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AllOrders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const token = localStorage.getItem('userToken');

        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`, {
            headers: {
                Authorization: `Tariq__${token}`,
            },
        });
        setOrders(data.orders);
        console.log("User orders:", data.orders);
    };
   
    

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container">
            <h2>User Orders</h2>
            {orders.length > 0 ? (
                <ul className="list-group">
                    {orders.map((orders) => (
                        <li key={orders._id} className="list-group-item">
                            <p>Order ID:{orders._id}</p>
                            <p>Status:{orders.status}</p>
                            <p>Address: {orders.address}</p>
                            <p> Payment Type: {orders.paymentType}</p>
                            <p>Phone Number:{orders.finalPrice}</p>
                            <p>Created At: {new Date(orders.createdAt).toLocaleString()}</p>
                           
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}