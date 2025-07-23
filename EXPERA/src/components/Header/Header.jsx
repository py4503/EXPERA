import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutBtn from '../utils/LogoutBtn';
import { NavLink } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const navItems = [
    {
      name: 'Home',
      path: '/',
      status: true
    },
    {
      name: 'Discover',
      path: '/all-posts',
      status: authStatus
    },
    {
      name: 'My uploads',
      path: '/my-posts',
      status: authStatus
    },
    {
      name: "Create",
      path: '/add-post',
      status: authStatus
    },
    {
      name: 'Login',
      path: '/login',
      status: !authStatus
    },
    {
      name: 'SignUp',
      path: '/signup',
      status: !authStatus
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
            {navItems.map((item) => item.status ? (
              <NavLink
                key={item.name}
                className="text-sm text-gray-700 hover:text-black transition duration-200 relative group"
                to={item.path}
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    <span className={isActive ? 'absolute bottom-[-2px] left-0 h-[2px] bg-black w-full' : 'absolute bottom-[-2px] left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full'}></span>
                  </>
                )}
              </NavLink>
            ) : '')}
          </nav>

          {/* session logout */}
          {authStatus && (
            <AvatarDropdown user={user} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header
