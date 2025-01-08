The Amber CLI can be used as a runtime or as a compiler.

## Command Line Interface

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

### Running Amber Code

The following command will simply execute `hello.ab` as a script file. Amber code will be compiled to Bash and then executed all in one go:

```sh
$ amber hello.ab
Hello world!
```

If you want to run just a small code snippet, you can do that as well. Simply pass the `-e` (execute) flag to the command:

```sh
$ amber -e '
import * from "std/text"
echo upper("Hello world!")
'
HELLO WORLD!
```

### Compiling Amber Scripts

There are times when you prefer to just compile Amber code to a script, for example when dealing with _cron jobs_:

```sh
$ amber input.ab output.sh
```

You’ll notice that the compiled script is immediately callable; hence, there’s no need to add executable permissions using `chmod`, for instance. Amber grants the permission automatically.

Furthermore, Amber adds a _shebang_ at the top of the compiled script. This enables you to run the code simply, without any additional commands:

```sh
$ ./output.sh
```

#### Disable Formatting

Using the `--disable-format` option prevents the execution of external formatting tools after the Bash compilation process:

```sh
$ amber --disable-format input.ab output.sh
```

#### Minification

Additionally, the `--minify` option compresses the generated Bash code to reduce its size:

```sh
$ amber --minify input.ab output.sh
```

### Generating Amber Documentation

The `--docs` option extracts comments prefixed with `///` (triple slashes) from a single Amber file, and generates a Markdown file for documentation, by default in the `docs` subdirectory:

```sh
$ amber --docs stdlib.ab
```

## Syntax Highlighting

| Icon | Name | Location |
|---|:----:|:-----:|
| ![image](/images/logo-vsc.png)  | **VS Code** | [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language) or [Our extension repository](https://github.com/amber-lang/vsc-amber-extension) |
| ![image](/images/logo-zed.png) | **Zed** | Zed extensions or [Our extension repository](https://github.com/amber-lang/zed-amber-extension) |
| ![image](/images/logo-vim.png)  | **Vim** | [Our extension repository](https://github.com/amber-lang/amber-vim) |
| LOGO:hx | **Helix Editor** | [Native](https://docs.helix-editor.com/lang-support.html) |
