import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "../utils/LogoutBtn"; // Adjust path as needed

function AvatarDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full cursor-pointer border-2 border-gray-200 shadow ring-2 ring-gray-100 hover:scale-105 transition-transform duration-200 overflow-hidden"
      >
        <img
          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.$id}`}
          alt="User Avatar"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-down">
          <Link
            to={`/profile`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            View Profile
          </Link>
          <div className="border-t border-gray-100" />
          <div className="px-4 py-2">
            <LogoutBtn/>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
