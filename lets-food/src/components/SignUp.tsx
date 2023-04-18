import { useState } from 'react'
import Navbar from "./Navbar";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e:any) => {
    e.preventDefault()
    if (password === confirmPassword){
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log(`Created: ${email}`);
        alert(`Created: ${email}`);
        location.assign('/')
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(`Passwords must match`)
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      location.assign('/')
    }
  })

  return (
    <>
      <Navbar />
      <div className='bg-green-800 flex flex-col h-screen p-5 '>
        <div className="container border rounded p-3 border-yellow-400">
          <div className="text-center p-3">
            <strong className='text-yellow-400 text-lg'>
              Enter Email and Password to Sign Up!
            </strong>
          </div>
          <form>
            
            <div >
              <label className="label text-yellow-400 p-2">Email:</label>
              <input className="m-2" type="email" id='email' value={email} onChange = {(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div>
              <label className="label text-yellow-400 p-2">Password:</label>
              <input  className="m-2" type="password" id='password'value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className="confirm-password">
              <label className="label text-yellow-400 p-2">Confirm Password </label>
              <input className='m-2' type="password" id='confirmPassword'value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
            </div>
            <div className='flex justify-between'>
              <button onClick={handleSignUp} className="btn border rounded p-1 text-green-800 bg-yellow-400 border-green-800 shadow-lg">
                Submit
              </button>
              <div className='text-yellow-400 mt-2'>
                Already have an account? <a href="/signin" className='underline'>Sign In!</a>
              </div>
            </div>
          </form>
          </div>
      </div>
    </>
  )
}

export default SignUp
