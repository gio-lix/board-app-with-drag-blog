import React, {SyntheticEvent, useEffect, useState} from 'react';
import s from "./Signup.module.scss";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import authApi from "../../api/apiAuth";

const Signup = () => {
    const navigate = useNavigate()
    const [userErrorText, setUserErrorText] = useState<string>("")
    const [user, setUser] = useState(
        {
            username: "",
            password: "",
            confirmPassword: "",
            email: ""
        })
    const [isFocused, setIsFocused] = useState({focus: ""})

    const onHandleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        const {name, value}:any = e.target
        setUser({...user,[name]: value})
    }

    const onHandleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (Object.values(user).includes('')) {
            Object.entries(user).map((el) => {
                if (el[1].trim() === "") {
                   return  setUserErrorText("please fill empty value")
                }
                return el
            })
            return
        }
        if (user.confirmPassword !== user.password) return
        const {confirmPassword, ...arg} = user
        try {
            const {data} = await authApi.signUp(arg)
            localStorage.setItem('token', data.token)
            navigate("/")
        } catch (err) {
            console.log("err - ", err)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setUserErrorText("")
        },1500)
        return () => clearTimeout(timer)
    },[userErrorText])

    //
    return (
        <section  className={s.root}>
            <form onSubmit={onHandleSubmit}>
                <h1>Signup</h1>
                <p className={s.error}>{userErrorText}</p>
                <label htmlFor="username">
                    <p>username</p>
                    <input
                        autoComplete="off"
                        type="text"
                        placeholder="user name"
                        name="username"
                        id="username"
                        value={user.username }
                        onChange={onHandleChange}
                        onFocus={() => setIsFocused({focus:"username"})}
                        className={clsx(isFocused?.focus === "username" ? s.activeInput : "")}
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
                <label htmlFor="confirmPassword">
                    <p>confirm password</p>
                    <input
                        autoComplete="off"
                        type="password"
                        placeholder="confirm password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={user.confirmPassword }
                        onChange={onHandleChange}
                        onFocus={() => setIsFocused({focus:"confirmPassword"})}
                        className={clsx(isFocused?.focus === "confirmPassword" ? s.activeInput : "")}
                    />
                </label>
                <label htmlFor="email">
                    <p>email</p>
                    <input
                        autoComplete="off"
                        type="email"
                        placeholder="email"
                        id="email"
                        name="email"
                        value={user.email }
                        onChange={onHandleChange}
                        onFocus={() => setIsFocused({focus:"email"})}
                        className={clsx(isFocused?.focus === "email" ? s.activeInput : "")}
                    />
                </label>
                <button type="submit">submit</button>
            </form>
            <p onClick={() => navigate("/login")}>Dont have an account? <span>Login</span></p>
        </section>
    );
};

export default Signup;