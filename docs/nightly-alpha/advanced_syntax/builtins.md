Builtins are native methods (built in the compiler itself) and they are also reserved keywords in Amber.

Similar to the standard library, they generate valid [Shellcheck](https://www.shellcheck.net/) code (though full support for this in Amber is still in progress).

## Cd

Transpile to `cd` which changes the current directory, requires a `Text` parameter.

```ab
cd "/tmp"
```

## Echo

Transpile to `echo` which prints text to the console, requires a `Text` parameter.

```ab
echo("Hello World!")
```

## Len

For a `Text` value, this builtin calculates and returns the length (in ASCII characters) as a `Num` type.  It is transpiled to `${#TEXT}`:

```ab
// Returns 37
echo(len("Jackdaws love my big sphinx of quartz"))
```

For an `Array` `[]` value, it calculates and returns the length of the array as a `Num` type.  It is transpiled to `${#ARRAY[@]}`:

```ab
// Returns 5
echo(len(["one", "two", "three", "four", "five"]))
```

## Lines

This builtin reads one line at a time from a text file.  It can be used in place of an array in an iterative `for` loop (with or without an index).  This is efficient because each line is read into memory, and processed before the next line is read:

```ab
for line in lines("foo.txt") {
    echo(line)
}

for index, line in lines("bar.txt") {
    echo("#{index} {line}")
}
```

Alternatively, it can be used as the right hand side of an array assignment.  This is inefficient because the entire file is read into memory in one go:

```ab
let lines = lines("foo.txt")
lines += lines("bar.txt")
echo(len(lines))
```

> WARNING: While embedded Bash commands like `$ cat foo.txt $` require a `trust` keyword or `failed` block, Amber does not currently support this for the `lines` builtin. If the file does not exist at runtime, the program will terminate midway, **potentially losing data stored only in variables**

## Mv

If we need to move files we can use the `mv` builtin, requires two `Text` parameters.
*Doesn't support the `mv` unix command parameters*.

```ab
mv "/tmp/a" "/tmp/b"
```

This builtin is `failable`, meaning we can handle errors like this:

```ab
mv "/tmp/a" "/tmp/b" failed {
    echo("Error")
}
```

## Nameof

For more advanced commands, we might need the name of the variable in the compiled script. The `nameof` keyword provides this functionality.

For example, this allows us to perform operations like:

```ab
let variable = null

trust $ {nameof variable}=12 $
// Which is the same as declaring (but it is more readable in this way)
let variable = 12
```
