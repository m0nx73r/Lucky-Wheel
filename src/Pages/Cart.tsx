import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Minus, Plus } from "lucide-react";
import goldBarImg from '/gold-bar.png';;


export default function Cart() {
    return (
        <div className="flex flex-col min-h-screen pt-4">
            <header className="mb-4 flex items-center justify-between px-4">
                <div className="flex items-center">
                    <div className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </div>
                    <h1 className="ml-2 text-xl font-bold">Cart</h1>
                </div>
            </header>
            <div className="p-2 text-gray-600 flex items-center justify-between px-4">
                <div className="flex flex-col">
                    <p className="font-semibold pb-1">
                        Deliver to
                    </p>
                    <p className="text-sm w-5/6">
                        {localStorage.getItem("name")},
                        {" " + localStorage.getItem("house")},
                        {" " + localStorage.getItem("area")} -
                        {" " + localStorage.getItem("pincode")}
                    </p>
                </div>
                <button className="ml-4 border-2 border-[#00bcfc] text-[#00bcfc] px-4 py-1 rounded font-bold" onClick={_event => window.location.href = '/address'}>
                    Change
                </button>
            </div>

            <div className="min-h-1 bg-gray-200 mb-4">
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="m-4 px-4 mt-4">
                    <div className="flex items-start space-x-4">
                        <img
                            src={goldBarImg}
                            width={60}
                            height={80}
                            alt="Gold bar"
                            className="rounded-md pt-8 mr-2"
                        />
                        <div className="flex-1">
                            <h3 className="font-bold text-sm">10g Lotus Rect Bar Making Charges</h3>
                            <p className="text-xs text-muted-foreground">10g Lotus Rect Bar Making Charges</p>
                            <p className="text-xl mt-2 "><span className="line-through pr-2">₹{localStorage.getItem("prize")}.00</span><span className="font-bold">₹0</span></p>
                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                                Get it by 
                                <span className="font-bold pl-1">
                                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() + ['th', 'st', 'nd', 'rd'][(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 10 > 3 || Math.floor(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 100 / 10) === 1) ? 0 : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getDate() % 10] + ' ' + new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' })}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                            <button className="h-8 w-8 flex items-center justify-center p-0">
                                <Minus className="h-4 w-4 text-gray-500" />
                            </button>
                            <div className="h-8 w-8 flex items-center justify-center">
                                1
                            </div>
                            <button className="h-8 w-8 flex items-center justify-center p-0">
                                <Plus className="h-4 w-4 text-[#00bcfc]" />
                            </button>
                        </div>

                        <div className="space-x-2">
                            <button className="border-2 p-2 text-gray-600 font-bold rounded-md text-sm">
                                Delete
                            </button>
                            <button className="border-2 p-2 text-gray-600 font-bold rounded-md text-sm">
                                Save for later
                            </button>
                        </div>
                    </div>
                    <div className="pt-2" >
                        <p className="text-gray-600 text-sm">
                            Return and cancellations
                            <FontAwesomeIcon icon={faAngleDown} className="pl-1 pt-2" />
                        </p>
                    </div>
                </div>

                <hr />

                <div className="p-2 text-[#00bcfc] font-bold ml-4">
                    Apply Promocode
                    <FontAwesomeIcon icon={faAngleRight} className="pl-1 pt-2" />
                </div>

                <div className="min-h-2 bg-gray-100">
                </div>

                <div className="p-4">
                    <div className="p-2">
                        <span className="font-bold">Bag Total</span>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm text-gray-500 pb-2">
                            <p className="pl-2">Total MRP</p>
                            <p className="pr-2">₹0</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm text-gray-500 pb-2">
                            <p className="pl-2">Shipping Fee</p>
                            <p className="pr-2">₹499</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm text-gray-500 pb-2">
                            <p className="pl-2">Amount Payable</p>
                            <p className="pr-2">₹499</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="min-h-32">
            </div>


            <footer className="sticky rounded-lg bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                <div className="max-w  text-center">
                    <p className="text-xl font-bold">
                        <a href="/checkout">
                            Proceed to Pay ₹499
                        </a> </p>
                </div>
            </footer>
        </div>
    )
}