import Recipe from './Recipe'

interface RecipeListProps {
    results?: any
}

function RecipeList( recipeData:RecipeListProps ) {
  return (
      <div>
        <h1 className='mt-2'>
           {/* kittens! */}
            {recipeData.results.map((result:any) => {
              return <Recipe key={result.id} id={result.id} title={result.title} 
                      spoonacularSourceUrl={result.spoonacularSourceUrl} />
            })}
        </h1>
      </div>
  )
}

export default RecipeList
