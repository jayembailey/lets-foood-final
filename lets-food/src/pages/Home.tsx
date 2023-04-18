import Background from '../assets/wings.avif'

const Home = () => {

  return (
    <div style={{backgroundImage:`url(${ Background })`}}
    className='flex flex-row justify-center mx-auto-bg-fixed bg-cover'>
    <div className='flex place-items-center h-screen '>
      <div className=" bg-yellow-400 bg-opacity-80 font-bold text-green-800 rounded-lg font-serif">
        <h1 className='p-1 m-3 text-center'>
            Your Recipe Book</h1>
        <h3 className='font-semibold p-1 m-3'>
          <a href="/signin" className='underline'> Sign in </a> to build your collection</h3>
      </div>
    </div>
    </div>
  )
}

export default Home
