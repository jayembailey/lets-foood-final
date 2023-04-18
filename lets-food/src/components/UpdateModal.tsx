import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Props {
    id:string,
    title:string,
    spoonacularSourceUrl:string,
    open: boolean;
    onClose: () => void;
}

const UpdateModal = (favorite:Props) => {
    const [favoriteDetails, setFavoriteDetails] = useState({id:favorite.id, title:favorite.title, spoonacularSourceUrl:favorite.spoonacularSourceUrl})
    
    const updateFavorite = () => {
        console.log(`Updating: ${favoriteDetails.title}`);
        const docRef = doc(db, 'Favorite Recipes', favoriteDetails.id)
        updateDoc(docRef, {
          id:favoriteDetails.id,
          title:favoriteDetails.title,
          spoonacularSourceUrl:favoriteDetails.spoonacularSourceUrl
        }).then(() => {
          console.log(`Successfully updated: ${favoriteDetails.title}`);
          alert(`${favoriteDetails.title} successfully updated.\nGood job!`)
          setTimeout(() => location.reload(), 2000)
        }).catch(error =>{
          console.log(error);
          alert(`Failed to update ${favorite.title}`)
        })
      }

    if (!favorite.open) return (<></>);
    return (
        <div
        onClick={ favorite.onClose }
        className='fixed w-full h-full flex  z-1 justify-center  bg-gray-300 bg-opacity-25'
        >
            <div
            className='max-w-600px w-2/5 fixed flex z-1 bg-white shadow-xl rounded'
            onClick={(e) => {
                e.stopPropagation()
            }}
            >
                <div className="w-full flex bg-yellow-300 border-4 rounded border-green-800 text-green-800 flex-col">
                    <div className="flex flex-col m-2 p-2">
                        <h1 className="text-lg">Recipe Title</h1>
                        <input 
                        className='border rounded border-green-800'
                        type="text" 
                        placeholder={`${favorite.title}`}
                        value={favoriteDetails.title}
                        onChange={(e) => setFavoriteDetails({
                            ...favoriteDetails, title: e.target.value
                        })} />
                    </div>
                    <div className="flex flex-col m-2 p-2">
                        <h1 className="text-lg">Recipe URL</h1>
                        <input
                        className='border rounded border-green-800'
                        type="text"
                        placeholder={`${favorite.spoonacularSourceUrl}`}
                        value={favoriteDetails.spoonacularSourceUrl}
                        onChange={(e) => setFavoriteDetails({
                            ...favoriteDetails, spoonacularSourceUrl: e.target.value
                        })} />
                    </div>
                    <div>
                        <button className ='border rounded bg-green-800 border-yellow-400 shadow-md hover:shadow-lg text-yellow-300 p-1 m-1 hover:border-yellow-200 hover:text-yellow-200 hover:bg-green-700'
                        onClick={updateFavorite}>Update Favorite</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal
