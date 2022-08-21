import React, {useRef} from 'react';
import clsx from "clsx";
import {BoardState} from "../../../typeing";


interface Props {
    activeIndex: BoardState[]
    setActiveIndex: Function
    className?: string
    Component?: any
    onNavigate?: Function
}

const DragDrop = ({ setActiveIndex, activeIndex, onNavigate,className, Component}: Props) => {
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

    const onHandleClick = (id: string) => {
        if (onNavigate) {
            onNavigate(id)
        }
    }

    return (
        <>
            {activeIndex?.map((item: BoardState, index: number) => (
                <div
                    className={clsx(className ? className : "")}
                    onClick={() => onHandleClick(item.id)}
                    key={`${item._id}-${index}`}
                    draggable
                    onDragStart={() => dragItemRef.current = index}
                    onDragEnter={() => dragOverItemRef.current = index}
                    onDragEnd={handleSort}
                    onDragOver={(e:  React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                >
                    {Component ? <Component items={item}/> : "null"}
                </div>
            ))}
        </>
    )
};

export default DragDrop;