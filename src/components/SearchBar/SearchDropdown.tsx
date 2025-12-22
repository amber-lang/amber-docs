import Link from 'next/link'
import Icon from '@/components/Icon/Icon'
import style from './SearchBar.module.css'
import { SearchResult } from './types'

interface SearchDropdownProps {
    results: SearchResult[]
    selectedIndex: number
    show: boolean
    isDocked: boolean
    refs: any
    floatingStyles: any
    getFloatingProps: any
    placement: string
    onSelect: () => void
}

export function SearchDropdown({ 
    results, 
    selectedIndex, 
    show, 
    isDocked, 
    refs, 
    floatingStyles, 
    getFloatingProps, 
    placement,
    onSelect 
}: SearchDropdownProps) {
    if (!show) return null

    return (
        <div 
            ref={refs.setFloating}
            className={[style.options, style.show, placement === 'top' && style.flip].filter(Boolean).join(' ')}
            style={{
                ...floatingStyles,
                width: isDocked ? 'min(400px, calc(100vw - 40px))' : 400,
                position: 'fixed',
                zIndex: 1001
            }}
            {...getFloatingProps()}
        >
            {results.map((item, index) => (
                <Link href={`/${item.path}`} key={item.path} onClick={onSelect}>
                    <div className={`${style.option} ${index === selectedIndex ? style.selected : ''}`}>
                        <Icon
                            src={item.matches >= 1000 ? '/internal/hash.svg' : '/internal/document.svg'}
                            size="14px"
                            color="var(--border)"
                        />
                        {item.parentTitle ? (
                            <span>
                                <span style={{ opacity: 0.5 }}>{item.parentTitle} {'>'} </span>
                                {item.title}
                            </span>
                        ) : (
                            item.title
                        )}
                    </div>
                </Link>
            ))}
            {results.length === 0 && (
                <div className={[style.option, style.disabled].join(' ')}>No results found</div>
            )}
        </div>
    )
}
