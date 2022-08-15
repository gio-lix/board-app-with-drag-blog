import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import authUtils from "../utils/authUtils";
import Loading from "../components/loading";
import {useAppDispatch} from "../redux/store";
import {setUser} from "../redux/slices/userSlice";
import SideBar from "../components/sideBar";

const AppLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthentication()
            if (!user) {
                navigate("/login")
            } else {
                dispatch(setUser(user))
                setLoading(false)
            }
        }
        checkAuth()
    }, [navigate])

    return (
        loading ? (
            <Loading/>
        ) : (
            <section className="flex">
                <SideBar />
                <Outlet/>
            </section>
        )
    );
};

export default AppLayout;