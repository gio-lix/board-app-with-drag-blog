import React, {useRef} from 'react';
import {NavLink} from "react-router-dom";
import s from "./Drop.module.scss";


interface Props {
    data: any
    activeIndex: any
    setActiveIndex: any
}

const DragDrop = ({data, setActiveIndex, activeIndex}: Props) => {
    let dragItemRef = useRef<any>(null)
    let dragOverItemRef = useRef<any>(null)


    const handleSort = () => {
        let _items = [...activeIndex]

        const draggedItemContext = _items.splice(dragItemRef.current, 1)[0]
        _items.splice(dragOverItemRef.current, 0, draggedItemContext)
        dragItemRef.current = null
        dragOverItemRef.current = null
        setActiveIndex(_items)
    }


    return (
        <>
            {data?.map((item: any, index: number) => (
                <NavLink
                    className={s.root}
                    to={`/boards/${item.id}`}
                    key={`${item._id}-${index}`}
                    draggable
                    onDragStart={() => dragItemRef.current = index}
                    onDragEnter={() => dragOverItemRef.current = index}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p>{item.icon} {item.title}</p>
                </NavLink>
            ))}
        </>
    )
};

export default DragDrop;