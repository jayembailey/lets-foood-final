import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const SignOut = () => {
  const user:any = auth.currentUser;
  signOut(auth)
  setTimeout(() => location.assign('/'), 1000)

  return (
    <div className='bg-green-800 flex-col h-screen text-center '>
      <div className='text-yellow-400 justify-center'>
        <strong className="text-lg">User {user?.email} successfully logged out</strong>
      </div>
    </div>
  )
}

export default SignOut
