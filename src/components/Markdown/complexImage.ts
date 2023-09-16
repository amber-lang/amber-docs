import style from './Markdown.module.css'

function getStyles(options: { [key: string]: string | number }) {
    return Object.keys(options).map(option => {
        switch (option) {
            case 'width': return `width: ${options[option]}px`
            case 'height': return `height: ${options[option]}px`
            case 'hide-border': return 'border: none'
            case 'border-radius': return `border-radius: ${options[option]}px`
            case 'align': return (() => {
                switch (options[option]) {
                    case 'left': return 'margin-right: auto'
                    case 'center': return 'margin: 0 auto'
                    case 'right': return 'margin-left: auto'
                }
            })()
        }
    })
}

export const COMPLEX_IMAGE_RULE = /^\!\[([^\]]+)\]\{([^}]*)\}\(([^)]+)\)(?:\(([^)]+)\))?/

export default function complexImageParser(execArr?: string[]): string {
    if (!execArr) return ''
    const options = JSON.parse(`{${execArr[2]}}`)
    const styles = getStyles(options)
    
    if (execArr[4]) {
        return `<div class="${[style.container, style['light-dark']].join(' ')}">
            <img src="${execArr[3]}" alt="${execArr[1]}" class="${style.image}" style="${styles.join(';')}"/>
            <img src="${execArr[4]}" alt="${execArr[1]}" class="${style.image}" style="${styles.join(';')}"/>
        </div>`
    }
    return `<div class="${style.container}">
        <img src="${execArr[3]}" alt="${execArr[1]}" class="${style.image}" style="${styles.join(';')}"/>
    </div>`
}