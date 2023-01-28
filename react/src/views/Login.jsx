import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";


const Login = () => {

    // error state
    const [error, setError] = useState(null);

    // context
    const {setUser, setToken} = useStateContext()

    // ref
    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        console.log(payload)

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors){
                        setError(response.data.errors);
                    }else {
                        setError({
                            email: [response.data.message]
                        })
                        console.log([response.data.message])
                    }
                }
            })
    }

    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className='form'>
                {
                    error && <div className='alert'>
                        {Object.keys(error).map(key => (
                            <p key={key}>{error[key][0]}</p>
                        ))}
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <h1 className='title'>
                        Login into your account
                    </h1>
                    <input ref={emailRef} type="text" placeholder='Email'/>
                    <input ref={passwordRef} type="text" placeholder='password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered <Link to='/signup'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
