import { ArrowDown, Plus } from "lucide-react";

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
                    <p className="font-semibold">
                        Deliver to
                    </p>
                    <p className="text-sm">
                        {localStorage.getItem("address") ?? "India"}
                    </p>
                </div>
                <button className="ml-4 border-2 border-[#00bcfc] text-[#00bcfc] px-4 py-2 rounded font-semibold">
                    Change
                </button>
            </div>

            <div className="min-h-1 bg-gray-200 mb-4">
            </div>

            <div className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm mx-auto">
                <div className="m-4 px-4 mt-4">
                    <div className="flex items-start space-x-4">
                        <img
                            src="../../src/assets/gold-bar.png"
                            width={60}
                            height={80}
                            alt="Gold bar"
                            className="rounded-md align-middle"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">10g Lotus Rect Bar Making Charges</h3>
                            <p className="text-sm text-muted-foreground">10g Lotus Rect Bar Making Charges</p>
                            <p className="text-xl font-bold mt-2">₹1,593</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M7 15h0M2 9.5h20" />
                                </svg>
                                Get it by 25th Aug
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border rounded-md">
                            <button className="h-8 w-8 p-0" >
                                1
                            </button>
                            <button className="h-8 w-8 p-0">
                                <Plus className="h-4 w-4 text-[#00bcfc]" />
                            </button>
                        </div>
                        <div className="space-x-2">
                            <button className="h-8 border-2 p-2">
                                Delete
                            </button>
                            <button className="h-8 border-2 p-2">
                                Save for later
                            </button>
                        </div>
                    </div>
                    <div className="pt-2" >
                        <p className="text-gray-600 text-sm">
                            Return and cancellations 
                        </p>
                    </div>
                </div>
            </div>

            {/* <footer className="sticky bottom-0 z-50 bg-[#00bcfc] text-white py-4">
                <div className="max-w-4xl text-center">
                    <p className="text-xl font-bold">
                        <a href="/checkout">
                            Proceed to Pay $199
                        </a> </p>
                </div>
            </footer> */}
        </div>
    )
}