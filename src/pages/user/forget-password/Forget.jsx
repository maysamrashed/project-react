import axios from "axios"
import { useFormik } from "formik"
import { Link } from "react-router-dom";
import backgroundImage from '../../../shoping-image/Shoping.avif';

export default function Forget() {
    const formik = useFormik({
        initialValues: {
            email: ' ',
            password: ' ',
            code: ' ',
        },
        onSubmit: ForgetUser
    })
    async function ForgetUser() {
        const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/auth/forgotPassword`, formik.values);
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
                <div className="send-Code mb-3 text-decoration-none">
                    <Link className="send text-dark" to='/code'>Send-Code</Link>
                </div>
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
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            onChange={formik.handleChange}
                            name='code'
                            id="code"
                            value={formik.values.code}
                            placeholder=" "
                        />
                        <label htmlFor="code">Code</label>
                    </div>
                    <button type='submit' className='btn btn-outline-info w-100'>Send</button>
                </form>
            </div>
        </div>
        </>
    )
}
