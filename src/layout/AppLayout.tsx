import React, {useEffect, useState} from 'react';
import {Outlet,  useNavigate} from "react-router-dom"
import authUtils from "../utils/authUtils";
import Loading from "../components/loading";
import {useAppDispatch} from "../redux/store";
import {setUser} from "../redux/slices/userSlice";
import SideBar from "../components/sideBar";

const AppLayout = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let mounted = true;
        const checkAuth = async () => {
            const user = await authUtils.isAuthentication()
            if (!user) {
                navigate("/login")
            } else {
                if (mounted) {
                    dispatch(setUser(user))
                    setLoading(false)
                }
            }
        }
        checkAuth()
        return () => {mounted = false}
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