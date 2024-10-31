import axios from 'axios';
import { useFormik } from 'formik';
import backgroundImage from '../../../shoping-image/Shoping.avif';


export default function code({ email }) {
    const formik = useFormik({
        initialValues: {
            email: ' ',
        },
        onSubmit: SendCode
    })
    async function SendCode() {
        const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/auth/sendcode`, formik.values);
        console.log(data);
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
            <div className="container w-25" style={{
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <form onSubmit={formik.handleSubmit}>
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
                    <button type='submit' className='btn btn-outline-info w-100'>Send</button>
                </form>
            </div>
        </div>
       </>
    )
}
