import React, {useEffect, useRef, useState} from 'react';
import s from "./SideBar.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {MdOutlineLogout} from "react-icons/md"
import {FaPlusSquare} from "react-icons/fa"
import {NavLink, useNavigate, useParams} from "react-router-dom";
import boardApi from "../../api/boardApi";
import {setBoards} from "../../redux/slices/boardSlice";
import {BoardState} from "../../typeing";


const SideBar = () => {
    const [activeIndex, setActiveIndex] = useState<any>()
    const {value} = useAppSelector((state: RootState) => state.user)
    const {value: boards} = useAppSelector((state: RootState) => state.board)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {boardId} = useParams()

    let dragItemRef = useRef<any>(null)
    let dragOverItemRef = useRef<any>(null)


    useEffect(() => {
        let mounted = true;
        const getBoards = async () => {
            try {
                const {data} = await boardApi.getAll()
                if (mounted) {
                    dispatch(setBoards(data))
                }
            } catch (err) {
                console.log(err)
            }
        }
        getBoards()
        return () => {mounted = false}
    }, [dispatch])

    useEffect(() => {
        const activeIndex = boards.findIndex((e: BoardState) => e.id === boardId)

        if (boards.length > 0 && boardId === undefined) {
            navigate(`/boards/${(boards[0] as BoardState).id}`)
        }

        setActiveIndex(activeIndex)
        setActiveIndex(boards)
    }, [boards, boardId, navigate])


    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const handleSort = () => {
        let _items = [...activeIndex]

        const draggedItemContext = _items.splice(dragItemRef.current, 1)[0]
        _items.splice(dragOverItemRef.current, 0, draggedItemContext)

        dragItemRef.current = null
        dragOverItemRef.current = null

        setActiveIndex(_items)
    }

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



    return (
        <aside className={s.root}>
            <div className={s.head}>
                <h3>{value.email}</h3>
                <span className={s.logout} onClick={logout}>
                     <MdOutlineLogout/>
                 </span>
            </div>
            <div className={s.head}>
                <h3>Favorites</h3>
            </div>
            <div className={s.head} onClick={addBoard}>
                <h3>Private</h3>
                <span className={s.add}>
                     <FaPlusSquare/>
                 </span>
            </div>
            {activeIndex?.map((item: BoardState, index: number) => (
                <NavLink
                    className={s.head}
                    to={`/boards/${item.id}`}
                    key={`${item._id}-${index}`}
                    draggable
                    onDragStart={(e) => dragItemRef.current = index}
                    onDragEnter={(e) => dragOverItemRef.current = index}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p>{item.icon} {item.title}</p>
                </NavLink>
            ))}
        </aside>
    );
};

export default SideBar;