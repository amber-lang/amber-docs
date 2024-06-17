# Usage

Amber CLI can be used as a runtime or as a compiler.

## Syntax Highlighting
You can install syntax highlighting for Visual Studio Code. You can find it in Visual Studio Code extension store under the name **Amber Language**.

Or you can download it here in [the Visual Studio Marketplace website](https://marketplace.visualstudio.com/items?itemName=Ph0enixKM.amber-language).

## Running

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
