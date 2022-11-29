import React, { useState} from 'react';
import s from "./SectionContent.module.scss"
import {AiOutlinePlus, AiFillDelete} from "react-icons/ai"
import sectionApi from "../../../api/section";
import {BoardState} from "../../../typeing";
import taskApi from "../../../api/taskApi";


interface Props {
    items?: any
    children?: React.ReactNode
    boardId: any
    data: any
    setSectionData: Function
    setCount: Function
}

const SectionContent = ({items, boardId, data, setSectionData, setCount}: Props) => {
    const [countRerender, setCountRerender] = useState(0)

    const updateSection = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountRerender(prev => prev + 1)
        const value = e.target.value
        const index = data?.findIndex((el: BoardState) => el._id === items.items._id)
        data[index].title = value
        setSectionData(data)

        try {
            await sectionApi.updateSection(boardId, items.items._id, {title: value})
        } catch (err) {
            console.log(err)
        }

    }

    const onHandlerDelete = async () => {
        try {
            await sectionApi.deleteSection(boardId, items.items._id)
            const _sectionData = [...data].filter((el: BoardState) => el._id !== items.items._id)
            setSectionData(_sectionData)

        } catch (err) {
            console.log(err)
        }
    }

    const addHandlerTask = async () => {
        let sectionId = items.items._id
        try {
            const task = await taskApi.create(boardId, {sectionId})
            const _newDate = [...data]
            const index = _newDate.findIndex((el: BoardState) => el._id === sectionId)
            _newDate[index].tasks.unshift(task)
            setSectionData(_newDate)
            setCount((prev: number) => prev + 1)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section className={s.root} >
            <div className={s.mainBox} >
                <input
                    type="text"
                    value={items.items.title || ""}
                    placeholder="Untitled"
                    onChange={updateSection}
                />
                <div>
                    <span onClick={addHandlerTask}>
                        <AiOutlinePlus/>
                    </span>
                    <span onClick={onHandlerDelete}>
                        <AiFillDelete/>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default SectionContent;

