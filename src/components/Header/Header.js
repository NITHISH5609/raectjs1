import React from "react";
import { AiOutlineBug } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Header = ({ sidebar, setSidebar }) => {
  return (
    <header className=" px-4 w-full h-14 sticky top-0 flex items-center bg-gray-50 shadow-md">
      <div className=" w-full flex justify-between items-center">
        <Link to="/">
          <div className="flex">
            <span className="text-3xl text-green-600">
              <AiOutlineBug />
            </span>
            <span className="font-semibold text-2xl hidden sm:block">
              Mgea<span className="text-green-700">Mart</span>
            </span>
          </div>
        </Link>
        <div className="items-center space-x-2 hidden sm:flex">
          <span className="hidden sm:block font-semibold">
            Sk Sabbir Hossain
          </span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user"
            className="w-11 h-11 object-cover rounded-full"
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none ring-2 ring-gray-300 focus:ring-green-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
