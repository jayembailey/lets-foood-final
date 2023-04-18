import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react'
import { db } from '../config/firebase';
import UpdateModal from './UpdateModal'

interface FavoriteProps {
    key:string,
    id:string,
    title:string,
    spoonacularSourceUrl:string
}

const Favorite = (favorite:FavoriteProps) => {
  const [ open, setOpen ] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
      setOpen(false)
  };

  const deleteFavorite = (favorite:FavoriteProps) => {
    console.log(favorite.id);
    console.log(`Deleting: ${favorite.id}`);
    deleteDoc(doc(db, "Favorite Recipes", favorite.id)).then(() => {
      console.log(`Successfully deleted: ${favorite.id}`);
      setTimeout(() => {location.reload()}, 3000)
    }).catch(error => {
      console.log(error);
      alert('Problem deleting Recipe')
    })
  }

  return (
    <>
      <UpdateModal 
        id={favorite.id}
        title={favorite.title}
        spoonacularSourceUrl={favorite.spoonacularSourceUrl}
        open={open}
        onClose={handleClose}
        />
      <div className='m-1 w-full'>
        <div className='flex justify-between border text-yellow-400 border-yellow-500 bg-green-800 bg-opacity-95'>
          <div className='flex-col flex'>
            <strong className=''>{favorite.title}</strong>
            <a href={`${favorite.spoonacularSourceUrl}`} className='hover:text-yellow-200 underline p-1'>Click here for recipe information.</a>
          </div>
          <div>
            <button onClick={handleOpen} className="border-2 m-2 p-1 hover:bg-yellow-200 border-yellow-500 text-green-800 rounded bg-yellow-400 bg-opacity-90">Update</button>
            <button onClick={() => deleteFavorite(favorite)} className="border-2 m-2 p-1 hover:bg-yellow-200 border-yellow-500 text-green-800 rounded bg-yellow-400 bg-opacity-90">Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Favorite
