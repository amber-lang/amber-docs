Compiler flags enable customization of the compiler’s behavior within the scope of a specific function. These flags are particularly useful for managing edge cases by temporarily relaxing certain restrictions. Below is a list of available compiler flags and their functions:
- `allow_nested_if_else` - Disables warnings that recommend using specialized [if-chain](/basic_syntax/conditions#if-chain) syntax.
- `allow_generic_return` - Suppresses warnings that prompt the developer to specify a concrete return type when using arguments with defined types.
- `allow_absurd_cast` - Turns off warnings about the potential for nonsensical results when using force-type casting, which may result in an [absurd cast](/advanced_syntax/as_cast#absurd-cast).

```ab
#[allow_nested_if_else]
fun foo() {
	// ...
}
```
