import { useState } from "react";
import { Account } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { userState, setUserName } from "../features/userSlice";
import { Navigate } from "react-router-dom";


export default function User() {
    const userData = useSelector(userState);
    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [userNameValue, setUserNameValue] = useState(userData.profile.userName);

    if(userData.profile.id === '') {
        return <Navigate to='/sign-in' replace={true} />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {'token': userData.token, 'userName': userNameValue};
        dispatch(setUserName(user));
        setEdit(!edit);
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{userData.profile.firstName} {userData.profile.lastName}!</h1>
                {edit ?
                    <form className="form-edit" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" onChange={(e) => setUserNameValue(e.target.value)} value={userNameValue} />
                        </div>
                        <button className="sign-in-button">Save changes</button>
                    </form> :
                    <button
                        className="edit-button"
                        onClick={() => setEdit(!edit)}
                    >
                        Edit name
                    </button>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    )
}