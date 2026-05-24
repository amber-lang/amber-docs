# Error Handling {#error_handling}

Amber provides several mechanisms for handling errors: failable functions, status codes, and error handling blocks.

## Failable Functions

Functions that include unhandled _failable_ statements - such as `fail` statements or `$ $?` error propagation - are also marked as _failable_. This allows errors to propagate naturally through the call stack, enabling centralized and consistent error handling.

```ab
fun failing() {
    fail 1
}
```

Here is another example of a failing function:

```ab
fun failing(name) {
    $ command $?
    parse(name)?
}
```

Notice that using `?` operator is automatically failing with the `status()` code of the failing operation.

### Failable Function Return Types

If you specify the return type of a failable function, you must also append the `?` to the type name.

```ab
fun failable(): Int? {
    if 0 > 5 {
        fail 1
    }

    return 1
}
```

Note that you cannot force a function to become failable by simply appending the `?` to the return type. The `?` can (and must) only be used in a function declaration, if the function is actually failable.

Conversely, if a function might fail (e.g. it calls another failable function or uses the `fail` keyword), it **must** have the `?` specifier if you annotate its return type.

Combinations of using `trust` and `?` that are considered invalid (such as trying to use a `trust`ed failing result and propagating it with `?` where not applicable) will be correctly diagnosed by the compiler.

## Status Code

Status code contains information about latest failing function or a command that was run. Accessing status is as simple as calling `status()` function.

```ab
fun safeDivision(a: Num, b: Num): Num? {
    if b == 0 {
        fail 1
    }
    return a / b
}
```

Now let's see how this code will behave in different scenarios:

```ab
let result = trust safeDivision(24, 4)
echo("{result}, {status()}")
// Outputs: 6, 0
```

This was a happy ending. Now let's see what happens when we divide by zero:

```ab
let result = safeDivision(15, 0) failed(code) {
    echo("Function failed with code {code}")
}
// Outputs: Function failed with code 1
```

## Error Handling Blocks

Amber provides `failed(code)` blocks to handle function failures gracefully:

```ab
let result = someFailableFunction() failed(code) {
    echo("Operation failed with code {code}")
    // Handle the error appropriately
}
```

## The `?` Operator

The `?` operator is used for automatic error propagation. When a failable function or operation fails, the `?` operator will automatically fail the current function with the same exit code.

```ab
fun processFile(filename): Int? {
    let content = readFile(filename)?        // Fails if readFile fails
    let result = parseContent(content)?      // Fails if parseContent fails
    return result
}
```

## Best Practices

1. **Use `trust` when you're confident a failable operation will succeed**
2. **Use `?` for automatic error propagation in failable functions**
3. **Use `failed(code)` blocks when you want to handle specific failures gracefully**
4. **Mark functions as failable (`Type?`) only when they can actually fail**

---

For more information on builtins that are failable, see [Builtins](/advanced_syntax/builtins).
