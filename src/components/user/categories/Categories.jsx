import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './categories.module.css';
import { Link } from 'react-router-dom';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        const { data } = await axios.get(`https://ecommerce-node4.onrender.com/categories/active`);
        setCategories(data.categories);
        setLoading(false);
    };

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <section className={styles.categories}>
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
    >
        {loading ? (
            <p>Loading categories...</p>
        ) : (
            categories.map((category) => (
                <SwiperSlide key={category._id} className={styles.category}>
                    <Link to={`/categoryDetails/${category._id}`}>
                        <img src={category.image.secure_url} alt={category.name} />
                    </Link>
                </SwiperSlide>
            ))
        )}
    </Swiper>
</section>
    )
}