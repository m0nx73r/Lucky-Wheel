import firstPageAsset from '/first-page-asset.jpg';

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
                        {/* <p className="text-sm font-semibold">Balance</p> */}
                        <img src={`prize_${localStorage.getItem("prize")?.split(" ")[0]}g.png`} alt="" height={50} width={50} className='pl-2'/>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">MMTC-PAMP🪙</p>
                        <p className="text-lg font-bold text-green-600">+117.33% (₹1.10)</p>
                    </div>
                </div>
            </div>

            <div className="rounded-b-lg bg-[#e5f2f8] px-4 pt-1 shadow mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm">Gold Balance</p>
                        <p className="text-lg font-bold">₹{new Intl.NumberFormat('en-IN').format(parseFloat((localStorage.getItem("prize")) ?? "") * 7658.6)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">Gold Weight</p>
                        <p className="text-lg font-bold">{new Intl.NumberFormat('en-IN').format(parseFloat((localStorage.getItem("prize")) ?? ""))} g</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center mb-4">
            <img src={firstPageAsset} alt="" width="500" height="50" />
        </div>
    </div>
    <footer className="bg-white p-2 shadow-md mt-auto mb-12">
    <button className="rounded-lg bg-[#00bcfc] text-white font-semibold p-2 w-full" onClick={_event =>  window.location.href='/product'}>Buy Now</button>
        {/* <div className="flex items-center justify-between">  
            <button className="rounded-lg border-[#00bcfc] text-[#00bcfc] border-2 w-1/2 p-2 mx-2" onClick={_event =>  window.location.href='/product'}>Buy one time</button>
        </div> */}
    </footer>
</div>
    )
}
