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
echo name // Outputs: "Rob"
```

> WARNING: The Amber compiler reserves all identifiers starting with double underscore `__` in addition to keywords like `let`, `if`, etc.

## Overshadowing

Variable declarations can be overshadowed - this means that you can redeclare the existing variable with different data type in given scope if you need to. Here is an example:

```ab
// `result` is a `Num`
let result = 123
// `result` is a `Text`
let result = "Hello my friend"
```

# Constant

Constant is a type of variable that cannot be modified.

```ab
const gravity = 9.81
gravity = 15 // ERROR: Cannot reassign constant 'gravity'
```
