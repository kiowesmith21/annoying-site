import React, { useContext, useState } from 'react'
import { useUserContext } from '../config/UserContext';

const Captcha = () => {

  const [clickCaptchaDone, setClickCaptchaDone] = useState(false);
  const [letters, setLetters] = useState("sJf8P2");
  const [ userLetters, setUserLetters ] = useState("");

  const { updateCaptchaDone } = useUserContext()

  const generate = () => {
    //reset letters
    setLetters("");

    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generate captcha for length of
    // 6 with random character
    for (let i = 1; i < 6; i++) {
      uniquechar += randomchar.charAt(
          Math.random() * randomchar.length)
    }

    //set letters to random
    setLetters(uniquechar);

  };

  const updateCaptcha = () => {
    if (userLetters === letters) {
      updateCaptchaDone(true); //set to true in the context
    } else {
      window.location.reload(); //reload the whole page lol
    }
  }

  return (
    <div className='flex flex-col items-center'>
      { !clickCaptchaDone &&
        <div className='flex flex-row items-center p-2 bg-white border border-gray-200 rounded-lg'>
            <input className='ml-12 scale-150' type="radio" onChange={() => setClickCaptchaDone(true)}/>
            <p className='ml-2'>I'm not a robot</p>
            <div className='flex flex-col items-center'>
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRTqJ21dqXcGzoFmTqd3oXYp0YHEASe4rCdCV_GvkauSdmTTowe" alt="" className='w-1/4'/>
                <p>Capycaptcha</p>
            </div>
        </div>
    }

    { clickCaptchaDone &&
        <div className='bg-white border border-gray-200 p-5'>
            <p className='bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-bold rounded-lg px-5 py-2'>{letters}</p>
            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type the characters above:</label>
                <input type="text" id="default-input" onChange={(e: any) => setUserLetters(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className='flex flex-col justify-between items-center'>
              <button onClick={updateCaptcha} className='p-2 border-2 border-black rounded-lg mb-4 hover:bg-gray-100'>Submit</button>
              <button onClick={generate} className='p-2 border-2 border-black rounded-lg hover:bg-gray-100'>Reset characters</button>
            </div>
        </div>
    }
    </div>
  )
}

export default Captcha