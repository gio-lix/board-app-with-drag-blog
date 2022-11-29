import React from 'react';
import boardApi from "../api/boardApi";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/store";
import {setBoards} from "../redux/slices/boardSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const createBoard = async () => {
        try {
            const {data} = await boardApi.create()
            dispatch(setBoards([data]))
            navigate(`/boards/${data?._id}`)
        } catch (err) {
            console.log("err - ", err)
        }
    }


    return (
        <section className="home">
            <div onClick={createBoard} className="titleBox">
                <p>Click here to create first board</p>
            </div>
        </section>
    );
};

export default Home;