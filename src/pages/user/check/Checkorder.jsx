import axios from 'axios';
import { useFormik } from 'formik';
import backgroundImage from '../../../shoping-image/Shoping.avif';
import { Link } from 'react-router-dom';


export default function CheckOrder() {

    const formik = useFormik({
        initialValues: {
            couponName: '',
            address: '',
            phone: '',
        },
        onSubmit: async (values) => {
            await handleCheckOrder(values);
        },
    });

    const handleCheckOrder = async (values) => {
        const token = localStorage.getItem('userToken');

        const { data } = await axios.post(`https://ecommerce-node4.onrender.com/order`, {
            couponName: values.couponName || null,
            address: values.address,
            phone: values.phone,
        }, {
            headers: {
                Authorization: `Tariq__${token}`,
            },
        });
        console.log(data);
        alert("Order placed successfully!");
    }


    return (
        <div className="container d-flex align-items-center justify-content-center"
            style={{
                height: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="text-center w-25">
                <h2 className='mt-3 mb-4'>Place Order</h2>
                <form onSubmit={formik.handleSubmit} className="form-group">
                    <input
                        type="text"
                        placeholder="Discount Code (optional)"
                        {...formik.getFieldProps('couponName')}
                        className="form-control mb-3 form-control-sm"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        {...formik.getFieldProps('address')}
                        className="form-control mb-3 form-control-sm"
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="text-danger">{formik.errors.address}</div>
                    ) : null}
                    <input
                        type="text"
                        placeholder="Phone Number"
                        {...formik.getFieldProps('phone')}
                        className="form-control mb-3 form-control-sm"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                    ) : null}
                    <button type="submit" className="btn btn-success mt-4">Submit Order</button>

                </form>

                <Link to="/all-orders" className="btn btn-primary mt-4">
                    View All Orders
                </Link>
            </div>
        </div>
    );

}