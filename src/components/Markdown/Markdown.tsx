'use client'

import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'
import { useEffect, useMemo } from 'react'
import setSwipeToCopy from './swipeToCopy'
import complexImageParser, { COMPLEX_IMAGE_RULE } from './complexImage'
import { detailsBlockParser, DETAILS_BLOCK_RULE } from './detailsBlock'
import { generateUrl, getLocation, slugify } from '@/utils/urls'
import path from 'path'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

const getHrefWithVersion = (href: string, currentPath: string) => {
    const params = currentPath.replace(/^\//, '').split('/')
    const location = getLocation(params)
    return path.join('/', generateUrl(location.version, href))
}

const handleWarning = (text: string): string | null => {
    const warningText = 'WARNING:'
    const isWarning = (text.replace('<p>', '').startsWith(warningText));
    if (!isWarning) return null
    const img = `<img src="/internal/warning.svg" class="${style.icon}" />`
    const result = img + text.replace(warningText, '')
    return `<blockquote class="${style.warning}">${result}</blockquote>`
}

const handleDetails = (text: string): string | null => {
    const detailsText = 'DETAILS:'
    const isDetails = (text.replace('<p>', '').startsWith(detailsText));
    if (!isDetails) return null
    const img = `<img src="/internal/details.svg" class="${style.icon}" />`
    const result = img + text.replace(detailsText, '')
    return `<blockquote class="${style.details}">${result}</blockquote>`
}

const handleLogos = (text: string): string => {
    return text.replace(/\bLOGO:([a-z]+)\b/g, `<img src="/logos/$1.png" class="${style.logo}" />`)
}

// Create a renderer class factory that accepts the current path
function createMarkdownRenderer(currentPath: string) {
    class MarkdownRenderer extends Renderer {
        heading(text: string, level: number, raw: string): string {
            const id = slugify(raw)
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

        blockquote(text: string): string {
            const fallback = `<blockquote class="${style.quote}">${text}</blockquote>`
            return handleWarning(text) ?? handleDetails(text) ?? fallback
        }

        table(header: string, body: string): string {
            body = handleLogos(body)
            return `
                <div class="${style['table-wrapper']}">
                    <table>
                        <thead>${header}</thead>
                        <tbody>${body}</tbody>
                    </table>
                </div>
            `.replace(/\s+/, ' ');
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
                            navigator.clipboard.writeText(this.parentElement.children[1].innerText.trim());
                            this.classList.add('${style.checked}');
                            setTimeout(() => this.classList.remove('${style.checked}'), 1000);
                        "
                        class="${style['side-action']} ${style.copy}"
                    ></div>
                    <pre><code class="${style.block}">${escapedCode}</code></pre>
                </div>
            `
        }

        link(href: string, title: string, text: string): string {
            const assetRegex = /\/(internal|images)/
            if (href.startsWith('http') || assetRegex.test(currentPath)) {
                return `<a href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
            }
            return `<a href="${getHrefWithVersion(href, currentPath)}"${title ? ` title="${title}"` : ''}>${text}</a>`;
        }
    }
    return new MarkdownRenderer()
}

// Register block rules once at module level
Marked.setBlockRule(DETAILS_BLOCK_RULE, detailsBlockParser)
Marked.setBlockRule(COMPLEX_IMAGE_RULE, complexImageParser)

interface Props {
    content: string
    currentPath: string
}

export default function Markdown({ content, currentPath }: Props) {
    // Create a memoized parsed HTML based on content and path
    const html = useMemo(() => {
        // Set options with the path-aware renderer before parsing
        Marked.setOptions({
            renderer: createMarkdownRenderer(currentPath),
            breaks: true,
            gfm: true,
            highlight(code: string, lang?: string) {
                if (!lang) return code
                return hljs.highlight(code, { language: lang }).value
            }
        })
        return Marked.parse(content)
    }, [content, currentPath])

    useEffect(() => {
        const blocks: HTMLDivElement[] = Array.from(document.querySelectorAll(`.${style.container}`))
        if (matchMedia('(hover: none)').matches) {
            setSwipeToCopy(blocks)
        }
        // Scroll to anchor hash
        const hash = window.location.hash
        if (hash) {
            const id = hash.substring(1)
            const element = document.getElementById(id)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView()
                }, 0)
            }
        }
    }, [content])

    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: html }} />
    )
}

