Amber CLI can be used as a runtime or as a compiler.

## Command Line Interface (CLI) Parameters

*This output is generated from the 0.3.5-alpha version.*
```
Usage: amber [OPTIONS] [INPUT] [OUTPUT]

Arguments:
  [INPUT]   '-' to read from stdin
  [OUTPUT]  '-' to output to stdout, '--silent' to discard

Options:
  -e, --eval <EVAL>     Code to evaluate
      --docs            Generate docs (OUTPUT is dir instead, default: `docs/`)
      --disable-format  Don't format the output file
      --minify          Minify the resulting code
  -h, --help            Print help
  -V, --version         Print version
```

For detailed usage instructions, refer to the [Amber usage guide](https://docs.amber-lang.com/getting_started/usage).

### Documentation Generation

The `--docs` option extracts comments prefixed with `///` (triple slashes) from the Amber file and generates a Markdown file for documentation.

#### Disable Formatting

Using the `--disable-format` option prevents the execution of external formatting tools after the Bash compilation process.

### Minification

The `--minify` option compresses the generated Bash code to reduce its size.

### Running

For example the following line will simply execute `file.ab` as a script file. Amber code will be compiled to BashScript and then executed all in one go.

```sh
amber file.ab
```

If you want to run just a small expression, you do that as well. Simply pass the `-e` (execute) flag to the command.

```sh
amber -e 'echo upper("hello world!")'
# Output: HELLO WORLD!
```

Notice that when executing a single expression, Amber automatically includes its standard library for you. This can be really handy when you're in the flow and all you want is to use a function from Amber's standard library in the terminal.

## Compiling

There are times when you prefer to just compile amber code to a script for example when dealing with _cron jobs_.

```sh
amber input.ab output.sh
```

You’ll notice that the compiled script is immediately callable; hence, there’s no need to add executable permissions using _chmod_, for instance. Amber grants the permission automatically.

Furthermore, Amber adds a _shebang_ at the top of the compiled script. This enables you to run the code simply without any additional commands.

```sh
./output.sh
```

## Syntax Highlighting

| Icon | Name | Location |
|---|:----:|:-----:|
| ![image](/images/logo-vsc.png)  | **Visual Studio Code** | [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language) or [Our extension repository](https://github.com/amber-lang/vsc-amber-extension) |
| ![image](/images/logo-zed.png) | **Zed Editor** | Zed extensions or [Our extension repository](https://github.com/amber-lang/zed-amber-extension) |
| ![image](/images/logo-vim.png)  | **Vim** | [Our extension repository](https://github.com/amber-lang/amber-vim) |
