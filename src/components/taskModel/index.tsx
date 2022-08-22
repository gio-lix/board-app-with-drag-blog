import React, {FC, useEffect, useRef, useState} from 'react';
import s from "./TaskModal.module.scss"
import clsx from "clsx";
import Moment from "moment";
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import taskApi from "../../api/taskApi";
import {AiOutlineClose, AiOutlineArrowsAlt} from "react-icons/ai"
import {TasksState} from "../../typeing";


interface Props {
    task: TasksState
    boardId: string
    onClose: () => void
    onUpdateTask: Function
}

const TaskModel: FC<Props> = ({task, boardId, onClose, onUpdateTask}) => {
    const closeRef = useRef<any>()
    const [fullScreen, setFullScreen] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState<any>()


    useEffect(() => {
        if (task) {
            setContent(task.content)
            setTitle(task.title)
        }

    },[task])

    useEffect(() => {
        (async () => {
            try {
                await taskApi.updateTask(boardId, task.id, { title: title })
                task.title = title
                onUpdateTask(task)
            } catch (err) {
                console.log(err)
            }
        })()
    },[title])
    const updateContent = async (event: any, editor: any) => {
        const data = editor.getData()
        setContent(data)

    }
    useEffect(() => {
        (async () => {
            try {
                await taskApi.updateTask(boardId, task.id, {content :content })
                task.content = content
                onUpdateTask(task)
            } catch (err) {
                console.log(err)
            }
        })()
    },[content])


    return (
        <section className={clsx(s.root, fullScreen ? s.increase : s.decrease)}>
            <p>
                <span onClick={() => onClose()}>
                     <AiOutlineClose />
                </span>
                <span onClick={() => setFullScreen(!fullScreen)}>
                     <AiOutlineArrowsAlt />
                </span>
            </p>
            <div className={s.decreaseBox} ref={closeRef}>
                <div className={s.box}>
                    <textarea
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                     <p>
                         {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''}
                     </p>

                </div>
                <hr/>
                <div >
                   <div className={clsx(fullScreen ? "maxHeight" : "minHeight")}>
                       <CKEditor
                           editor={ClassicEditor}
                           data={content}
                           onChange={updateContent}
                       />
                   </div>
                </div>
            </div>
        </section>
    );
};

export default TaskModel;