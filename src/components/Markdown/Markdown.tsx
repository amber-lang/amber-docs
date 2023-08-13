import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

// You can override the default renderer to customize the output
class MarkdownRenderer extends Renderer {
    heading(text: string, level: number, raw: string): string {
        const id = raw.toLowerCase().replace(/[^\w]+/g, '-')
        return `
            <div class="${style.container}">
                <div
                    onclick="navigator.clipboard.writeText(window.location.href.split('#')[0] + '#${id}');"
                    class="${style['side-action']} ${style.link}"
                ></div>
                <h${level} class="${style.heading}" id="${id}">${text}</h${level}>
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
                    onclick="navigator.clipboard.writeText(\`${
                        rawCode.replaceAll(/\\/g, '\\\\').replaceAll(/\`/g, '\\\`')
                    }\`);"
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
    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
    )
}
