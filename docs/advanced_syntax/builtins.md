# Builtins

Builtins are native methods (built in the compiler itself) and they are also reserved keywords in Amber.  

Similar to the standard library, they generate valid [Shellcheck](https://www.shellcheck.net/) code (though full support for this in Amber is still in progress).

## Cd

A classic command in Bash scripts is `cd` which changes the current directory, requires a `Text` parameter.

```ab
cd "/tmp"
```

## Echo

Console output is essential, and the `echo` command allows you to print text to the console, requires a `Text` parameter.

```ab
echo "Hello World!"
```

## Mv

If you need to move files you can use the `mv` builtin, requires two `Text` parameters.

```ab
mv "/tmp/a" "/tmp/b"
```

This builtin is `failable`, meaning you can handle errors like this:
```ab
mv "/tmp/a" "/tmp/b" failed {
    echo "Error"
}
```

## Nameof

For more advanced commands, you might need the mangled name of a variable. The `nameof` keyword provides this functionality.  

For example, this allows you to perform operations like:

```ab
let variable = null

unsafe ${nameof variable}=12$
// Which is the same as:
let variable = 12
```