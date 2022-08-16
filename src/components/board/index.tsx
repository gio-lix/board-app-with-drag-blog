import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import boardApi from "../../api/boardApi";
import {BoardState} from "../../typeing";
import s from "./Board.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {setBoards} from "../../redux/slices/boardSlice";
import {AiFillStar, AiOutlineStar} from "react-icons/ai"
const EmojiPicker = lazy(() => import("../emojiPicker"))



const Board = () => {
    const dispatch = useAppDispatch()
    const {value} = useAppSelector((state: RootState) => state.board)
    const [board, setBoard] = useState<BoardState>()
    const [icon, setIcon] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const {boardId} = useParams()


    useEffect(() => {
        let mounted = true
        const getBoard = async () => {
            try {
                const {data} = await boardApi.getOne(boardId)
                if (mounted)  {
                    setBoard(data)
                    setIcon(data?.icon)
                    setTitle(data.title)
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

        try {
            await boardApi.updatePosition(boardId, {icon: item})
        } catch (err) {
            console.log(err)
        }
    }

    const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value
        setBoard({...board, title:newTitle } as any)


        const _temp: BoardState[] = [...value]
        const index = _temp.findIndex((e:BoardState) => e.id === boardId)
        _temp[index] = {..._temp[index], title: newTitle }
        dispatch(setBoards(_temp))

        try {
            await boardApi.updatePosition(boardId, {title: newTitle })
        } catch (err) {
            console.log(err)
        }
    }

    const updateDescription = async (e: any) => {
        const newDesc = e.target.value
        setBoard({...board, description:newDesc } as any)

        const _temp: BoardState[] = [...value]
        const index = _temp.findIndex((e:BoardState) => e.id === boardId)
        _temp[index] = {..._temp[index], description: newDesc }
        dispatch(setBoards(_temp))

        try {
            await boardApi.updatePosition(boardId, {description: newDesc })
        } catch (err) {
            console.log(err)
        }
    }

    const onUpdateFavorite = async () => {
        try {
            await boardApi.updatePosition(boardId, {favorite: !board?.favorite })
            setBoard({...board, favorite: !board?.favorite} as any)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <section className={s.root}>
            <span className={s.star} onClick={onUpdateFavorite}>
                {board?.favorite ? <AiFillStar fill="yellow" /> : <AiOutlineStar />}
            </span>

            <div className={s.box}>
                <div className={s.emojiPicker}>
                    <Suspense  fallback={`<p>...</p>`}>
                        <EmojiPicker
                            icon={icon && icon}
                            onChangeIcon={onChangeIcon}
                        />
                    </Suspense>
                </div>
                <input
                    type="text"
                    value={board?.title || ""}
                    onChange={updateTitle}
                    className={s.title}

                />
                <textarea
                    className={s.desc}
                    value={board?.description || ""}
                    onChange={updateDescription}
                />
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