import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Captcha from '../components/Captcha'
import { useUserContext } from '../config/UserContext'

const Login = () => {

  let navigate = useNavigate();

  const { captchaDone, updateUser, updateLoggedIn } = useUserContext();
  const [showRegister, setShowRegister] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const [wrongPassword, setWrongPassword] = useState(false);

  //check backend to see if given username and password match
  const signIn = async (e: any) => {
    e.preventDefault(); //prevent page reload
    
    const userInfo = {name, password};

    //get user data by username, check if password matches
    const response = await fetch(`/api/users/${name}`);

    const json = await response.json() //get the response

    if(response.ok) {
      //reset local state (username is still stored in context)
      setName('')
      if (json.password === password) {
        updateUser(name, password); //set username in user context
        updateLoggedIn(true);
        navigate('/home'); //if password matches, navigate to homepage
      } else {
        setWrongPassword(true);
      }
    }
  }

  const register = async (e: any) => {
    e.preventDefault();

    const userInfo = {name, password}

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.body);

    const json = await response.json() //get the response

    if(!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(response.ok) {
      //reset state
      setName('')
      setPassword('')
      setError(null)
      setEmptyFields([])
      console.log('User Registered', json)
    }

  }
  
  return (
    <>
      <div className='flex flex-col w-full items-center justify-center mt-24'>
        { !captchaDone &&
          <Captcha />
        }

        { captchaDone && !showRegister && 
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6" onSubmit={signIn}>
              <h5 className="text-xl font-medium text-gray-900 ">Sign in to Annoying.com</h5>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Username" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
              {wrongPassword && <div className='error text-red-500 font-bold'>Username or password is incorrect</div>}
            </form>
            <div className="text-sm font-medium text-gray-500 mt-5">
                Not registered? <button className='text-blue-700 hover:underline' onClick={() => { setShowRegister(true); } }>Create Account</button>
              </div>
          </div>
        }

        { captchaDone && showRegister &&
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={register}>
            <h5 className="text-xl font-medium text-gray-900 ">Create Account</h5>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Username" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create a new account</button>
            {error && <div className='error text-red-500 font-bold'>{error}</div>}
          </form>
        </div>
        }
      </div>
    </>
  )
}

export default Login