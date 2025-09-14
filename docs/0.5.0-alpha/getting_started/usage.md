The Amber CLI can be used as a runtime or as a compiler.

## Command Line Interface

The Amber CLI syntax uses subcommands, like the Git CLI:

*This output is generated from the 0.4.0-alpha version.*
```
Usage: amber [INPUT] [ARGS]... [COMMAND]

Commands:
  eval   Execute Amber code fragment
  run    Execute Amber script
  check  Check Amber script for errors
  build  Compile Amber script to Bash
  docs   Generate Amber script documentation
  comp   Generate Bash completion script
  help   Print this message or the help of the given subcommand(s)

Arguments:
  [INPUT]    Input filename ('-' to read from stdin)
  [ARGS]...  Arguments passed to Amber script

Options:
  -h, --help     Print help
  -V, --version  Print version
```

For detailed usage instructions, refer to the [Amber usage guide](https://docs.amber-lang.com/getting_started/usage).

### Running Amber Code

The following command will simply execute `hello.ab` as a script file. Amber code will be compiled to Bash and then executed all in one go:

```sh
$ amber run hello.ab
Hello world!
```

Alternatively, if the file contains a _shebang_ line and has the executable bit set, it can be run like this:

```ab
#!/usr/bin/env amber
echo "Hello world"
```

```sh
$ ./hello.ab
Hello world
```

Additionally, command line arguments can be passed to the script:

```ab
#!/usr/bin/env amber
main(args) {
    for arg in args {
        echo arg
    }
}
```

```sh
$ ./args.ab 1 2 3
1
2
3
```

If you want to run just a small code snippet, you can do that as well:

```sh
$ amber eval '
import * from "std/text"
echo uppercase("Hello world!")
'
HELLO WORLD!
```

### Compiling Amber Scripts

There are times when you prefer to just compile Amber code to a script, for example when dealing with _cron jobs_:

```sh
$ amber build input.ab output.sh
```

You’ll notice that the compiled script is immediately callable; hence, there’s no need to add executable permissions using `chmod`, for instance. Amber grants the permission automatically.

Furthermore, Amber adds a _shebang_ at the top of the compiled script. This enables you to run the code simply, without any additional commands:

```sh
$ ./output.sh
```

## Syntax Highlighting

<<<<<<< HEAD:docs/0.4.1-alpha/getting_started/usage.md
<<<<<<< Updated upstream:docs/0.4.1-alpha/getting_started/usage.md
By default, Amber runs postprocessors `shfmt` and `bshchk` (if installed) on the compiled Bash script.  This functionality can be disabled with a `--no-proc` option:
=======
[VS Code](https://code.visualstudio.com) as well as [Zed](https://zed.dev) now have built-in LSP integration.

![LSP Example]{"width": "100%"}(/images/lsp-example-light.webp)(/images/lsp-example-dark.webp)

=======
[VS Code](https://code.visualstudio.com) as well as [Zed](https://zed.dev) now have built-in LSP integration.

![Amber LSP Feature]{"width": "100%"}(/images/lsp-example-light.webp)(/images/lsp-example-dark.webp)

>>>>>>> 87d48e1a600dc7d4aa463f93b4941ac80e59e252:docs/0.5.0-alpha/getting_started/usage.md
Here is a list of plugins that support syntax highlighting for Amber language.

| Icon | Name | Location |
|---|:----:|:-----:|
| LOGO:hx | **Helix Editor** | [Native Support](https://docs.helix-editor.com/lang-support.html) |
| LOGO:nova | **Nova** | [Nova extensions](https://extensions.panic.com/extensions/besya/besya.amber/) |
| LOGO:vim | **Vim** | [Our extension repository](https://github.com/amber-lang/amber-vim) |
| LOGO:vsc | **VS Code** | [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language) or [Our extension repository](https://github.com/amber-lang/vsc-amber-extension) |
| LOGO:zed | **Zed** | Zed extensions or [Our extension repository](https://github.com/amber-lang/zed-amber-extension) |


## Other interesting commands

### Postprocessors

By default, Amber runs postprocessor `bshchk` (if installed) on the compiled Bash script.  This functionality can be disabled with a `--no-proc` option:

```sh
$ amber build --no-proc=bshchk input.ab output.sh
```

### Minification

Additionally, the `--minify` option compresses the generated Bash code to reduce its size:

```sh
$ amber build --minify input.ab output.sh
```

### Generating Amber Documentation

The following command extracts comments prefixed with `///` (triple slashes) from a single Amber file, and generates a Markdown file for documentation, by default in the `docs` subdirectory:

```sh
$ amber docs stdlib.ab
```

### Generating Bash Completion Scripts

The following command generates a [Bash completion](https://en.wikipedia.org/wiki/Command-line_completion) script:

```sh
$ amber comp
_amber() {
    local i cur prev opts cmd
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
...
```

This can be sourced in the `.bashrc` file via command redirection, so that command completion works in all subsequently opened Bash shells.  Assuming the `amber` binary is on the system path:

```sh
$ cat ~/.bashrc
...
source <(amber comp)
...
```
