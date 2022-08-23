import React, { useEffect, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {useNavigate, useParams} from "react-router-dom";
import boardApi from "../../api/boardApi";
import {setBoards} from "../../redux/slices/boardSlice";
import {BoardState} from "../../typeing";
import DragDrop from "../drop/DragDrop";
import SidebarContent from "../dragDropComponents/sidebarContent";



const AddPrivate = () => {
    const [activeIndex, setActiveIndex] = useState<any>()
    const {value: boards} = useAppSelector((state: RootState) => state.board)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {boardId} = useParams()

    useEffect(() => {
        let mounted = true;
        (async function getBoards() {
            try {
                const {data} = await boardApi.getAll()
                if (mounted) {
                    dispatch(setBoards(data))
                }
            } catch (err) {
                console.log(err)
            }
        })();
        return () => {
            mounted = false
        }
    }, [dispatch])


    useEffect(() => {
        if (boards.length > 0 ) {
            navigate(`/boards/${(boards[0] as BoardState).id}`)
        }
        const activeIndex = boards?.findIndex((e: BoardState) => e.id === boardId)
        setActiveIndex(activeIndex)
        setActiveIndex(boards)
    }, [boards])


    const onNavigateLink = (id: string) => {
        navigate(`/boards/${id}`)
    }

    return (
        <>
            <DragDrop
                onNavigate={onNavigateLink}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                Component={(item: any) => <SidebarContent items={item} />}
            />
        </>
    );
};

export default AddPrivate;