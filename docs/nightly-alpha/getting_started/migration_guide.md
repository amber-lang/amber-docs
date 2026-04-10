This guide provides a step-by-step walkthrough for migrating code from 0.5.0-alpha to 0.6.0-alpha. The current version introduces a single breaking change.
1. **Language Features**: Changes and updates to the core language syntax and semantics.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# Changes to builtin syntax
Builtins now use function-like syntax for code readability and easier parsing:

```diff
- echo "Hello world"
+ echo("Hello world")

- cp "source.txt" "target.txt"
+ cp("source.txt", "target.txt")
```

# New public variables
If you have previously used workarounds to export your variables, you can now remove them and use `pub` modifier:

```ab
pub const VERSION = "1.0"
pub const WORKING_DIR = "."
```

For mutable public variables, you now need to explicitly opt-in with the `#[allow_public_mutable]` attribute:

```ab
#[allow_public_mutable]
pub let counter = 0
```

# Stricter failure handling

The compiler now has stricter rules around failure handling:

- Failable return types must use `?`
- Infallible functions must not use `?`
- Invalid combinations of `trust` and `?` are now diagnosed clearly

```ab
// Now an error - infallible function cannot use ?
fun myFunc(): Int {
    return something()?  // Error
}

// Correct usage
fun myFunc(): Int? {
    return something()?  // Valid - returns Int?
}
```
