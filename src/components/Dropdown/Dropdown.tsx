"use client"

import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

interface Props {
    value: Object;
    options: Object[];
    onChange?: (value: Object) => void;
    style?: "bold";
    width?: string;
    getLabel?: (option: Object) => string;
}

export default function Dropdown({
    options,
    width,
    style = "bold",
    getLabel,
    value,
    onChange,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const getLabelString = getLabel || ((option: Object) => option.toString());

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen])

    return (
        <div
            className={[styles.container, styles[style], isOpen && styles.open, (options.length <= 1) && styles.single].filter(Boolean).join(' ')}
            ref={dropdownRef}
            {...(isOpen ? { open: true } : null)}
        >
            <div
                className={styles.selected}
                onClick={() => setIsOpen(true)}
            >
                <div className={styles.bg} />
                {getLabelString(value)}
            </div>
            <div className={styles.list}>
                {options.filter((option) => option !== value).map((option) => (
                    <div key={getLabelString(option)} className={styles.item} onClick={() => {
                        onChange?.(option);
                        setIsOpen(false);
                    }}>
                        {getLabelString(option)}
                    </div>
                ))}
            </div>
        </div>
    )
}
