import { Marked } from '@ts-stack/markdown';

export const DETAILS_BLOCK_RULE = /^\s*begin\[details\]\s+(.*?)\n([\s\S]*?)\n\s*end\[details\]\s*/;

function dedent(str: string): string {
    const lines = str.split('\n');
    if (lines.length === 0) return str;

    // Find minimum indentation of non-empty lines
    let minIndent = Infinity;
    for (const line of lines) {
        if (line.trim().length === 0) continue;
        const indent = line.search(/\S/);
        if (indent !== -1 && indent < minIndent) {
            minIndent = indent;
        }
    }

    if (minIndent === Infinity) return str;

    return lines.map(line => line.length >= minIndent ? line.slice(minIndent) : line).join('\n');
}

export function detailsBlockParser(execArr?: RegExpExecArray | string[] | null): string {
    if (!execArr) return '';
    const summary = execArr[1].trim();
    const content = execArr[2];
    
    // Dedent the content to ensure markdown recognizes blocks correctly
    const dedentedContent = dedent(content);
    
    return `<details><summary>${summary}</summary>${Marked.parse(dedentedContent)}</details>`;
}
