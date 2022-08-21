import React from 'react';
import s from "./SidebarContent.module.scss"

interface Props {
    items: any
}

const SidebarContent = ({items}: Props) => {

    return (
        <div className={s.root}>
            <span>{items.items.icon}</span>
            <p>{items.items.title}</p>
        </div>
    );
};

export default SidebarContent;