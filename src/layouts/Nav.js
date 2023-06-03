import { NavLink } from "react-router-dom"
import logo from "../assets/img/argentBankLogo.png"
import { useDispatch, useSelector } from "react-redux"
import { resetState, userState } from "../features/userSlice"

export default function Nav() {
    const userData = useSelector(userState);
    const dispatch = useDispatch();
    
    return (
        <nav className="main-nav">
            <NavLink to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                <NavLink to={userData.token !== '' ? '/user' : '/sign-in'} className="main-nav-item">
                    <i className="fa fa-user-circle"></i> {userData.token !== '' ? userData.profile.userName : 'Sign In'}
                </NavLink>

                {userData.token !== '' ? 
                    <NavLink 
                        to="/"
                        className="main-nav-item"
                        onClick={() => dispatch(resetState())}
                    >
                        <i className="fa fa-sign-out"></i> Sign Out
                    </NavLink>
                : ''}
            </div>
        </nav>
    )
}