import { HLJSApi } from "highlight.js"

export default (hljs: HLJSApi) => {
    const interpolation = {
        className: "interp",
        begin: /\{/,
        end: /}/,
        contains: []
    }
    const string = {
        scope: "string",
        begin: "'",
        end: "'",
        contains: [
            hljs.BACKSLASH_ESCAPE,
            interpolation
        ]
    }
    const command = {
        scope: "command",
        begin: /\$/,
        end: /\$/,
        contains: [
            hljs.BACKSLASH_ESCAPE,
            interpolation
        ]
    }
    const operator = {
        scope: "operator",
        match: /[-+*/%<>=!&|?]/
    }
    const keywords = {
        scope: "keyword",
        match: /\b(to|error|status|if|loop|in|silent|return|fun|else|break|continue|and|or|not|let|sh|main)\b/
    }
    const fun = {
        scope: "function",
        match: /\b([a-zA-Z0-9_]+)\b(?=\()/
    }
    const variable = {
        scope: "variable",
        match: /[a-zA-Z0-9_]+/
    }
    const all = [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_NUMBER_MODE,
        string,
        command,
        operator,
        keywords,
        fun,
        variable,
    ]
    interpolation.contains = all.concat([{
        begin: /\{/,
        end: /\}/,
        contains: [
            "self"
        ].concat(all as any) as any
    }]) as any;
    return ({
        case_insensitive: false,
        contains: all
    })
}