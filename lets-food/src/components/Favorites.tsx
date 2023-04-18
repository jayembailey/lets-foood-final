import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db, auth } from "../config/firebase"
import Favorite from "./Favorite"

interface RecipeDataProps {
    key:string,
    uid:string,
    id:string,
    title:string,
    spoonacularSourceUrl:string
}

const Favorites = (recipe:RecipeDataProps) => {
    const authUid = auth.currentUser?.uid
    const [ recipeData, setRecipeData ] = useState([{key:recipe.id, uid:recipe.uid, id:recipe.id, title:recipe.title, spoonacularSourceUrl:recipe.spoonacularSourceUrl}])

    useEffect(() => {
        const collref = collection(db, 'Favorite Recipes')
        
        let cloudData:any = [];
        getDocs(collref).then(querysnapshot => {
            console.log(querysnapshot);
            querysnapshot.forEach(query => {
                let queryID = query.data();
                if (queryID.uid === authUid) {
                    console.log(queryID.uid, query.id);
                    cloudData.push({...query.data(), id:query.id})
                }
            })
            console.log(cloudData);
            setRecipeData(cloudData)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div>
            <div>
                {recipeData.map(recipe => {
                    return <Favorite key={recipe.id} id={recipe.id} title={recipe.title} spoonacularSourceUrl={recipe.spoonacularSourceUrl} />
                })}
            </div>
        </div>
    )
}

export default Favorites
