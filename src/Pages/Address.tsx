import { useState } from "react";

export default function Address() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [house, setHouse] = useState("");
    const [area, setArea] = useState("");

    const handleContinue = () => {
        // Save the input values to localStorage
        localStorage.setItem("name", name || "User");
        localStorage.setItem("number", number || "Mobile Number");
        localStorage.setItem("pincode", pincode || "123456");
        localStorage.setItem("house", house || "House Number");
        localStorage.setItem("area", area || "Area");

        console.log(name, number, pincode, house, area);
    };

    return (
        <div className="flex flex-col min-h-screen px-4 pt-4">
            <header className="mb-12 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="h-6 w-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m12 19-7-7 7-7" />
                            <path d="M19 12H5" />
                        </svg>
                    </div>
                    <h1 className="ml-2 text-xl font-bold">Add New</h1>
                </div>
            </header>

            <div className="mb-8 text-base">
                <input
                    type="text"
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-8 text-base">
                <input
                    type="number"
                    maxLength={10}
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Mobile Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>

            <div className="mb-8 text-base">
                <input
                    type="number"
                    maxLength={10}
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
            </div>

            <div className="mb-8 text-base">
                <input
                    type="text"
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="House No., Apartment Name"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
                />
            </div>

            <div className="mb-8 text-base">
                <input
                    type="text"
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Road, Area, Locality"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
            </div>

            <div>
                <p className="font-bold mb-2">Address Type</p>
                <div className="flex flex-col">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="addressType"
                            id="Home"
                            value="Home"
                            className="form-radio checked:bg-[#00bcfc]"
                        />
                        <span>Home</span>
                    </label>
                    <label className="flex items-center space-x-2 mt-2">
                        <input
                            type="radio"
                            name="addressType"
                            id="Office"
                            value="Office"
                            className="form-radio checked:bg-[#00bcfc]"
                        />
                        <span>Office</span>
                    </label>
                    <label className="flex items-center space-x-2 mt-2">
                        <input
                            type="radio"
                            name="addressType"
                            id="Other"
                            value="Other"
                            className="checked:bg-[#00bcfc]"
                        />
                        <span>Other</span>
                    </label>
                </div>

                <hr className="m-4" />

                <div className="flex items-center justify-between mb-4">
                    <p className="font-semibold text-sm">Set as Default address</p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-text-[#00bcfc] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bgtext-[#00bcfc]"></div>
                    </label>
                </div>

                <footer className="sticky bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                    <div className="max-w-4xl text-center">
                        <p className="text-xl font-bold">
                            <a href="/cart" onClick={handleContinue}>
                                Continue
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
