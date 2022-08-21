import React, {FC, useEffect, useRef, useState} from 'react';
import s from "./EmojiPicjer.module.scss"

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
    icon: string
    onChangeIcon: (item: string) => void
}

const EmojiPicker:FC<Props> = ({icon,onChangeIcon}) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string>()
    const [isShowPicker, setIsShowPicker] = useState<boolean>(false)
    const emojiRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setSelectedEmoji(icon)
    },[icon])

    const handleClick = (e: any) => {
        if (!e.path.includes(emojiRef.current)) {
            setIsShowPicker(false)
        }
    }
    useEffect(() => {
        window.addEventListener("click", handleClick)
        return () =>  window.removeEventListener("click", handleClick)
    },[])

    const selectEmoji = (e: { unified: string }) => {
        const sym = e.unified.split("-")
        let _codeArray: string[] = []
        sym.forEach((el: string) => _codeArray.push(`0x${el}`))
        const emoji = (String.fromCodePoint as any)(..._codeArray)
        setIsShowPicker(false)
        onChangeIcon(emoji)

    }
    const showPicker = () => setIsShowPicker(!isShowPicker)



    return (
        <section  ref={emojiRef}  className={s.root}>
            <div className={s.icon}  onClick={showPicker}>
                {selectedEmoji}
            </div>
            {isShowPicker ? (
                <div className={s.active}>
                    <Picker data={data} onEmojiSelect={selectEmoji} />
                </div>
            ) : null}
        </section>
    );
};

export default EmojiPicker;