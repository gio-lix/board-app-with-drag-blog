import React, {SyntheticEvent, useEffect, useState} from 'react';
import s from "./signup/Signup.module.scss";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import authApi from "../api/apiAuth";
import ValidationLayout from "../components/validationLayout";
import {IRegister} from "../typeing";

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")
    const [isFocused, setIsFocused] = useState({focus: ""})
    const [user, setUser] = useState<IRegister>({
            username: "",
            password: "",
            confirmPassword: "",
            email: ""
        })

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUser({...user,[name]: value})
    }

    const onHandleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (Object.values(user).includes('')) {
            Object.entries(user).map((el) => {
                if (el[1].trim() === "") {
                   return  setError("please fill empty value")
                }
                return el
            })
            return
        }
        if (user.confirmPassword !== user.password) {
            return  setError("password do not match")
        }
        const {confirmPassword, ...arg} = user
        try {
            const {data} = await authApi.signUp(arg)
            localStorage.setItem('token', data.token)
            navigate("/")
        } catch (err) {
            setError((err as any).response.data.message)
        }
    }



    return (
        <ValidationLayout title="Signup" setError={setError} error={error}>
            <form onSubmit={onHandleSubmit} className="sign-up">
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
                        className={clsx(isFocused?.focus === "username" ? "active-input" : "")}
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
                        className={clsx(isFocused?.focus === "password" ? "active-input" : "")}
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
                        className={clsx(isFocused?.focus === "confirmPassword" ? "active-input" : "")}
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
                        className={clsx(isFocused?.focus === "email" ? "active-input" : "")}
                    />
                </label>
                <button type="submit">submit</button>
            </form>
            <p className="sign-nav" onClick={() => navigate("/login")}>Dont have an account? <span>Login</span></p>
        </ValidationLayout>


    );
};

export default Signup;