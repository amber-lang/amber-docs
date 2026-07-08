# Error Handling {#error_handling}

Amber provides several mechanisms for handling errors: failable functions, the `?` operator for error propagation, status codes, and error handling blocks.

## Failable Functions

Functions that include unhandled _failable_ statements - such as `fail` statements or the `?` error propagation operator - are also marked as _failable_. This allows errors to propagate naturally through the call stack, enabling centralized and consistent error handling.

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

The `?` operator automatically fails the current function with the `status()` code of the failing operation. For example, if `parse` fails with exit code 2, the `failing` function itself fails with code 2:

```ab
failing("test") failed(code) {
    echo("Failed with code {code}")  // Outputs: Failed with code 2
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

If `readFile` fails with exit code 1, `processFile` immediately fails with code 1 — the `return result` line is never reached.

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

## `trust` and `?` Combinations

The `trust` modifier ignores failure handling requirements, while the `?` operator propagates failures. These two mechanisms are contradictory and cannot be combined on the same expression:

```ab
fun invalid(filename): Int? {
    let content = trust readFile(filename)?   // ERROR: cannot combine trust with ?
    return content
}
```

The compiler will correctly diagnose this as an invalid combination. Use either `trust` (to ignore failures) or `?` (to propagate them), but not both on the same expression.

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
let result = safeDivision(15, 0) failed {
    echo("Function failed with status {status()}")
}
// Outputs: Function failed with status 1
```

Inside a `failed` block, `status()` returns the exit code of the failed operation.

## Error Handling Blocks

Amber provides three modifiers to handle the outcome of failable operations: `failed`, `succeeded`, and `exited`.

### `failed`

The `failed` modifier runs its block only when the preceding operation fails. It can optionally capture the exit code into a variable:

```ab
let result = someFailableFunction() failed(code) {
    echo("Operation failed with code {code}")
    // Handle the error appropriately
}
```

### `succeeded`

The `succeeded` modifier runs its block only when the preceding operation completes successfully:

```ab
let result = someFailableFunction() succeeded {
    echo("Operation completed successfully")
}
```

### `exited`

The `exited` modifier runs its block regardless of whether the operation failed or succeeded. It can optionally capture the exit code:

```ab
let result = someFailableFunction() exited(code) {
    echo("Operation exited with code {code}")
}
```

For more examples of `failed`, `succeeded`, and `exited` with shell commands, see [Commands](/basic_syntax/commands).

## Best Practices

1. **Use `trust` when you're confident a failable operation will succeed**
2. **Use `?` for automatic error propagation in failable functions**
3. **Use `failed(code)` blocks when you want to handle specific failures gracefully**
4. **Use `exited(code)` for cleanup logic that must run regardless of outcome**
5. **Mark functions as failable (`Type?`) only when they can actually fail**

---

For more information on builtins that are failable, see [Builtins](/advanced_syntax/builtins).
