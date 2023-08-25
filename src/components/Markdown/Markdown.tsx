'use client'

import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'
import { useEffect } from 'react'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

// You can override the default renderer to customize the output
class MarkdownRenderer extends Renderer {
    heading(text: string, level: number, raw: string): string {
        const id = raw.toLowerCase().replace(/[^\w]+/g, '-')
        return `
            <div class="${style.container}">
                <div
                    onclick="
                        navigator.clipboard.writeText(window.location.href.split('#')[0] + '#${id}');
                        this.classList.add('${style.checked}');
                        setTimeout(() => this.classList.remove('${style.checked}'), 1000);
                    "
                    class="${style['side-action']} ${style.link}"
                ></div>
                <h${level} id="${id}">${text}</h${level}>
            </div>
        `
    }

    codespan(text: string): string {
        return `<code class="${style.inline}">${text}</code>`
    }

    code(rawCode: string, lang: string, escaped: boolean) {
        let code = rawCode.trim()
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang)
            if (out != null && out !== code) {
                escaped = true
                code = out
            }
        }
        const escapedCode = (escaped ? code : this.options.escape?.(code, true))
        return `
            <div class="${style.container}">
                <div
                    onclick="
                        navigator.clipboard.writeText(\`${
                            rawCode.replaceAll(/\\/g, '\\\\').replaceAll(/\`/g, '\\\`')
                        }\`);
                        this.classList.add('${style.checked}');
                        setTimeout(() => this.classList.remove('${style.checked}'), 1000);
                    "
                    class="${style['side-action']} ${style.copy}"
                ></div>
                <pre><code class="${style.block}">${escapedCode}\n</code></pre>
            </div>
        `
    }
}

function initializeHighlighter() {
    Marked.setOptions({
        renderer: new MarkdownRenderer(),
        highlight(code, lang) {
            if (!lang) return code
            return hljs.highlight(code, { language: lang }).value
        }
    })
}

initializeHighlighter()

export default function Markdown({ content }: { content: string }) {
    useEffect(() => {
        const blocks: HTMLDivElement[] = Array.from(document.querySelectorAll(`.${style.container}`))
        for (const block of blocks) {
            const MAX = 50
            const THRESHOLD = 10
            const sideAction = block.children[0] as HTMLDivElement
            let position = 0
            let trigger = false

            const moveBack = () => {
                sideAction.style.opacity = '0'
                block.style.transitionDuration = '200ms'
                block.style.transform = 'translate(0, 0)'
                setTimeout(() => {
                    block.style.transitionDuration = 'unset'
                }, 100)
            }

            block.addEventListener('pointerdown', (e) => {
                // Check if user is scrolling code block or is trying to swipe
                const code = block.children[1] as HTMLDivElement
                if (code.tagName === 'PRE') {
                    const codeBlock = code.children[0] as HTMLDivElement
                    if (codeBlock.scrollLeft > 0) return
                }
                trigger = true
                position = e.x
            })

            addEventListener('pointermove', (e) => {
                if (!trigger) return
                const delta = e.x - position
                if (delta < 0 || delta > MAX) return
                block.style.transform = `translate(${e.x - position}px, 0)`
                sideAction.style.opacity = `${delta / MAX}`
            })

            addEventListener('scroll', () => {
                if (!trigger) return
                trigger = false
                moveBack()
            })

            addEventListener('pointerup', (e) => {
                if (!trigger) return
                trigger = false
                if (e.x - position < MAX - THRESHOLD) return moveBack()
                sideAction.click()
                setTimeout(() => {
                    moveBack()
                }, 1000)
            })
        }
    }, [])

    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
    )
}
