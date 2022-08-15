import React from 'react';
import s from "./SideBar.module.scss"
import {RootState, useAppSelector} from "../../redux/store";
import {MdOutlineLogout} from "react-icons/md"
import {FaPlusSquare} from "react-icons/fa"
import {useNavigate} from "react-router-dom";




const SideBar = () => {
    const {value} = useAppSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <aside className={s.root}>
            <div className={s.head}>
                <h3>{value.email}</h3>
                 <span className={s.logout} onClick={logout}>
                     <MdOutlineLogout />
                 </span>
            </div>
            <div className={s.head}>
                <h3>Favorites</h3>
            </div>
            <div className={s.head}>
                <h3>Private</h3>
                <span>
                     <FaPlusSquare />
                 </span>
            </div>
        </aside>
    );
};

export default SideBar;