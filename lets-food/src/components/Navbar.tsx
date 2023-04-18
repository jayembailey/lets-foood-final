import { auth } from '../config/firebase'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false)

    const dropDown = () => {
        setIsVisible(!isVisible)
    }

    const clicked = () => {
        setIsVisible(false)
    }

    const user = auth.currentUser
    const protectedRoute = () => {
        if(user) {
            return ''
        } else {
            return 'hidden'
        }
    }
    const signedIn = () => {
        if(user) {
            return 'hidden'
        } else {
            return ''
        }
    }

    return (
        <nav className='flex items-center justify-between flex-wrap bg-green-800 p-6 font-serif'>
            <div className='flex items-center flex-shrink-0 text-yellow-400 mr-6'>
                <Link to='/' className='font-semibold text-xl tracking-tight'>Let's Food</Link>
            </div>
            <div className="block">
                <button 
                    onClick={dropDown}
                    className="flex items-center px-3 py-2 text-yellow-400 border rounded border-yellow-400 hover:text-white hover:border-white">
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>
            </div>
            { isVisible ? (
                <div className='w-full opacity-75 items-center'>
                    <div className="flex wrap-auto text-sm lg:flex-grow">
                        <div>
                            <button className='p-2 m-5 bg-yellow-400 justify-center rounded-lg'>
                                <div>
                                    <Link to='/' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                                    text-green-800 hover:text-white mr-4'>Home</Link>
                                </div>
                            </button>
                        </div>
                        <div  className={`${protectedRoute()}`}>
                            <button className={`p-2 m-5 bg-yellow-400 justify-center rounded-lg`}>
                                <div>
                                    <Link to='/dashboard' onClick={ clicked } className={` flex place-items-center mt-4 lg:inline-block lg:mt-0
                                    text-green-800 hover:text-white mr-4`}>Dashboard</Link>
                                </div>
                            </button>
                        </div>
                        <div  className={`${signedIn()}`}>
                            <button className='p-2 m-5 bg-yellow-400 justify-center rounded-lg'>
                                <div>
                                    <Link to='/signup' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                                    text-green-800 hover:text-white mr-4'>Sign Up</Link>
                                </div>
                            </button>
                        </div>
                        <div  className={`${signedIn()}`}>
                            <button className='p-2 m-5 bg-yellow-400 justify-center rounded-lg'>
                                <div>
                                    <Link to='/signin' onClick={ clicked } className='flex place-items-center mt-4 lg:inline-block lg:mt-0
                                    text-green-800 hover:text-white mr-4'>Sign In</Link>
                                </div>
                            </button>
                        </div>
                        <div className={`${protectedRoute()}`}>
                            <button className='p-2 m-5 bg-yellow-400 justify-center rounded-lg'>
                                <div >
                                    <Link to='/signout' onClick={ clicked } className={`flex place-items-center mt-4 lg:inline-block lg:mt-0
                                    text-green-800 hover:text-white mr-4`}>Sign Out</Link>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>) : (<></>)}
        </nav>
    )
}

export default Navbar
