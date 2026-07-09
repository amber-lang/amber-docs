{#fun #function}

Functions can help you organize the structure of your code into reusable components. Here is how you can declare such function:

```ab
fun myFunction(arg1, arg2) {
    let result = arg1 + arg2
    return result
}

echo(myFunction(2, 3))
// Outputs: 5
echo(myFunction("Hello", " World"))
// Outputs: Hello World
```

Function declared in the example above has name `myFunction` and can take two arguments `arg1`, `arg2` of any type.

If you want to declare a function that takes arguments of certain type - you are encouraged to do this. However, for consistency you are required to specify the return type as well

```ab
fun myFunction(arg1: Int, arg2: Int): Int {
    let result = arg1 + arg2
    return result
}
```

An interesting fact about functions is that they are not parsed unless they are used. This behavior exists because Amber allows you to omit specifying any type at all. When you use such function - then it generates different variants of this function with types that were used (without any duplications).

Amber also supports **Union Types** and **Recursive Functions**. Union types provide a flexible way to define function parameters that can accept values of multiple distinct types:

```ab
fun print_value(val: Int | Text | Bool) {
    echo("{val}")
}

print_value(42)       // Valid
print_value("Amber")  // Valid
print_value(true)     // Valid
```

Recursive functions are also supported, enabling algorithm patterns that call themselves recursively:

```ab
fun factorial(n: Int): Int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}
echo("{factorial(4)}") // Outputs: 24
```

On the condition that you specify an argument's type, you can also specify its default value - it will be used if none other is provided when the function is called:

```ab
fun addition(a: Int, b: Int = 100): Int {
    return a + b
}

echo(addition(10)) // Outputs: 110
echo(addition(10, 20)) // Outputs: 30
```
Notice that arguments with default values must come after the regular arguments.

## Modifiers

You can apply [Command Modifiers](/basic_syntax/commands) to function calls as well. This way you can suppress any output with `silent` modifier or run _failable_ functions as if they could never fail (although this is unrecommended) with `trust` keyword

For more information on failable functions, status codes, and error handling blocks, see [Error Handling](/advanced_syntax/error_handling).

## Variable References `ref` {#ref}

You have the ability to accept variables passed by reference. To  do this you can use the `ref` keyword.

```ab
fun push(ref array, value) {
    array += [value]
}

let groceries = ["apples", "bananas"]
push(groceries, "oranges")
echo(groceries)
// Outputs: apples bananas oranges
```

The behavior of this keyword is pretty similar to `&` in other C-like programming languages.

## Reserved Prefix

The Amber compiler reserves all identifiers starting with double underscore `__` in addition to keywords like `let`, `if`, etc.
