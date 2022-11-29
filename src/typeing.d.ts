import React from "react";


interface ILogin {
    email: string
    password: string
}
interface IRegister extends ILogin {
    username: string
    confirmPassword: string
}


export interface SectionState {
    _id: string
    board: string
    title: string
    id: string
    updatedAt: Date
    createdAt: Date
}


export interface TasksState {
    _id: string
    id: string
    content: string | React.ElementType
    position: number
    section: SectionState
    title: string
    updatedAt: Date
    createdAt: Date
}


export interface SectionsSate {
    _id: string
    id: string
    board: string
    title: string
    tasks: TasksState[]
    createdAt: Date
    updatedAt: Date
}

export interface BoardState {
    _id: string
    id: string
    description: string
    favorite: boolean
    favoritePosition: number
    icon: string
    title: string
    position: number
    user: string
    sections: SectionsSate[]
    createdAt: Date
    updatedAt: Date
}


