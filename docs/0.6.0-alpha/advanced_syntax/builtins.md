Builtins are native methods (built in the compiler itself) and they are also reserved keywords in Amber.

Similar to the standard library, they generate valid [Shellcheck](https://www.shellcheck.net/) code (though full support for this in Amber is still in progress).

All builtins use function-like syntax (with parentheses) and several operations are **failable**, requiring explicit error handling (e.g., using `trust`, `?`, or a `failed` block).

## Cd

Transpile to `cd` which changes the current directory, requires a `Text` parameter.

Because changing directories can fail, this builtin is **failable**.

```ab
trust cd("/tmp")

cd("/unknown") failed {
    echo("Could not change directory")
}
```

## Echo

Transpile to `printf` or `echo` which prints text to the console, requires a parameter.

```ab
echo("Hello World!")
```

## Exit

Terminate the script. Takes an `Int` parameter representing the exit code. This builtin is **not failable**.

```ab
exit(1)
```

## Len

For a `Text` value, this builtin calculates and returns the length (in ASCII characters) as an `Int` type.  It is transpiled to `${#TEXT}`:

```ab
// Returns 37
echo(len("Jackdaws love my big sphinx of quartz"))
```

For an `Array` `[]` value, it calculates and returns the length of the array as an `Int` type.  It is transpiled to `${#ARRAY[@]}`:

```ab
// Returns 5
echo(len(["one", "two", "three", "four", "five"]))
```

## Lines

This builtin reads one line at a time from a text file.  It can be used in place of an array in an iterative `for` loop (with or without an index). This is efficient because each line is read into memory, and processed before the next line is read.

Because reading files can fail, this builtin is **failable**.

```ab
for line in trust lines("foo.txt") {
    echo(line)
}

for index, line in trust lines("bar.txt") {
    echo("#{index} {line}")
}
```

Alternatively, it can be used as the right hand side of an array assignment.  This is inefficient because the entire file is read into memory in one go:

```ab
let foos = lines("foo.txt") failed {
    echo("Could not read foo.txt")
    exit(1)
}

echo("Read {len(foos)} lines")
```

## Mv

If we need to move files we can use the `mv` builtin, requires two `Text` parameters.
*Doesn't support the `mv` unix command parameters*.

Because moving files can fail, this builtin is **failable**.

```ab
trust mv("/tmp/a", "/tmp/b")

mv("/tmp/a", "/tmp/b") failed {
    echo("Error moving file")
}
```

## Nameof

For more advanced commands, we might need the name of the variable in the compiled script. The `nameof` keyword provides this functionality.

For example, this allows us to perform operations like:

```ab
let variable = null

trust $ {nameof(variable)}=12 $
// Which is the same as declaring (but it is more readable in this way)
let variable = 12
```

## Await

Wait for process IDs to finish executing. Takes an `Int` or `[Int]` parameter.

Because waiting for a process can fail, this builtin is **failable**.

```ab
trust await(1234)
```

## Cp

Copy files or directories. Takes two `Text` parameters for source and destination, and an optional `Bool` parameter for `force`.

Because copying files can fail, this builtin is **failable**.

```ab
trust cp("src.txt", "dst.txt")
trust cp("src.txt", "dst.txt", true)
```

## Ls

List directory contents. Takes an optional `Text` parameter for the path, and optionally two `Bool` parameters for `all` (show hidden files) and `recursive` (TODO). Returns an array of `Text`. Note that `ls` cannot be used with the `silent` modifier, as it will break the listing of directory contents. If you want to suppress error messages, use `suppress` modifier.

Because reading directories can fail, this builtin is **failable**.

```ab
let files = trust ls("dir")
let all_files = trust ls("dir", true)
let all_files_recursive = trust ls("dir", true, true)
```

## Rm

Remove files or directories. Takes a `Text` parameter for the path, and optionally two `Bool` parameters for `recursive` and `force`.

Because removing files can fail, this builtin is **failable**.

```ab
trust rm("file.txt")
trust rm("dir", true, true)
```

## Sleep

Delay for a specified amount of time. Takes a `Num` or `Int` parameter representing sleep duration.

Sleep duration must be greater or equal to 0.

Because sleeping can fail, this builtin is **failable**.

```ab
trust sleep(5)
```

## Touch

Change file timestamps or create empty files. Takes a `Text` parameter.

Because touching files can fail, this builtin is **failable**.

```ab
trust touch("newfile.txt")
```

## Lock

Acquire a file lock. Takes a `Text` parameter. Useful for preventing concurrent executions.

Because acquiring a lock can fail, this builtin is **failable**.

```ab
trust lock("my_script.lock")
```

## Clear

Clear the terminal screen.

```ab
clear()
```

## Pwd

Returns the current working directory as a `Text`.

```ab
let current_dir = pwd()
```

## Pid

Returns the process ID (PID) of the most recently started background job - type `Int`.

```ab
let process_id = pid()
```

## Disown

Disown a job. Takes an optional `Int` or `[Int]` parameter with process IDs.

```ab
disown() // Disowns latest job
disown(process_id)
disown([process_id1, process_id2])
```

## Shellname

Returns the name of the shell currently executing the compiled code (e.g. "bash", "zsh") as a `Text`.

```ab
echo(shellname())
```

## Shellversion

Returns the version of the shell currently executing the compiled code as a `Text`.

```ab
echo(shellversion())
```
