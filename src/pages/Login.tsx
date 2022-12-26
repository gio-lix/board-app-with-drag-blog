import React, {SyntheticEvent, useState} from 'react';
import authApi from "../api/apiAuth";

import {useNavigate} from "react-router-dom";
import ValidationLayout from "../components/validationLayout";

import {ILogin} from "../typeing";



const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")
    const [user, setUser] = useState<ILogin>({email: "", password: ""})

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const onHandleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log(!user.email.trim())
        if (!user.password.trim() || !user.email.trim()) {
            setError("please fill empty value")
            return
        }
        try {
            const {data} = await authApi.login(user)
            localStorage.setItem('token', data.token)
            navigate("/")
        } catch (err) {
            setError((err as any).response.data.message)
        }
    }

    return (
        <>
            <ValidationLayout title="login" error={error} setError={setError}>
                <form onSubmit={onHandleSubmit}  >
                    <label htmlFor="email">
                        <p>email</p>
                        <input
                            autoComplete="off"
                            type="email"
                            placeholder="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={onHandleChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <p>password</p>
                        <input
                            autoComplete="off"
                            type="password"
                            placeholder="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={onHandleChange}
                        />
                    </label>
                    <button type="submit">submit</button>
                </form>
                <p className="sign-nav" onClick={() => navigate("/signup")}>Dont have an account? <span>Signup</span></p>
            </ValidationLayout>
        </>
    );
};

export default Login;

