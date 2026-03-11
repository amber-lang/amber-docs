'use client'

import style from './InfoCard.module.css'
import Card from '@/components/Card/Card'
import { Text } from '@/components/Text'
import { useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

interface Props {
    id: string,
    title: string,
    content: string,
    icon?: string
    
}

/**
   * Renders a dismissible informational card whose visibility is controlled per `id` via local storage.
   *
   * The component tracks how many times the card has been closed and the timestamp of the last close using the provided `id` as a storage key. It reappears automatically after 7 days when it has been closed once, after 30 days when closed twice, and remains hidden after three or more closes.
   *
   * @param id - Unique key used to store close count and last-close timestamp in local storage
   * @param title - Title text displayed at the top of the card
   * @param content - Body text shown inside the card
   * @param icon - Optional URL for an icon rendered via CSS mask image
   * @returns The InfoCard JSX element
   */
  export default function InfoCard({ id, title, content, icon }: Props) {
    const [isClosed, setIsClosed] = useState(true)
    const { getItem, setItem } = useLocalStorage()

    const handleClose = () => {
        const amount = parseInt(getItem(id) ?? '0')
        setItem(id, (amount + 1).toString())
        setItem(`${id}-date`, Date.now().toString())
        setIsClosed(true)
    }

    useEffect(() => {
        const amount = parseInt(getItem(id) ?? '0')
        if (amount === 0) setIsClosed(false)
        if (amount > 0 && amount < 3) {
            const date = getItem(`${id}-date`)
            const daysSince = (new Date().getTime() - parseInt(date ?? '0')) / 1000 / 60 / 60 / 24
            if (amount === 1 && daysSince > 7) setIsClosed(false)
            if (amount === 2 && daysSince > 30) setIsClosed(false)
        }
    }, [id, getItem])
  
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
