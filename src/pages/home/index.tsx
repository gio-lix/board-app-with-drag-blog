import React from 'react';
import s from "./Home.module.scss"
import boardApi from "../../api/boardApi";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const createBoard = async () => {
        try {
            const {data} = await boardApi.create()
            navigate(`/boards/${data.user}`)
        } catch (err) {
            console.log("err - ", err)
        }
    }

    return (
        <section className={s.root}>
            <div onClick={createBoard} className={s.titleBox}>
                <p>Click here to create first board</p>
            </div>
        </section>
    );
};

export default Home;