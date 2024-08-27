export default function GoldLocker() {
    return (
<div className="flex flex-col min-h-screen bg-gradient-to-b from-[#dbf6ff] to-white p-4">
    <div className="flex-1">
        <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
                <div className="h-6 w-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                </div>
                <h1 className="ml-2 text-xl font-bold">Gold Locker</h1>
            </div>
            <div className="ml-2 font-bold text-blue-500">Help</div>
        </header>
        <div className="p-2">
            <div className="rounded-t-lg bg-white p-4 shadow mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm">Balance</p>
                        <p className="text-xl font-bold">$100.23</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">MMTC-PAMP🪙</p>
                        <p className="text-lg font-bold text-green-600">+117.33% ($1.10)</p>
                    </div>
                </div>
            </div>

            <div className="rounded-b-lg bg-[#e5f2f8] px-4 pt-1 shadow mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm">Invested Amount</p>
                        <p className="text-lg font-bold">$0.00</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">Gold Balance</p>
                        <p className="text-lg font-bold">0.00 g</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mb-4">
            <img src="../../src/assets/first-page-asset.jpg" alt="" width="500" height="50" />
        </div>
    </div>
    <footer className="bg-white p-2 shadow-md mt-auto mb-12">
        <div className="flex items-center justify-between">
            <button className="rounded-lg border-[#00bcfc] text-[#00bcfc] border-2 w-1/2 p-2 mx-2">Buy one time</button>
            <button className="rounded-lg bg-[#00bcfc] text-white font-semibold w-1/2 p-2">Start SIP</button>
        </div>
    </footer>
</div>
    )
}
