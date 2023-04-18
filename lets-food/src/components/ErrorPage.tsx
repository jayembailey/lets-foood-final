import { useRouteError } from "react-router-dom"
import Navbar from "./Navbar";

export default function ErrorPage() {
    const error:any = useRouteError();
    console.error(error);

    return (
        <>
            <Navbar />
            <div className='flex flex-col text-center m-5'>
                <h1 className='text-bold text-lg m-4'>Oops!</h1>
                <p>Somethin' done messed up!</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </>
    )
}


