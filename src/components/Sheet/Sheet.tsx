'use client'

import style from './Sheet.module.css';
import { useEffect, useRef } from 'react';

interface Props {
    children: React.ReactNode
}

export default function Sheet({ children }: Props) {
    const sheetRef = useRef(null);
    const contentRef = useRef(null);
    const handleRef = useRef(null);

    useEffect(() => {
        const sheet: HTMLDivElement = sheetRef.current!;
        const content: HTMLDivElement = contentRef.current!;
        const handle: HTMLDivElement = handleRef.current!;
        const MAX = window.innerHeight - 150
        const MARGIN = 50
        let trigger = false
        let initialHeight = 0
        let sheetHeight = 0
        let lastMoves = [0, 0, 0]

        handle.addEventListener('click', () => {
            if (sheet.offsetHeight > 40) {
                setDown()
            } else {
                setUp()
            }
        })

        const getMoveDelta = (e: MouseEvent) => {
            // When user didn't move the mouse at all
            if (lastMoves[0] === 0) return 0
            const res = []
            let current = e.y
            for (const move of lastMoves) {
                res.push(current - move)
                current = move
            }
            return res.reduce((acc, val) => val + acc, 0) / res.length
        }

        const getHeight = (e: MouseEvent) => sheetHeight + initialHeight - e.y

        const setUp = () => {
            sheet.style.transitionDuration = '200ms'
            sheet.style.height = `${MAX}px`
            content.style.height = `${MAX - MARGIN}px`
            setTimeout(() => {
                sheet.style.transitionDuration = 'unset'
            }, 100)
        }

        const setDown = () => {
            sheet.style.transitionDuration = '200ms'
            sheet.style.height = '40px'
            content.style.height = '0px'
            setTimeout(() => {
                sheet.style.transitionDuration = 'unset'
            }, 100)
        }

        sheet.addEventListener('pointerdown', (e) => {
            initialHeight = e.y
            sheetHeight = sheet.offsetHeight
            const delta = sheetHeight - (window.innerHeight - initialHeight)
            if (delta < 0 || delta > 70) return
            trigger = true
        })

        addEventListener('pointerup', (e) => {
            trigger = false
            const height = getHeight(e)
            const moveDelta = getMoveDelta(e)
            if (moveDelta < -20) {
                setUp()
            } else if (moveDelta > 20) {
                setDown()
            }
            if (height < 150 && height > 40) {
                setDown()
            } else if (height > MAX - 100 && height < MAX) {
                setUp()
            }
            lastMoves = [0, 0, 0]
        })

        addEventListener('pointermove', (e) => {
            if (!trigger) return
            const height = getHeight(e)
            if (height < 40 || height > MAX) return
            sheet.style.height = `${height}px`
            content.style.height = `${height - MARGIN}px`
            lastMoves = [e.y, ...lastMoves.slice(0,2)]
        })
    }, []);

    return (
        <div className={style.sheet} ref={sheetRef}>
            <div className={style['sheet-style']}>
                <div className={style.handle} ref={handleRef}></div>
                <div className={style.content} ref={contentRef}>
                    {children}
                </div>
            </div>
        </div>
    )
}