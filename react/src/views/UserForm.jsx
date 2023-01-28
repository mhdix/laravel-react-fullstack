import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function UserForm() {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/user/${id}`).then(({data}) => {
                setLoading(false)
                setUser(data)
            }).catch(() => {
                setLoading(false)
            })
        }, [])
    }

    const onSubmit = () => {

    }

    return (
        <>
            {user.id && <h1>User Update: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className='card animated fadeInDown'>
                {loading && (
                    <div className='text-center'>Loading...</div>
                )}
                {
                    error && <div className='alert'>
                        {Object.keys(error).map(key => (
                            <p key={key}>{error[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({...user , name: ev.target.value}) } type="text" placeholder='Name' />
                        <input value={user.email} onChange={ev => setUser({...user , email: ev.target.value}) } type="text" placeholder='Email' />
                        <input onChange={ev => setUser({...user , password: ev.target.value}) } type="text" placeholder='Password' />
                        <input onChange={ev => setUser({...user , password_confirmation: ev.target.value}) } type="text" placeholder='Password Confirmation' />
                        <button className='btn'>Save</button>
                    </form>
                }
            </div>

        </>
    )
}
