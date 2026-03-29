The Amber CLI can be used as a runtime or as a compiler.

## Command Line Interface

The Amber CLI syntax uses subcommands, like the Git CLI:

*This output is generated from the 0.6.0-alpha version.*
```
Usage: amber [OPTIONS] [INPUT] [ARGS]... [COMMAND]

Commands:
  eval        Execute Amber code fragment
  run         Execute Amber script
  check       Check Amber script for errors
  build       Compile Amber script to Bash
  docs        Generate Amber script documentation
  completion  Generate Bash completion script
  test        Run Amber tests
  help        Print this message or the help of the given subcommand(s)

Arguments:
  [INPUT]    Input filename ('-' to read from stdin)
  [ARGS]...  Arguments passed to Amber script

Options:
      --no-proc <NO_PROC>  Disable a postprocessor
                           Available postprocessors: 'bshchk'
                           To select multiple, pass multiple times with different values
                           Argument also supports a wildcard match, like "*" or "b*chk"
      --target <TARGET>    Code generation target shell
  -h, --help               Print help
  -V, --version            Print version
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
echo("Hello world")
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
        echo(arg)
    }
}
```

```sh
$ ./args.ab 1 2 3
1
2
3
```

### Preventing Execution with Bash

If you write an Amber script with a shebang pointing to `amber`, there is a risk that someone might accidentally execute it with `bash` instead. To prevent this, you can add a check at the top of your script using the following technique:

```ab
// 2> /dev/null; exit 1

// Your Amber code here
echo("Hello world")
```

This line is valid in both Amber and Bash:
- In **Amber**, `//` starts a comment, so the line is ignored
- In **Bash**, `//` is treated as a comment (ignored), `2> /dev/null` suppresses errors, and `exit 1` terminates the script with an error code

For more information about running Amber scripts, see [Running Amber Code](#running-amber-code).

If you want to run just a small code snippet, you can do that as well:

```sh
$ amber eval '
import * from "std/text"
echo(uppercase("Hello world!"))
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

### Compiling for different targets

Since 0.6.0, Amber adds support for multiple shell targets:

```sh
amber build script.ab --target bash # default (bash 4.3+)
amber build script.ab --target bash-3.2
amber build script.ab --target zsh
amber build script.ab --target ksh
```

For more information, visit [Cross-shell support](advanced_syntax/cross_shell) guide.

## Testing

Amber comes with a built-in test runner. You can define named test blocks in your code and execute them using the `amber test` command.

```sh
$ amber test
```

For more details on writing and filtering tests, please refer to the [Testing guide](https://docs.amber-lang.com/getting_started/testing).

## Syntax Highlighting

[VS Code](https://code.visualstudio.com) as well as [Zed](https://zed.dev) now have built-in LSP integration.

![Amber LSP Feature]{"width": "100%"}(/images/lsp-example-light.webp)(/images/lsp-example-dark.webp)

Here is a list of plugins that support syntax highlighting for Amber language.

| Icon | Name | Location |
|---|:----:|:-----:|
| LOGO:hx | **Helix Editor** | [Native Support](https://docs.helix-editor.com/lang-support.html) |
| LOGO:kate | **Kate/KWrite** | [GitHub](https://github.com/amber-lang/amber-kate) |
| LOGO:nova | **Nova** | [Nova extensions](https://extensions.panic.com/extensions/besya/besya.amber/) |
| LOGO:vim | **Vim** | [Our extension repository](https://github.com/amber-lang/amber-vim) |
| LOGO:vsc | **VS Code** | [VSC Marketplace](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language) or [Our extension repository](https://github.com/amber-lang/amber-vsc) |
| LOGO:zed | **Zed** | Zed extensions or [Our extension repository](https://github.com/amber-lang/zed-amber-extension) |


## Other interesting commands

### Postprocessors

Amber supports postprocessors that can optionally run after compilation to enhance your scripts. These tools are not included with Amber but will be executed automatically if they are installed on your system.

#### bshchk

[bshchk](https://github.com/b1ek/bshchk) is a runtime Bash dependency checker. It analyzes your compiled Bash script to ensure all external commands used are available at runtime, preventing runtime failures due to unavailable dependencies.

**Features:**
- Detects missing external commands before script execution
- Prevents runtime failures due to unavailable dependencies
- Supports inline directives for fine-grained control

For installation instructions and usage details, please refer to the [bshchk README](https://github.com/b1ek/bshchk#readme).

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
$ amber completion
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
source <(amber completion)
...
```

### Disabling the Optimizer

The optimizer is still being improved. If you encounter any issues with optimization, you can disable it using an environment variable:

```sh
AMBER_NO_OPTIMIZE=1 amber ...
```

### Custom Header and Footer

Amber allows you to customize the header and footer of compiled scripts using environment variables:

**AMBER_HEADER**: Path to a custom header file that replaces the default header. The header can use template variables:
- `{{ version }}` - Amber compiler version

**AMBER_FOOTER**: Path to a custom footer file that appends to the end of the script. The footer can use:
- `{{ version }}` - Amber compiler version

**Example custom header (`custom_header.sh`):**
```bash
#!/usr/bin/env bash
# Custom header for production scripts
# Project: {{ version }}
# Generated on: $(date)
```

**Example custom footer (`custom_footer.sh`):**
```bash
# Custom footer
# End of generated script
```

**Usage:**
```sh
# Using custom header
AMBER_HEADER=./custom_header.sh amber build input.ab output.sh

# Using both header and footer
AMBER_HEADER=./custom_header.sh AMBER_FOOTER=./custom_footer.sh amber build input.ab output.sh
```

**Default header:**
```bash
#!/usr/bin/env bash
# Written in [Amber](https://amber-lang.com/)
# version: {{ version }}
```

Note: Custom headers and footers are useful for adding project-specific metadata, license information, or runtime checks to your compiled scripts.
