import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, userState } from "../features/userSlice";
import { Navigate } from "react-router-dom";

export default function SignIn() {
    const userData = useSelector(userState);
    const dispatch = useDispatch();
    const [user, setUser] = useState({email: '', password: ''});

    if(userData.profile.id !== '') {
        return <Navigate to='/user' replace={true} />
    }

    const handleChange = (e) => 
        setUser(prevState => ({...prevState, [e.target.name]: e.target.value}))
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logIn(user));
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" name='email' onChange={handleChange} value={user.email}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={handleChange} value={user.password}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    )
}