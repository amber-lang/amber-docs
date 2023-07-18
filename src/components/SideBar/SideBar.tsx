import React from 'react'
import { Island } from '@/components/Island'
import { Text } from '@/components/Text'
import style from './SideBar.module.css'

interface Props {}

export default function SideBar({}: Props) {
    return (
        <div>
            <Island label="On this page">
                <div className={style.links}>
                    <a href="/"><Text block>What is Amber?</Text></a>
                    <a href="/"><Text block>What is it not</Text></a>
                    <a href="/"><Text block>Main Advantages</Text></a>
                </div>
            </Island>
            <div className={style.spacer}/>
            <Island label="Table of contents">
                <div className={style.links}>
                    <a href="/"><Text block>Getting started</Text></a>
                    <a href="/"><Text block>Basic Concepts</Text></a>
                    <a href="/"><Text block>Variables</Text></a>
                </div>
            </Island>
        </div>
    )
}