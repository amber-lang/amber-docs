'use client'

import React, { useState } from 'react'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
    Placement
} from '@floating-ui/react'
import style from './Tooltip.module.css'

interface Props {
    children: React.ReactNode
    content: string
    placement?: Placement
    delay?: number
}

export default function Tooltip({ children, content, placement = 'bottom', delay = 300 }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(8),
            flip({
                fallbackAxisSideDirection: 'start',
            }),
            shift({ padding: 8 }),
        ],
    })

    const hover = useHover(context, { 
        move: false,
        delay: { open: delay, close: 0 }
    })
    const focus = useFocus(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ])

    return (
        <>
            <span
                ref={refs.setReference}
                {...getReferenceProps()}
                style={{ display: 'inline-flex' }}
            >
                {children}
            </span>
            {isOpen && (
                <FloatingPortal>
                    <div
                        ref={refs.setFloating}
                        style={floatingStyles}
                        className={style.tooltip}
                        {...getFloatingProps()}
                    >
                        {content}
                    </div>
                </FloatingPortal>
            )}
        </>
    )
}

