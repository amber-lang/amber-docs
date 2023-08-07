import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'

// You can override the default renderer to customize the output
class MarkdownRenderer extends Renderer {
    code(code: string, lang: string, escaped: boolean) {
        if (escaped) return code
        return `<pre><code class="lang-${lang}">${code}</code></pre>`
    }
}

function initializeHighlighter() {
    Marked.setOptions({
        renderer: new MarkdownRenderer(),
        highlight(code, lang) {
            // TODO: Use highlightjs for syntax highlighting
            return code
        }
    })
}

initializeHighlighter()

export default function Markdown({ content }: { content: string }) {
    return (
        <div className={style.markdown} dangerouslySetInnerHTML={{ __html: Marked.parse(content) }} />
    )
}
