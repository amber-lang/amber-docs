{#let}

Variables are the way to store values we discussed earlier. In order to create a variable you can use a `let` keyword. Here is an example:

```ab
let name = "John"
```

The above example shows how to initialize a variable. However if you have already created the one you want, you can reassign it just by name (without using any keywords)

```ab
name = "Rob"
```

And to access the value stored by this variable - just refer to it by name, like so:

```ab
echo(name) // Outputs: "Rob"
```

> WARNING: The Amber compiler reserves all identifiers starting with double underscore `__` in addition to keywords like `let`, `if`, etc.

## Shadowing

Variable declarations in Amber cannot be redeclared in the same scope. However, shadowing is allowed in nested inner scopes:

```ab
let result = 123
if true {
    // This is valid: shadowing in an inner scope
    let result = "Hello my friend"
    echo(result)
}
// Out here, `result` is still 123
```

## Public Variables (`pub`)

When working with multiple files and modules, you might want to expose a variable to be imported by other files. You can do this by prefixing the variable declaration with `pub`:

```ab
pub const MAX_RETRIES = 5
```

By default, public variables must be constants to prevent shared mutable global state. If you absolutely need a mutable public variable, you must explicitly opt-in using the `#[allow_public_mutable]` compiler flag:

```ab
#[allow_public_mutable]
pub let config_value = "default"
```

These variables can then be imported and used in other modules. (See the [Importing](importing) section for more details.)

# Constant {#const}

Constant is a type of variable that cannot be modified.

```ab
const sunrise = "east"
sunrise = "west" // ERROR: Cannot reassign constant 'sunrise'
```

## Variable Diagnostics
Amber performs control flow analysis on your code to help you identify common mistakes with variables. 

- **Unused variables:** If you declare a variable with `let` or `const` and never read its value, the compiler will emit a warning alerting you to a potential bug or dead code.
- **Unmodified `let` variables:** If you declare a variable with `let` but never reassign its value, Amber will suggest converting it to a `const`. This promotes better coding practices and makes your intentions explicit.

```ab
let unused = 1 // Warning: variable 'unused' is not used
let count = 3  // Warning: variable 'count' is never modified - consider using 'const'
echo(count)
```
