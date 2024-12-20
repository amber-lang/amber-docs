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

If you want to run just a small expression, you can do that as well:

```sh
$ amber eval 'echo upper("Hello world!")'
HELLO WORLD!
```

Notice that when executing a single expression, Amber automatically includes its standard library for you. This can be really handy when you're in the flow, and all you want is to use a function from Amber's standard library in the terminal.

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

#### Postprocessors

By default, Amber runs postprocessors `shfmt` and `bshchk` (if installed) on the compiled Bash script.  This functionality can be disabled with a `--no-proc` option:

```sh
$ amber build --no-proc=bshchk input.ab output.sh
```

#### Minification

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

## Syntax Highlighting

| Icon | Name | Location |
|---|:----:|:-----:|
| ![image](/images/logo-vsc.png)  | **VS Code** | [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language) or [Our extension repository](https://github.com/amber-lang/vsc-amber-extension) |
| ![image](/images/logo-zed.png) | **Zed** | Zed extensions or [Our extension repository](https://github.com/amber-lang/zed-amber-extension) |
| ![image](/images/logo-vim.png)  | **Vim** | [Our extension repository](https://github.com/amber-lang/amber-vim) |
