import { Marked, Renderer } from '@ts-stack/markdown'
import style from './Markdown.module.css'
import hljs, { LanguageFn } from 'highlight.js'
import amber from './amber'

hljs.registerLanguage('amber', amber as LanguageFn)
hljs.registerAliases(['ab'], { languageName: 'amber' })

// You can override the default renderer to customize the output
class MarkdownRenderer extends Renderer {
    heading(text: string, level: number, raw: string): string {
        const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
        return `<h${level} id="${id}">${text}</h${level}>`;
    }

    codespan(text: string): string {
        return `<code class="${style.inline}">${text}</code>`
    }

    code(code: string, lang: string, escaped: boolean) {
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }
        const escapedCode = (escaped ? code : this.options.escape?.(code, true));

        if (!lang) {
            return `\n<pre><code class="${style.block}">${escapedCode}\n</code></pre>\n`;
        }

        const className = this.options.langPrefix ?? '' + this.options.escape?.(lang, true);
        return `\n<pre><code class="${style.block} ${className}">${escapedCode}\n</code></pre>\n`;
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
