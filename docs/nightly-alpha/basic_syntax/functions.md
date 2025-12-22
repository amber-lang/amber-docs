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

On the condition that you specify an argument's type, you can also specify its default value — it will be used if none other is provided when the function is called:

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

## Failing {#fail}

Functions can additionally fail. We call them _failable_ functions. A failable function is a type of function that can fail. To fail a function use a `fail` keyword and follow it with exit code.

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

Notice that using `?` operator is automatically failing with the `status` code of the failing operation.

If you specify the return type of a failable function, you must also append the `?` to the type name.

```ab
fun failable(): Int? {
    if 0 > 5 {
        fail 1
    }

    return 1
}
```

Note that you cannot force a function to become failable by simply appending the `?` to the return type. The `?` can (and must) only be used in a function declaration, if the function is known to be failable.

## Status Code {#status}

Status code contains information about latest failing function or a command that was run. Accessing status is as simple as using `status` keyword.

```ab
fun safeDivision(a: Num, b: Num): Num {
    if b == 0:
        fail 1
    return a / b
}
```

Now let's see how this code will behave in different scenarios:

```ab
let result = trust safeDivision(24, 4)
echo("{result}, {status}")
// Outputs: 6, 0
```
This was a happy ending. Now let's see what happens when we divide by zero:

```ab
let result = safeDivision(15, 0) failed(code) {
    echo("Function failed with code {code}")
}
// Outputs: Function failed with code 1
```

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
