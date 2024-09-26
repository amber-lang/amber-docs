# Builtins

Builtins are native methods (built in the compiler itself) and they are also reserved keywords in Amber.  

Similar to the standard library, they generate valid [Shellcheck](https://www.shellcheck.net/) code (though full support for this in Amber is still in progress).

## Cd

Transpile to `cd` which changes the current directory, requires a `Text` parameter.

```ab
cd "/tmp"
```

## Echo

Transpile to `echo` which print text to the console, requires a `Text` parameter.

```ab
echo "Hello World!"
```

## Mv

If you need to move files you can use the `mv` builtin, requires two `Text` parameters.   
*Doesn't support the `mv` unix command parameters*.

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

For more advanced commands, you might need the name of the variable in the compiled script. The `nameof` keyword provides this functionality.  

For example, this allows you to perform operations like:

```ab
let variable = null

unsafe ${nameof variable}=12$
// Which is the same as declaring (but it is more readable in this way)
let variable = 12
```
