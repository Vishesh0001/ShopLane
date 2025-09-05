import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [token, setToken] = useState(false);
const navigate = useNavigate()
  useEffect(() => {
    const cookie = Cookies.get("token"); // use your cookie name here
    console.log("cookie:", cookie);
    if (cookie) {
      setToken(true);
    }
  }, []); // run only once on mount
  function handleLogout(){
        if (!window.confirm("Do you want to logout?")) {   
      return; 
    }
    Cookies.remove("token")
    setToken(false)
navigate('/login')

  }
  return (
<nav className="fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center justify-between p-1 w-[90%] max-w-6xl shadow-md shadow-black bg-sage/80 text-base rounded-2xl z-10">
  {/* Logo */}
  <div className="ml-4 text-2xl font-bold font-story">ShopLane</div>

  {/* Center Links */}
  <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
    <a href="/" className="hover:underline">Home</a>
    <a href="/create-store" className="hover:underline">create store</a>
    <a href="/dashboard" className="hover:underline">Dashboard</a>
    < a href="/allstores" className="hover:underline">All Stores</a>
  </div>

  {/* Right Side Button */}
  <div>
{ token?<button className='bg-accent hover:bg-red-400 px-2 text-sage rounded-full p-1 mr-1'onClick={handleLogout}>logout</button>:   <Link to="/login">
    <button className="mr-1 px-2 bg-accent text-white p-1 rounded-3xl hover:bg-sage hover:text-accent border-2 border-accent">
      Login
    </button>
    </Link>}
  </div>
</nav>


  )
}

export default Navbar