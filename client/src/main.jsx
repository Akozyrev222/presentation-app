import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import {
    createBrowserRouter, redirect,
    RouterProvider,
} from "react-router-dom";

const id = window.location.pathname.slice(1)

const router = createBrowserRouter([
    {
        path: '/',
        loader: () => {
            const id = window.location.pathname.slice(1)
            if (!id) {
                return redirect(`/f${(+new Date).toString(16)}`)
            }
            return null;
        }
    },
    {
        path: "/:id",
        element: <App/>,
    },
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
