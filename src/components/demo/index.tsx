import React, {FC} from 'react';
import s from "./Demo.module.scss"
import {BoardState} from "../../typeing";
import DragDrop from "../drop/DragDrop";

interface Props {
    // data: BoardState[]
    activeIndex: BoardState[]
    setActiveIndex: Function
}

const Demo:FC<Props> = ({activeIndex,setActiveIndex}) => {

    return (
        <div className={s.root} >
            <div className="flex">
                <DragDrop
                    // data={activeIndex}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
            </div>
            {/*<div className='flex'>*/}
            {/*    {data?.map((item: any, index: number) => {*/}
            {/*        console.log("item - ", item)*/}
            {/*        return (*/}
            {/*            <div key={index} className={s.box}>*/}
            {/*                {item.title}*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}

        </div>
    );
};

export default Demo;