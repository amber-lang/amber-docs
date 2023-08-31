'use client'

import style from './InfoCard.module.css'
import Card from '@/components/Card/Card'
import { Text } from '@/components/Text'
import { useEffect, useState } from 'react'

interface Props {
    id: string,
    title: string,
    content: string,
    icon?: string
    
}

export default function InfoCard({ id, title, content, icon }: Props) {
    const [isClosed, setIsClosed] = useState(true)

    const handleClose = () => {
        const amount = parseInt(window.localStorage.getItem(id) ?? '0')
        window.localStorage.setItem(id, (amount + 1).toString())
        window.localStorage.setItem(`${id}-date`, Date.now().toString())
        setIsClosed(true)
    }

    useEffect(() => {
        const amount = parseInt(window.localStorage.getItem(id) ?? '0')
        if (amount === 0) setIsClosed(false)
        if (amount > 0 && amount < 3) {
            const date = window.localStorage.getItem(`${id}-date`)
            const daysSince = (new Date().getTime() - parseInt(date ?? '0')) / 1000 / 60 / 60 / 24
            if (amount === 1 && daysSince > 7) setIsClosed(false)
            if (amount === 2 && daysSince > 30) setIsClosed(false)
        }
    }, [])
  
    return (
      <div className={style.card} style={{ display: isClosed ?  'none' : 'block'}}>
        <Card>
          <Text block font='title'>{title}</Text>
          <div className={style.close} onClick={handleClose} />
          <div className={style.info}>
            <div>
              <div className={style.icon} style={{ maskImage: `url('${icon}')`}} />
            </div>
            <div>
              <Text block font='body'>
                {content}
              </Text>
            </div>
          </div>
        </Card>
      </div>
    )
  }