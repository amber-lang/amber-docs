Compiler flags enable customization of the compiler’s behavior within the scope of a specific function. These flags are particularly useful for managing edge cases by temporarily relaxing certain restrictions. Below is a list of available compiler flags and their functions:
- `allow_nested_if_else` - Disables warnings that recommend using specialized [if-chain](/basic_syntax/conditions#if-chain) syntax.
- `allow_absurd_cast` - Turns off warnings about the potential for nonsensical results when using force-type casting, which may result in an [absurd cast](/advanced_syntax/as_cast#absurd-cast).
- `allow_camel_case` - Suppresses warnings about identifiers not being written in `snake_case`.
- `allow_dead_code` - Disables warnings about unreachable code blocks, such as statically determined `if` or `else` branches.
- `allow_public_mutable` - Suppresses errors when creating mutable `pub let` variables instead of `pub const`, allowing you to share global state across modules.

```ab
#[allow_nested_if_else]
fun foo() {
    // ...
}
```
