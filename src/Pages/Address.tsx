export default function Address() {
    return (
        <div className="flex flex-col min-h-screen px-4 pt-4">
            <header className="mb-12 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                />
            </div>
            <div className="mb-8 text-base">
                <input
                    type="number"
                    maxLength={10}
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Mobile Number"
                />
            </div>
            <div className="mb-8 text-base">
                <input
                    type="number"
                    maxLength={10}
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Pincode"
                />
            </div>
            <div className="mb-8 text-base">
                <input
                    type="text"
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="House No., Apartment Name"
                />
            </div>
            <div className="mb-8 text-base">
                <input
                    type="text"
                    className="w-full border-b-2 focus:outline-none focus:border-[#00bcfc]"
                    placeholder="Road, Area, Locality"
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
                            className="form-radio text-blue-600"
                        />
                        <span>Home</span>
                    </label>
                    <label className="flex items-center space-x-2 mt-2">
                        <input
                            type="radio"
                            name="addressType"
                            id="Office"
                            value="Office"
                            className="form-radio text-blue-600"
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
                    <p className="font-semibold text-sm">
                        Set as Default address
                    </p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <footer className="sticky bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                <div className="max-w-4xl text-center">
                    <p className="text-xl font-bold">
                        <a href="/cart">
                            Continue
                        </a> </p>
                </div>
            </footer>

            </div>

        </div>
    )
}
