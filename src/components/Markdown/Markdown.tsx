'use client'

import { Marked, MarkedOptions, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'
import { useEffect, useMemo } from 'react'
import setSwipeToCopy from './swipeToCopy'
import complexImageParser, { COMPLEX_IMAGE_RULE } from './complexImage'
import useVersion from '@/contexts/VersionContext/useVersion'
import { generateUrl } from '@/utils/urls'
import { MarkOptions } from 'perf_hooks'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

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
        const version = (this.options as MarkOptions & {version: string}).version
        if (href.startsWith('http') || assetRegex.test(window.location.pathname)) {
            return `<a href="${href}"${title ? ` title="${title}"` : ''}>${text}</a>`;
        }
        return `<a href="/${generateUrl(version, href.slice(1))}"${title ? ` title="${title}"` : ''}>${text}</a>`;
    }
}

export default function Markdown({ content }: { content: string }) {
    const { version } = useVersion()

    const markdownParser = useMemo(() => {
        const renderer = new MarkdownRenderer({ ...Marked.options, version } as MarkedOptions);
        Marked.setBlockRule(COMPLEX_IMAGE_RULE, complexImageParser)
        Marked.setOptions({
            renderer,
            breaks: true,
            gfm: true,
            highlight(code, lang) {
                if (!lang) return code
                return hljs.highlight(code, { language: lang }).value
            }
        })
        return Marked
    }, [version])

    useEffect(() => {
        const blocks: HTMLDivElement[] = Array.from(document.querySelectorAll(`.${style.container}`))
        if (matchMedia('(hover: none)').matches) {
            setSwipeToCopy(blocks)
        }
    }, [])

    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: markdownParser.parse(content) }} />
    )
}
