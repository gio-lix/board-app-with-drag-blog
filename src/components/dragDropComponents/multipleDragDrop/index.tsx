import React, {FC, useEffect, useRef} from 'react';
import s from "./MultipleDragDrop.module.scss"
import taskApi from "../../../api/taskApi";

interface SectionState {
    _id: string
    board: string
    title: string
    id:string
}

interface TasksState {
    _id: string
    id:string
    content: string
    position: number
    section: SectionState
    title: string
}


interface PropsState {
    _id: string
    board: string
    tasks: TasksState[]
    title: string
    id:string
}

interface Props {
    activeIndex: any
    setActiveIndex: Function
    boardId: any
    setCount: Function
}

const MultipleDragDrop: FC<Props> = ({activeIndex, boardId, setActiveIndex, setCount}) => {
    let dragItemRef = useRef<any>(null)
    let dragEndItemRef = useRef<any>(null)
    let dragOverItemRef = useRef<any>(null)




    const handleSort = async () => {
        const { sectionId} = dragOverItemRef.current
        const {boardIndex, itemIndex} = dragItemRef.current
        const {boardEndIndex, itemEndIndex} = dragEndItemRef.current

        let sourceSectionId = activeIndex[boardIndex].tasks[itemIndex].id


        let x = activeIndex[boardIndex].tasks
        let y = activeIndex[boardEndIndex].tasks

        let _items = [...activeIndex]
        const draggedItemContext = _items[boardIndex].tasks.splice(itemIndex, 1)[0]
        _items[boardEndIndex].tasks.splice(itemEndIndex, 0, draggedItemContext)



        try {
            await taskApi.updatePosition(boardId, {
                resourceList: x,
                destinationList: y,
                resourceSectionId: sourceSectionId,
                destinationSectionId: sectionId,
            })
            setActiveIndex(_items)
            setCount((prev: number) => prev + 1)
        } catch (err) {
            console.log(err)
        }

        dragItemRef.current = null
        dragEndItemRef.current = null
        dragOverItemRef.current = null
    }


    return (
        <>
            {activeIndex?.map((el: PropsState, index: number) => {
                return (
                    <div key={index} className={s.root}>
                        {el.tasks.map((e: TasksState, idx: number) => {
                            return (
                                <div
                                    key={idx}
                                    onDragStart={() => dragItemRef.current = {
                                        boardIndex: index,
                                        itemIndex: idx
                                    }}
                                    onDragEnter={() => dragEndItemRef.current = {
                                        boardEndIndex: index,
                                        itemEndIndex: idx
                                    }}
                                    draggable
                                    onDragEnd={handleSort}
                                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                                        e.preventDefault()
                                        dragOverItemRef.current = {sectionId:  el.tasks[idx]?.section?.id}
                                    }}
                                    className={s.content}>
                                    {e.section?.title}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    );
};

export default MultipleDragDrop;