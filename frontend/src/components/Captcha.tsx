import React, { useState } from 'react'

const Captcha = () => {

  const [clickCaptchaDone, setClickCaptchaDone] = useState(false);
  const [letters, setLetters] = useState("sJf8P2");

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

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-row justify-between items-center'>
            <input type="radio" onChange={() => setClickCaptchaDone(true)}/>
            <p>I'm not a robot</p>
            <div className='flex flex-col'>
                <img src="/frontend/public/capybara.png" alt="" className=''/>
                <p>Capycaptcha</p>
            </div>
        </div>
    { clickCaptchaDone &&
        <div>
            <p className='bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-bold rounded-lg px-5 py-2'>{letters}</p>
            <div className="mb-6">
                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type the characters above:</label>
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <button onClick={generate} className='p-2 border-2 border-black'>reset characters</button>
        </div>
    }
    </div>
  )
}

export default Captcha