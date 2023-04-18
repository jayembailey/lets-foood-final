import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { SPOONACULAR_API_KEY } from '../config/firebase'
import Background from '../assets/healthy-bowl.avif'
import RecipeList from './RecipeList'
import { auth } from '../config/firebase'

const RecipeTable = () => {
    const user = auth.currentUser
    const [queryData, setQueryData] = useState()
    const [resultData, setResultData] = useState()
    const [isHidden, setIsHidden] = useState('hidden')
    const [isVisible, setisVisible] = useState('hidden')
    const [loading, setLoading] = useState(false)

    function handleChange(e:any) {
        setQueryData(e.target.value)
    }

    async function getQueryData() {
        changeHidden()
        console.log('Loading...')
        setLoading(true)
        await fetch(`https://api.apilayer.com/spoonacular/recipes/complexSearch?query=${queryData}&addRecipeInformation=true`,{
            method: 'GET',
            redirect: 'follow',
            headers:{
                'apikey':`${SPOONACULAR_API_KEY}`,
                }
        })
        .then((response) => response.json())
        .then((data) => {
            setLoading(false)
            setResultData(data.results)
            console.log(data.results)
        })
        
        .catch((error) => {
            setLoading(false)
            console.log('error', error)
        })
        
    }

    const changeHidden = () =>{
        if (isHidden) {
            setIsHidden('')
            setisVisible('hidden')
        } 
    }

    const changeVisible = () => {
        if (isVisible) {
            setisVisible('') 
            setIsHidden('hidden')
        }
    }

    return (
        <div className='flex h-screen bg-cover' 
        style={{backgroundImage:`url(${ Background })`}}>
            <nav className='flex flex-col h-screen w-1/4 text-center bg-green-800 shadow-lg border-2 border-yellow-500 rounded'>
                <div >
                    <strong className='text-yellow-400'>{user?.email}'s Recipe Book</strong>
                    <form id="search-form">
                        <input
                            id="q"
                            aria-label="Search recipes"
                            placeholder="Search Recipes"
                            type="text"
                            name="q"
                            className='bg-yellow-400 text-green-800 m-1 w-11/12 shadow-sm rounded'
                            onChange={handleChange}
                        />
                        <button type='button'
                            className ='border rounded border-yellow-400 shadow-md hover:shadow-lg text-yellow-400 p-1 m-1 hover:border-yellow-200 hover:text-yellow-200 hover:bg-green-700'
                            onClick={getQueryData}>{loading ? <>Loading...</> : <>Food Me!</>}
                        </button>
                    </form>
                </div>
                <ul>
                    <Link to={`favorites`}>
                        <button onClick={changeVisible} className='flex-row w-10/12 rounded text-left shadow-md hover:shadow-lg mt-3 bg-green-800 text-yellow-400 hover:bg-green-600 hover:text-yellow-300'>
                            <li>
                                Favorites
                            </li>
                        </button>
                    </Link>  
                </ul>
            </nav>
            <div className='w-2/3'>
                <div className={isHidden}>
                    {resultData && <RecipeList results={resultData}/>}
                </div>
                <div className={isVisible}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RecipeTable
