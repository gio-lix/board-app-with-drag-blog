import React, {FC, useEffect, useState} from 'react';
import s from "./ValidationLayout.module.scss"

interface Props {
    title: string
    error?: string,
    setError: Function
    children: any
}

const ValidationLayout:FC<Props> = ({children, title,error, setError}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("")
        },1500)
        return () => clearTimeout(timer)
    },[error])

    return (
        <section className={s.root}>
            <div className={s.titleBox}>
                <h3>{title}</h3>
                <p>{error}</p>
            </div>
            {children}
        </section>
    );
};

export default ValidationLayout;