import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState()
    useEffect(() => {
        getUser()
    }, [])

    const onDelete = (user) => {
        setLoading(true)

        if (!window.confirm("Are you sure want to delete this user")) {
            return;
        }
        axiosClient.delete(`/user/${user.id}`).then(() => {
            getUser();
        })
    }

    const getUser = () => {
        setLoading(true)
        axiosClient.get('/user').then(({data}) => {
            setLoading(false)
            setUsers(data.data)
        }).catch(() => {
            setLoading(false)
        })
    }
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>User</h1>
                <Link to='/user/new' className='btn-add'>Add New</Link>
            </div>
            <div className='cart animated fadeInDown'>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {loading &&
                        <tbody>
                        <tr>
                            <td colSpan='5' className='text-center'>
                                Loading ...
                            </td>
                        </tr>
                        </tbody>}
                    {!loading &&
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.crated_at}</td>
                                <td>
                                    <Link to={'/user/' + user.id} className='btn-edit'>Edit</Link>
                                    &nbsp;
                                    <button onClick={e => onDelete(user)} className='btn-delete'>delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
