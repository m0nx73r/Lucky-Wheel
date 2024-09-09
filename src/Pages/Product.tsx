import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faSearch, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { SetStateAction, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const images = [
    `/product/${localStorage.getItem("prize")}gm-a.jpg`,
    `/product/${localStorage.getItem("prize")}gm-b.jpg`,
    `/product/${localStorage.getItem("prize")}gm-c.jpg`,
    `/product/${localStorage.getItem("prize")}gm-d.jpg`,
];

function getProductName(){
    const productWeight = localStorage.getItem("prize")?.split(" ")[0];
    console.log(productWeight);
    if(productWeight == "5"){
      return "Bangalore Refinery 5g Gold Bar 24kt";
    }else if(productWeight == "10"){
      return "Kundan 10g Gold Bar 24kt";
    }else if(productWeight == "2"){
      return "MMTC-PAMP 2g Gold Bar 24kt";
    }else{
      return "Gold Bar";
    }
  }


export default function Product() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index: SetStateAction<number>) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        swipeDuration: 500,
        trackMouse: true
    });

    const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
    const [isDeliveryNotAvailable, setIsDeliveryNotAvailable] = useState(false);

    const handleDeliveryClick = () => {
        if ((document.getElementById('zipcode') as HTMLInputElement).value.length !== 6) {
            setIsDeliveryNotAvailable(true);
            setIsDeliveryAvailable(false);
            return;
        }
        setIsDeliveryNotAvailable(false);
        setIsDeliveryAvailable(true);
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
                        <h1 className="ml-2 text-lg font-semibold">Buy Gold</h1>
                    </div>
                    <div className="ml-2">
                        <FontAwesomeIcon className='mx-2' icon={faSearch} />
                        <FontAwesomeIcon className='mx-2' icon={faHeart} />
                        <FontAwesomeIcon className='mx-2' icon={faCartShopping} />
                    </div>
                </header>

                <div className="relative w-full max-w-4xl mx-auto my-10">
                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-lg" {...handlers}>
                        {/* Slides */}
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {images.map((src, index) => (
                                <div key={index} className="flex-shrink-0 w-full h-80 md:h-96">
                                    <img src={src} alt={`Slide ${index + 1}`} className="object-contain w-full h-full" />
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
                    <p className='text-sm font-semibold'>
                        {getProductName()}
                    </p>
                </div>

                <div className='mb-4 text-gray-500'>
                    <FontAwesomeIcon icon={faShareNodes} className='font-thin mr-1' /> Share
                </div>

                <div>
                    <p className='text-xl'>
                        MRP <span className='line-through'>₹{new Intl.NumberFormat('en-IN').format(parseFloat((localStorage.getItem("prize")) ?? "")  * 7658.6)}</span>
                        <span className='font-bold text-[#a3ec17] pl-2'>FREE</span>
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
                    <div className="flex items-center justify-between pb-2">
                        <input placeholder="Enter pincode" className="p-2 focus:outline-none border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-b-[#00bcfc]" type='number' maxLength={6} id='zipcode' />
                        <button className="text-[#00bcfc] py-2 rounded px-2" onClick={handleDeliveryClick}>Change</button>
                    </div>
                    {isDeliveryAvailable && (
                        <div className='bg-[#f2fafd] border-[#00bcfc] rounded-md border-2'>
                            <div className='flex justify-between px-4 pt-4'>
                                <div className='font-semibold'>
                                    Delivery By {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() + ['th', 'st', 'nd', 'rd'][(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 10 > 3 || Math.floor(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 100 / 10) === 1) ? 0 : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 10] + ' ' + new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' })}
                                </div>
                                <div className='font-semibold'>
                                    ₹499
                                </div>
                            </div>
                            <div className='flex justify-between pb-4 px-4 text-gray-600'>
                                <div className='text-sm'>
                                    Standard Delivery
                                </div>
                                <div className='text-sm'>
                                    Shipping fee
                                </div>
                            </div>
                        </div>
                    )}
                    {isDeliveryNotAvailable && (
                        <p className="bg-red-200 text-red-800 p-2 mt-2">
                            Not able for delivery for your location yet.
                        </p>
                    )}
                </div>
            </div>
            <footer className="sticky bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                <div className="max-w-4xl text-center">
                    <p className="text-xl font-bold">
                        <a href="/address">
                            Buy for <span className='line-through'>₹{parseInt(localStorage.getItem("prize") ?? "")  * 7658.6}</span> ₹0
                        </a> </p>
                </div>
            </footer>
        </div>
    );
}
