# Compiler Flags

Compiler flags allow you to change the behavior of the compiler for the given scope of a function. Remember that some warnings are there for a reason. If you do not understand why some warning is being emitted, go ahead and learn more about basic syntax. Here is a list of all the compiler flags that are ready to be used:
- `allow_nested_if_else` - Turns off the warning that encourages developer to use the syntax designed to handle if else chains.
- `allow_generic_return` - Turns off the warning that tells user to specify a concrete return type when arguments with concrete types are used
- `allow_absurd_cast` - Turns off the warning that tells user that the result of given force type can be [absurd](/advanced_syntax/as_cast#absurd-cast).

Example:
```ab
#[allow_nested_if_else]
fun foo() {
	// ...
}
```