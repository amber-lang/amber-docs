Builtins are native methods (built in the compiler itself) and they are also reserved keywords in Amber.

Similar to the standard library, they generate valid [Shellcheck](https://www.shellcheck.net/) code (though full support for this in Amber is still in progress).

## Cd

Changes the current directory, requires a `Text` parameter.

```ab
cd("/tmp")
```

## Ls

Returns an array of filenames in the specified directory. Accepts optional all and recursive boolean parameters. This is a failable expression — it returns [Text].

```ab
let files = trust ls("/tmp")

let all_files = trust ls("/tmp", true, false)         // Include hidden files
let recursive = trust ls("/tmp", false, true)         // List recursively
let everything = trust ls("/tmp", true, true)         // Both
```

## Pwd

Returns current working directory as `Text` value.

```ab
let dir = pwd()
echo("Current directory: {dir}")
```


## Echo

Prints text to the console, requires a `Text` parameter.

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

## Cp

Copy files or directories from location to another. This builtin is failable.

```
cp("source.txt", "backup.txt")
cp("-r", "src_dir", "dest_dir")  // Recursive copy
```

## Mv

If we need to move files we can use the `mv` builtin, requires two `Text` parameters.
*Doesn't support the `mv` unix command parameters*.

```ab
mv("/tmp/a", "/tmp/b")
```

This builtin is `failable`, meaning we can handle errors like this:

```ab
mv("/tmp/a", "/tmp/b") failed {
    echo("Error")
}
```

## Rm

Removes files or directories from the filesystem. This is a failable builtin — use `failed` blocks or `trust` to handle errors.

```ab
rm("oldfile.txt")
rm("-r", "/tmp/olddir")  // Recursive removal
```

## Touch

Creates empty files or updates the modification timestamp of existing files. Accepts one or more file paths.

```ab
touch("newfile.txt")
touch("/tmp/a.txt", "/tmp/b.txt")
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

## Sleep

Pauses script execution for the specified number of seconds. Supports decimal values for sub-second delays.


```ab
sleep(5)   // Wait 5 seconds
sleep(0.5) // Wait half a second
```

## Pid

Returns the PID (Process ID) of the last background process executed. Useful for process management.


```ab
let last_pid = pid()
echo("Last process: {last_pid}")
```

## Disown

Removes background jobs using shell's job control. Can optionally accept a specific PID.

```ab
disown()      // Disown the most recent background job
disown(1234)  // Disown a specific PID
```

