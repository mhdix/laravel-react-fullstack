import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
    const {user, setUser, token, setToken , notification} = useStateContext()
    if (!token) {
        return <Navigate to='/login'/>
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(()=>{
            setToken(null)
            setUser({})
        })
    }

    useEffect(()=>{
        axiosClient.get('/user').then(({data})=>{
            setUser(data)
        })
    },[])
    return (
        <div id='defaultLayout'>
            <aside>
                <Link to='/dashboard'>dashboard</Link>
                <Link to='/user'>user</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>
            {notification &&
                <div className='notification'>
                    {notification}
                </div>
            }

        </div>
    )
}
