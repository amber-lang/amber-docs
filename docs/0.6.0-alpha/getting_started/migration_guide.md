This guide provides a step-by-step walkthrough for migrating code from 0.5.x-alpha to 0.6.0-alpha. The current version introduces several breaking changes to improve language safety, developer experience, and correctness.

# Migrate to 0.6.0-alpha

## Builtin Function-Call Syntax

All built-in commands (like `echo`, `cd`, `exit`, etc.) are moving to standard function-call syntax with parentheses. The legacy no-parentheses usage still works in relevant cases but is officially deprecated and emits compiler warnings.

```ab
// Before (Deprecated)
echo "Hello world"
cd "newdir"
exit 1

// After
echo("Hello world")
cd("newdir")
exit(1)
```

## Same-Scope Variable Redeclarations Rejected

Amber no longer allows redeclaring a variable with the same name in the exact same scope. You can still shadow variables in inner nested blocks, but flat reassignment must omit the `let` or `const` keyword.

```ab
// Before (Worked, but confusing)
let result = 123
let result = "Hello"

// After (Error: Variable 'result' is already declared)
let result = 123
// result = "Hello" // This is also a type error because you cannot reassign Int to Text!

// Shadowing in inner scopes is still allowed:
let result = 123
if true {
    let result = "Hello"
    echo(result)
}
```

## Strict Failure Validation

Failure handling rules are now much stricter, especially around the `?` operator, `trust`, and type signatures. 

*   **Failable functions must use `?` syntax:** If your function can fail, it must be marked.
*   **Infallible functions must not use `?`:** You cannot mark a function as failable if it cannot actually fail.
*   **Typed Failable Returns:** Failable return types must explicitly use `?`. 

```ab
// Before (Loose rules)
fun might_fail(): Int {
    fail 1
}

// After
fun might_fail(): Int? { // The `?` is required on the return type
    fail 1
}
```

Invalid combinations of `trust` and `?` are also now diagnosed proactively by the compiler.

## Array Out-of-Bounds Runtime Error

Out-of-bounds array indexing will now crash your script at runtime instead of failing silently. Ensure you check array lengths (`len(arr)`) before accessing elements dynamically.

```ab
let items = ["apple"]
echo(items[5]) // Will now immediately halt execution with an out of bounds error
```
