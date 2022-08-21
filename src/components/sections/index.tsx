import React, {FC, useEffect, useState} from 'react';
import s from './Sections.module.scss'
import DragDrop from "../drop/DragDrop";
import SectionContent from "../dragDropComponents/SectionContent";
import {BoardState} from "../../typeing";
import MultipleDragDrop from "../dragDropComponents/multipleDragDrop";




interface Props {
    boardId: any
    sectionData: BoardState[]
    setSectionData: Function
    setCount: Function
}

const Sections: FC<Props> = ({boardId, sectionData,setCount, setSectionData}) => {
    const [activeIndex, setActiveIndex] = useState<any>()


    useEffect(() => {
        setActiveIndex(sectionData)
    }, [sectionData])

    return (
        <section className={s.root}>
                <div className={s.dropTitleBox}>
                    <DragDrop
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        Component={(items: any) =>
                            <SectionContent
                                boardId={boardId}
                                items={items}
                                data={sectionData}
                                setSectionData={setSectionData}
                                setCount={setCount}
                            />
                        }
                    />
                </div>
                <div  className={s.box}>
                    <MultipleDragDrop
                        boardId={boardId}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        setCount={setCount}
                    />
                </div>
        </section>
    );
};

export default Sections;