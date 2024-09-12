# Command Line Interface (CLI) Parameters

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

## Documentation Generation

The `--docs` option extracts comments prefixed with `///` (triple slashes) from the Amber file and generates a Markdown file for documentation.

## Disable formatting

Using the `--disable-format` option prevents the execution of external formatting tools after the Bash compilation process.

## Minification

The `--minify` option compresses the generated Bash code to reduce its size.
