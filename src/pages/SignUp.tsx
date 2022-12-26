import React, {SyntheticEvent,  useState} from 'react';

import {useNavigate} from "react-router-dom";
import ValidationLayout from "../components/validationLayout";
import authApi from "../api/apiAuth";
import {IRegister} from "../typeing";

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")
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
            <form onSubmit={onHandleSubmit}  >
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
                    />
                </label>
                <button type="submit">submit</button>
            </form>
            <p className="sign-nav" onClick={() => navigate("/login")}>Dont have an account? <span>Login</span></p>
        </ValidationLayout>


    );
};

export default Signup;