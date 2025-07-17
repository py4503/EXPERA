import React from 'react'
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import LogoutBtn from '../utils/LogoutBtn';

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    if(authStatus){
      console.log("User logged in");
    }
    else{
      console.log("User not logged in");
    }
  const navItems = [
    {
        name:'Home',
        path:'/',
        status:true
    },
    {
        name:'Discover',
        path:'/all-posts',
        status:authStatus
    },
    {
        name:'My uploads',
        path:'/my-posts',
        status:authStatus
    },
    {
        name:"Create",
        path:'/add-post',
        status:authStatus
    },
    {
        name:'Login',
        path:'/login',
        status:!authStatus
    },
    {
        name:'SignUp',
        path:'/signup',
        status:!authStatus
    }
  ]
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* EXPERA */}

          <div className="flex items-center gap-4">
            <span className="text-black text-xl font-bold">EXPERA</span>
          </div>
        
        {/* nav links */}

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => item.status?(
              <Link
                key={item.name}
                className="text-sm text-gray-700 hover:text-black transition duration-200 relative group"
                to={item.path}
              >
                <span>{item.name}</span>
                <span className='absolute bottom-[-2px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full'></span>
              </Link>
            ) : '')}
          </nav>

        {/* session logout */}
          {authStatus && (
            <div className="flex items-center gap-4">
            <LogoutBtn/>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header
