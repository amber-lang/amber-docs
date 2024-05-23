# Functions

Functions can help you organize the structure of your code into reusable components. Here is how you can declare such function:

```ab
fun myFunction(arg1, arg2) {
	let result = arg1 + arg2
	return result
}

echo myFunction(2, 3)
// Outputs: 5
echo myFunction("Hello", " World")
// Outputs: Hello World
```

Function declared in the example above has name `myFunction` and can take two arguments `arg1`, `arg2` of any type.

If you want to declare a function that takes arguments of certain type - you are encouraged to do this. However, for consistency you are required to specify the return type as well

```ab
fun myFunction(arg1: Num, arg2: Num): Num {
	let result = arg1 + arg2
	return result
}
```

An interesting fact about functions is that they are not parsed unless they are used. This behavior exists because Amber allows you to omit specifying any type at all. When you use such function - then it generates different variants of this function with types that were used (without any duplications).

## Modifiers

You can apply [Command Modifiers](/basic_syntax/commands) to function calls as well. This way you can suppress any output with `silent` modifier or run _failable_ functions as if they could never fail (although this is unrecommended) with `unsafe` keyword

## Failing

Functions can additionally fail. We call them _failable_ functions. A failable function is a type of function that can fail. To fail a function use a `fail` keyword and follow it with exit code.

```ab
fun failing() {
	fail 1
}
```

Here is another example of a failing function:

```ab
fun failing(name) {
	$command$?
	parse(name)?
}
```

Notice that using `?` operator is automatically failing with the `status` code of the failing operation.

## Status code

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
let result = unsafe safeDivision(24, 4)
echo "{result}, {status}"
// Outputs: 6, 0
```
This was a happy ending. Now let's see what happens when we divide by zero:

```ab
let result = safeDivision(15, 0) failed {
	echo "function Failed"
	echo status
}
// Outputs:
// function Failed
// 1
```

## Variable references `ref`

You have the ability to accept variables passed by reference. To  do this you can use the `ref` keyword.

```ab
fun push(ref array, value) {
	array += [value]
}

let groceries = ["apples", "bananas"]
push(groceries, "oranges")
echo groceries
// Outputs: apples bananas oranges
```

The behavior of this keyword is pretty similar to `&` in other C-like programming languages.

## Reserved Prefix
The Amber compiler reserves all identifiers starting with double underscore `__` in addition to keywords like `let`, `if`, etc.
