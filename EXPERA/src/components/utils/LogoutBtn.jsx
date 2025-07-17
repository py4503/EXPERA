import React from 'react'
import { LogOut } from "lucide-react";
import authService from '../../appwrite/AuthService';
import { useDispatch } from 'react-redux';
import {logout as storeLogout} from '../../store/authSlice'

function LogoutBtn() {
    
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(storeLogout());
            Navigate('/')
        })
        .catch(() => {
            console.log("Error logging out")
        })
    }
    return (
        <div>
            <button
                onClick={logoutHandler}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-800 border border-gray-300 rounded-xl 
             shadow-sm hover:bg-gray-50 hover:shadow-md
             active:scale-[0.98] transition-all duration-200 ease-in-out
             focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 text-sm font-medium"
            >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span>Logout</span>
            </button>
        </div>
    )
}

export default LogoutBtn
