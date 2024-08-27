import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import goldBarImg from '../../src/assets/gold-bar.png'; // Adjust the path based on your project structure
import { faCartShopping, faHeart, faSearch, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { SetStateAction, useState } from 'react';

const images = [
    goldBarImg,
    goldBarImg,
    goldBarImg,
];

export default function Product() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index: SetStateAction<number>) => {
        setCurrentIndex(index);
    };

    return (
        <div className='min-h-screen'>
            <div className="flex flex-col min-h-screen px-4 pt-4">
                <header className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-6 w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 19-7-7 7-7" />
                                <path d="M19 12H5" />
                            </svg>
                        </div>
                        <h1 className="ml-2 text-lg font-semibold">Gold Locker</h1>
                    </div>
                    <div className="ml-2">
                        <FontAwesomeIcon className='mx-2' icon={faSearch} />
                        <FontAwesomeIcon className='mx-2' icon={faHeart} />
                        <FontAwesomeIcon className='mx-2' icon={faCartShopping} />
                    </div>
                </header>

                <div className="relative w-full max-w-4xl mx-auto my-10">
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-lg">
                        {/* Slides */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {images.map((src, index) => (
                                <div key={index} className="flex-shrink-0 w-full h-80 md:h-96">
                                    <img src={src} alt={`Slide ${index + 1}`} className="object-cover w-full h-full" />
                                </div>
                            ))}
                        </div>

                        {/* Dot Navigation */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'} focus:outline-none`}
                                    onClick={() => goToSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className='mb-2'>
                    <p className='text-sm'>
                        1 gm Gold 999.9 Minted Bar Lotus Certified QR
                    </p>
                </div>

                <div className='mb-4 text-gray-500'>
                    <FontAwesomeIcon icon={faShareNodes} className='font-thin mr-1' /> Share
                </div>

                <div>
                    <p className='text-xl'>
                        MRP <span className='font-bold'>$1,999</span>
                    </p>
                    <p className='text-gray-500 text-sm'>
                        Inclusive of all taxes
                    </p>
                </div>

                <hr className='h-2 my-4' />

                <div>
                    <p className='text-lg font-bold mb-2'>
                        Delivery Address
                    </p>
                    <div>
                        {/* <input placeholder='Enter pincode'>
                        </input> */}
                    </div>
                </div>
                <hr className='h-2' />
            </div>
            <footer className="sticky bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                <div className="max-w-4xl text-center">
                    <p className="text-xl font-bold">
                        <a href="/address">
                            Buy for $100
                        </a> </p>
                </div>
            </footer>
        </div>

    );
}
