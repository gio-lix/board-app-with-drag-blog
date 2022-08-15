import React, {SyntheticEvent, useState} from 'react';
import s from "./Login.module.scss"
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import authApi from "../../api/apiAuth";


const Login = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({email: "", password: ""})
    const [isFocused, setIsFocused] = useState({focus: ""})

    const onHandleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        const {name, value}:any = e.target
        setUser({...user,[name]: value})
    }

    const onHandleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        try {
            const {data} = await authApi.login(user)
            localStorage.setItem('token', data.token)
            navigate("/")
        } catch (err) {
            console.log("err - ", err)
        }
    }

    return (
        <section  className={s.root}>

            <form onSubmit={onHandleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">
                    <p >email</p>
                    <input
                        autoComplete="off"
                        type="email"
                        placeholder="email"
                        name="email"
                        id="email"
                        value={user.email }
                        onChange={onHandleChange}
                        onFocus={() => setIsFocused({focus:"email"})}
                        className={clsx(isFocused?.focus === "email" ? s.activeInput : "")}
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
                        value={user.password }
                        onChange={onHandleChange}
                        onFocus={() => setIsFocused({focus:"password"})}
                        className={clsx(isFocused?.focus === "password" ? s.activeInput : "")}
                    />
                </label>
                <button type="submit">submit</button>
            </form>
            <p onClick={() => navigate("/signup")}>Dont have an account? <span>Signup</span></p>
        </section>
    );
};

export default Login;