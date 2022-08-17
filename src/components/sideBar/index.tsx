import React from 'react';
import s from "./SideBar.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {AiFillStar} from "react-icons/ai"
import {MdOutlineLogout} from "react-icons/md"
import {FaPlusSquare} from "react-icons/fa"
import {useNavigate} from "react-router-dom";
import boardApi from "../../api/boardApi";
import {setBoards} from "../../redux/slices/boardSlice";
import Favorites from "../favoritesLists";
import AddPrivate from "../add";

const SideBar = () => {
    const {value} = useAppSelector((state: RootState) => state.user)
    const {value: boards} = useAppSelector((state: RootState) => state.board)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const addBoard = async () => {
        try {
            const {data} = await boardApi.create()
            const newList = [data, ...boards]
            dispatch(setBoards(newList))
            navigate(`/boards/${data._id}`)
        } catch (err) {
            console.log("err - ", err)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <aside className={s.root}>
            <div className={s.head}>
                <h3>{value.email}</h3>
                <span className={s.logout} onClick={logout}>
                     <MdOutlineLogout/>
                </span>
            </div>

            {/* favorite */}
            <div className={s.head}>
                <h3>Favorites</h3>
                <span>
                     <AiFillStar/>
                 </span>
            </div>
            <Favorites />

            {/* private */}
            <div className={s.head} onClick={addBoard}>
                <h3>Private</h3>
                <span className={s.add}>
                     <FaPlusSquare/>
                 </span>
            </div>
            <AddPrivate />
        </aside>
    );
};

export default SideBar;


