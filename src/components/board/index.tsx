import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import boardApi from "../../api/boardApi";
import {BoardState} from "../../typeing";
import s from "./Board.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {setBoards} from "../../redux/slices/boardSlice";
const EmojiPicker = lazy(() => import("../emojiPicker"))


const Board = () => {
    const dispatch = useAppDispatch()
    const {value} = useAppSelector((state: RootState) => state.board)
    const [board, setBoard] = useState<BoardState>()
    const [icon, setIcon] = useState<string>("")
    const {boardId} = useParams()


    useEffect(() => {
        let mounted = true
        const getBoard = async () => {
            try {
                const {data} = await boardApi.getOne(boardId)
                if (mounted)  {
                    setBoard(data)
                    setIcon(data?.icon)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getBoard()
        return () => {mounted = false}
    },[boardId])


    const onChangeIcon = async (item: string) => {
        const _temp: BoardState[] = [...value]
        const index = _temp.findIndex((e:BoardState) => e.id === boardId)
        _temp[index] = {..._temp[index], icon: item }
        dispatch(setBoards(_temp))
        setIcon(item)

        // try {
        //     await boardApi.updatePosition(boardId, {icon: item})
        // } catch (err) {
        //     console.log("err-r ", err)
        // }
    }


    return (
        <section className={s.root}>
            <span  className={s.star} role='image' aria-label="star">✩</span>

            <div className={s.box}>
                <div >
                    <Suspense  fallback={`<p>...</p>`}>
                        <EmojiPicker
                            icon={icon && icon}
                            onChangeIcon={onChangeIcon}
                        />
                    </Suspense>
                </div>
                <h4>{board?.title}</h4>
                {board?.description.split('\n').map(str => <p className={s.desc1}>{str}</p>)[0]}
                {board?.description.split('\n')
                    .map((str , i) => <p className={s.desc} key={i}>{str}</p>)
                    .slice(1,-1)
                }
            </div>
            <div>
                <button>
                    Add Section
                </button>
                <p>
                    <span>{board?.sections.length}</span>
                    Section
                </p>
            </div>
            <hr />
        </section>
    );
};

export default Board;