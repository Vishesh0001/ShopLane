import { Link } from "react-router-dom"

import { Store,SquareArrowUpRight } from "lucide-react"
export const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">


<div className=' bg-accent text-sage p-10 m-4 mt- rounded-2xl shadow-sm shadow-neutral-500 h-165 flex  flex-col items-center justify-center space-y-6'>
<div className='animate-slideFadeDown  mb-10 text-emerald-900 underline text-6xl  font-story text-center text-shadow-lg'>ShopLane</div>
<div className='animate-slideFadeDown text-6xl font-instrument text-center'>“Bring Your Shop Online in Minutes”</div>
<div className=" animate-slideFadeUp text-center text-6xl">Easily register your shop, manage products, and reach more customers – all from one platform</div>
      
<div className="flex space-x-2 mt-10">
   <Link to="/allstores" ><button className='animate-slideFadeLeft bg-[#023047] text-base px-4 py-2 rounded-xl border-base hover:bg-accent hover:text-sage border-2 m-5'><Store className="inline-block mr-2" /> Explore Shops</button>
   </Link>
   <Link to="/create-store" ><button className='animate-slideFadeRight bg-[#023047] text-base px-4 py-2 rounded-full hover:bg-accent hover:text-sage border-2 border-base-2 m-5'><SquareArrowUpRight className="inline-block mr-2" /> Register my Shop</button>
    </Link>
</div>

        </div>
    </div>
  )
}
