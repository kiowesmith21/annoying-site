import React, { useState } from 'react'
import Captcha from '../components/Captcha'
import { useUserContext } from '../config/UserContext'

const Login = () => {

  const { captchaDone } = useUserContext();
  const [showRegister, setShowRegister] = useState(false);
  
  return (
    <>
      <div className='flex flex-col w-full'>
        { !captchaDone &&
          <Captcha />
        }

        { captchaDone &&
          <div>
            Login
            <button onClick={() => {setShowRegister(true)}}>Create Account</button>
          </div>
        }

        { captchaDone && showRegister &&
          <div>
            Create Account
          </div>
        }
      </div>
    </>
  )
}

export default Login