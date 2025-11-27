export default function ThemeScript() {
    const script = `
        (function() {
            try {
                var mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('mode', mode);
            } catch (e) {}
        })()
    `
    return <script dangerouslySetInnerHTML={{ __html: script }} />
}
