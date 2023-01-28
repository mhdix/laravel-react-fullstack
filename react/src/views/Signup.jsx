import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [error, setError] = useState(null);
    const {setUser, setToken} = useStateContext()
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload)
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                console.log(err)
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.errors);
                }
            })

    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <h1 className='title'>
                        signup for free
                    </h1>
                    {
                        error && <div className='alert'>
                            {Object.keys(error).map(key => (
                                <p key={key}>{error[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} placeholder='Full Name' type='name'/>
                    <input ref={emailRef} placeholder='Email' type='email'/>
                    <input ref={passwordRef} placeholder='password' type='password'/>
                    <input ref={passwordConfirmationRef} placeholder='password Confirmation' type='password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Already registered? <Link to='/login'>Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
