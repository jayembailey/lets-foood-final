import { useState } from "react"
import { db, auth } from "../config/firebase"
import { collection, addDoc } from "firebase/firestore"


interface RecipeProps {
    key:string,
    id:string,
    title:string,
    spoonacularSourceUrl:string,
}

const Recipe = ( recipe:RecipeProps ) => {
  const uid = auth.currentUser?.uid

  const [ favoriteSelection, setFavoriteSelection ] = useState({ uid: uid, id:recipe.id, title:recipe.title, spoonacularSourceUrl:recipe.spoonacularSourceUrl})

  const handleSubmit = () => {
    setFavoriteSelection({...favoriteSelection, uid: uid, id:recipe.id, title:recipe.title, spoonacularSourceUrl:recipe.spoonacularSourceUrl})
    console.log(favoriteSelection)
    const collRef = collection(db, 'Favorite Recipes');
    addDoc(collRef, {
      uid:favoriteSelection.uid,
      id:favoriteSelection.id,
      title:favoriteSelection.title,
      spoonacularSourceUrl:favoriteSelection.spoonacularSourceUrl
    }).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error.code, error.message);
    });
    }

  return (
    <div className="m-1 w-full shadow-lg">
      <div className="flex justify-between border border-yellow-500 p-1 bg-green-800 bg-opacity-95 text-yellow-400">
        <div>
          <strong>{recipe.title}</strong>
          <div>
            <a className="underline hover:text-yellow-200" href={`${recipe.spoonacularSourceUrl}`}>Click here for recipe information.</a>
          </div>
        </div>
        <button onClick={handleSubmit} className="border-2 m-2 hover:bg-yellow-200 border-yellow-500 text-green-800 rounded bg-yellow-400 bg-opacity-90">Add to Favorites</button>
      </div>
    </div>
  )
}

export default Recipe
