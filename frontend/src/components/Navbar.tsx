import React from 'react'
import { useUserContext } from '../config/UserContext'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  let navigate = useNavigate();

  //get UserContext
  const { name, loggedIn, captchaDone, updateCaptchaDone, updateLoggedIn } = useUserContext();

  return (
    <>
      <nav className="bg-white  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">Annoying.com</span>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 ">
          { loggedIn && captchaDone &&
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={() => {navigate('/'); updateLoggedIn(false); updateCaptchaDone(false)}}>Sign Out</button>
          }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar