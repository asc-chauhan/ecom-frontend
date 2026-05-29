import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

import { Pagination, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    return (
        <div className='rounded-2xl overflow-hidden shadow-lg'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation
                effect='fade'
                modules={[Pagination, EffectFade, Autoplay, Navigation]}
                pagination={{ clickable: true }}
                slidesPerView={1}
            >
                {bannerLists.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className='relative sm:h-[500px] h-80 rounded-2xl overflow-hidden'>
                            {/* Background Image */}
                            <img
                                src={item?.image}
                                alt={item?.title}
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                            {/* Dark Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent' />

                            {/* Content */}
                            <div className='relative z-10 flex items-center h-full px-8 sm:px-16'>
                                <div className='max-w-lg'>
                                    <span className='inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-4'>
                                        {item.subtitle}
                                    </span>
                                    <h2 className='text-white text-3xl sm:text-5xl font-bold leading-tight'>
                                        {item.title}
                                    </h2>
                                    <p className='text-gray-200 mt-3 text-sm sm:text-base max-w-md'>
                                        {item.description}
                                    </p>
                                    <Link
                                        to="/products"
                                        className='mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors shadow-md'
                                    >
                                        Shop Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroBanner;
