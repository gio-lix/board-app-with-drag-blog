import React, {FC, useRef, useState} from 'react';
import s from "./MultipleDragDrop.module.scss"
import taskApi from "../../../api/taskApi";
import {AiFillDelete} from "react-icons/ai"
import {SectionsSate, TasksState} from "../../../typeing";
import TaskModel from "../../taskModel";



interface Props {
    activeIndex: SectionsSate[]
    setActiveIndex: Function
    boardId: string
    setCount: Function
}

const MultipleDragDrop: FC<Props> = ({activeIndex, boardId, setActiveIndex, setCount}) => {
    const [selectTask, setSelectTask] = useState<TasksState>()
    let dragItemRef = useRef<any>(null)
    let dragEndItemRef = useRef<any>(null)
    let dragOverItemRef = useRef<any>(null)



    const handleSort = async () => {
        const {sectionId} = dragOverItemRef.current
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

    const onUpdateTask = async (taskData: any , {boardIndex, itemIndex}:any) => {
        let _tasks = [...activeIndex]
        _tasks[boardIndex].tasks[itemIndex] = taskData
        setActiveIndex(_tasks)
    }

    const onDeleteTask = async (task: { boardIndex: number, itemIndex: number }): Promise<void> => {
        const {boardIndex, itemIndex} = task

        let _tasks = [...activeIndex]
        let boardItemId = _tasks[boardIndex]._id
        let taskItemId = _tasks[boardIndex].tasks[itemIndex]._id

        _tasks[boardIndex].tasks.splice(itemIndex, 1)
        setActiveIndex(_tasks)
        try {
            await taskApi.deleteTask(boardItemId, taskItemId)
        } catch (err) {
            console.log('err - ', err)
        }
    }



    return (
        <>
            {activeIndex?.map((section: SectionsSate, index: number) => {
                return (
                    <section key={index} className={s.root}>
                        {section.tasks.map((task: TasksState, idx: number) => {
                            return (
                                <div className={s.mainBox} key={idx}>
                                    <div

                                        draggable
                                        onDragStart={() => dragItemRef.current = {
                                            boardIndex: index,
                                            itemIndex: idx
                                        }}
                                        onDragEnter={() => dragEndItemRef.current = {
                                            boardEndIndex: index,
                                            itemEndIndex: idx
                                        }}
                                        onDragEnd={handleSort}
                                        onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                                            e.preventDefault()
                                            dragOverItemRef.current = {sectionId: section.tasks[idx]?.section?.id}
                                        }}
                                        className={s.content}
                                        onClick={() => setSelectTask(task)}
                                    >

                                        <p>
                                            <input
                                                value={task.title || ""}
                                                type="text"
                                                placeholder="Untitled"
                                                onChange={() => console.log("hey")}
                                            />
                                        </p>
                                    </div>
                                    {(selectTask?.id === task?.id && selectTask !== undefined) && (
                                        <TaskModel
                                            task={selectTask}
                                            onClose={() => setSelectTask(undefined)}
                                            onUpdateTask={(task: any) => onUpdateTask(task, {boardIndex: index, itemIndex: idx})}
                                            boardId={boardId}
                                        />
                                    )}
                                    <span onClick={() => onDeleteTask({boardIndex: index, itemIndex: idx})} className={s.del}>
                                       <AiFillDelete/>
                                    </span>
                                </div>
                            )
                        })}
                    </section>
                )
            })}

        </>
    );
};

export default MultipleDragDrop;