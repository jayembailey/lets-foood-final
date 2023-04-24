import { useState } from 'react'
import Navbar from "./Navbar";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const handlePasswordReset = async(e:any) => {
    e.preventDefault()
    try{
      await sendPasswordResetEmail(auth, email);
      alert(`Password reset email sent`)
    } catch (error) {
      alert(`That's weird. Did you enter your email?`)
    }
  }

  const handleSignIn = async (e:any) => {
    e.preventDefault()
    if (email != '') {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        console.log(`sign in: ${email}`);
        alert(`Signed in: ${email}`)
        location.assign('/')
      } catch (error) {
        console.log(error);
        alert(`Hm, something's off...try again or create an account.`)
      }
    } else {
      alert(`Fields cannot be empty`)
    }
  }

  return (
    <>
      <Navbar />
      <div className='bg-green-800 flex flex-col h-screen p-5 '>
        <div className="container border rounded p-3 border-yellow-400">
          <div className="text-center p-3">
            <strong className='text-yellow-400 text-lg'>
              Enter Email and Password to Sign In!
            </strong>
          </div>
          <form>
            
            <div >
              <label className="label text-yellow-400 p-2">Email:</label>
              <input className="m-2" type="email" id='email' value={email} onChange = {(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div>
              <label className="label text-yellow-400 p-2">Password:</label>
              <input className="m-2" type="password" id='password'value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>

            <div className='flex justify-between'>
              <button onClick={handleSignIn} className="btn border rounded p-1 text-green-800 bg-yellow-400 border-green-800 shadow-lg">
                Submit
              </button>
              <div className='text-yellow-400 mt-2'>
                Don't have an account? <a href="/signup" className='underline'>Sign Up!</a>
              </div>
            </div>
          </form>
          </div>
          <div className="flex justify-center text-yellow-400 m-3">
            <div className='m-2'>Forgot Password? </div>
            <button onClick ={handlePasswordReset}className='m-2 border rounded border-yellow-400 p-1 shadow'>Click here to reset</button>
          </div>
      </div>
    </>
  )
}

export default SignIn
