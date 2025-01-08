'use client'

import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'
import { useEffect } from 'react'
import setSwipeToCopy from './swipeToCopy'
import complexImageParser, { COMPLEX_IMAGE_RULE } from './complexImage'
import { generateUrl, getLocation } from '@/utils/urls'
import path from 'path'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

const getHrefWithVersion = (href: string, currentUrl: string) => {
    const params = currentUrl.replace(/^\//, '').split('/')
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

const handleLogos = (text: string): string | null => {
    const hasLogo = text.match(/\bLOGO:[a-z]+\b/);
    if (!hasLogo) return null
    return text.replace(/\bLOGO:([a-z]+)\b/g, `<img src="/logos/$1.png" class="${style.logo}" />`)
}

// You can override the default renderer to customize the output
class MarkdownRenderer extends Renderer {
    heading(text: string, level: number, raw: string): string {
        const id = raw.toLowerCase().replace(/`([^`]+)`/g, '$1').replace(/[^\w]+/g, '-')
        return `
            <div class="${style.container}">
                <div
                    onclick="
                        navigator.clipboard.writeText(window.location.href.split('#')[0] + '#${id}');
                        this.classList.add('${style.checked}');
                        setTimeout(() => this.classList.remove('${style.checked}'), 1000);
                    "
                    id="${id}"
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
        body = handleLogos(body) ?? body
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
        if (href.startsWith('http') || assetRegex.test(window.location.pathname)) {
            return `<a href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
        }
        return `<a href="${getHrefWithVersion(href, window.location.pathname)}"${title ? ` title="${title}"` : ''}>${text}</a>`;
    }
}

Marked.setBlockRule(COMPLEX_IMAGE_RULE, complexImageParser)
Marked.setOptions({
    renderer: new MarkdownRenderer(),
    breaks: true,
    gfm: true,
    highlight(code, lang) {
        if (!lang) return code
        return hljs.highlight(code, { language: lang }).value
    }
})

export default function Markdown({ content }: { content: string }) {
    useEffect(() => {
        const blocks: HTMLDivElement[] = Array.from(document.querySelectorAll(`.${style.container}`))
        if (matchMedia('(hover: none)').matches) {
            setSwipeToCopy(blocks)
        }
    }, [])

    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
    )
}
