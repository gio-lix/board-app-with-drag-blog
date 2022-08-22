import React from "react";

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
    sections: []
}

