import { HLJSApi } from 'highlight.js'

const amber = (hljs: HLJSApi) => {
    const interpolation = {
        className: 'interp',
        begin: /\{/,
        end: /}/,
        contains: []
    }
    const string = {
        scope: 'string',
        begin: '"',
        end: '"',
        contains: [
            hljs.BACKSLASH_ESCAPE,
            interpolation
        ]
    }
    const command = {
        scope: 'command',
        begin: /\$/,
        end: /\$/,
        contains: [
            hljs.BACKSLASH_ESCAPE,
            interpolation
        ]
    }
    const operator = {
        scope: 'operator',
        match: /[-+*/%<>=!&|?]/
    }
    const keywords = {
        scope: 'keyword',
        match: /\b(and|as|break|cd|continue|echo|else|fail|failed|for|from|fun|if|import|in|is|len|let|loop|main|mv|nameof|not|or|pub|ref|return|silent|status|then|trust|unsafe)\b/
    }
    const type = {
        scope: 'type',
        match: /[A-Z][a-zA-Z0-9_]+/
    }
    const fun = {
        scope: 'function',
        match: /\b([a-zA-Z0-9_]+)\b(?=\()/
    }
    const variable = {
        scope: 'variable',
        match: /[a-zA-Z0-9_]+/
    }
    const range = {
        scope: 'number',
        match: /\.?\.\=?/
    }
    const constant = {
        scope: 'number',
        match: /\b(false|true|null)\b/
    }
    const compilerFlag = {
        scope: 'comment',
        match: /\#\[.*\]/
    }
    const all = [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        string,
        range,
        command,
        operator,
        constant,
        keywords,
        compilerFlag,
        type,
        fun,
        variable
    ]
    interpolation.contains = all.concat([{
        begin: /\{/,
        end: /\}/,
        contains: [
            'self'
        ].concat(all as any) as any
    }]) as any
    return ({
        case_insensitive: false,
        contains: all
    })
}

export default amber
