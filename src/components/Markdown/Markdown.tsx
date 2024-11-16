'use client'

import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'
import { useEffect } from 'react'
import setSwipeToCopy from './swipeToCopy'
import complexImageParser, { COMPLEX_IMAGE_RULE } from './complexImage'
import { generateUrl, getLocation } from '@/utils/urls'
import { MarkOptions } from 'perf_hooks'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

const getHrefWithVersion = (href: string, currentUrl: string) => {
    const params = currentUrl.replace(/^\//, '').split('/')
    const location = getLocation(params)
    return generateUrl(location.version, href)
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
        const warningText = 'WARNING:'
        const isWarning = (text.replace('<p>', '').startsWith(warningText));
        const className = isWarning ? 'warning' : 'quote'
        let result = text;
        if (isWarning) {
            const img = `<img src="/internal/warning.svg" class="${style["warning-icon"]}" />`
            result = img + result.replace(warningText, '')
        }
        return `<blockquote class="${style[className]}">${result}</blockquote>`
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
        return `<a href="/${getHrefWithVersion(href, window.location.pathname)}"${title ? ` title="${title}"` : ''}>${text}</a>`;
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
