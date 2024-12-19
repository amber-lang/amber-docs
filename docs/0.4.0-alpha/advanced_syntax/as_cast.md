As cast is a tool that might initially seem like an easy way to convert types. So, why has this functionality found its place in the advanced category? Well, with great power comes great responsibility. You could perform some casts that make sense, like from `Bool` to `Num`, but you could also perform casts that we refer to as _absurd_. An example of this might be converting `Text` to `Num`.

## Regular Casts

There might be times when you want to pass a variables that is a `Bool` to a function that accepts `Num`. Since Bool and Num are types that are compatible with each other, you can easily cast one into the other like so:

```ab
let isReady = systemIsReady()
processStatus(isReady as Num)
```

## Absurd Casts

Amber allows you to cast one data type to any other data type. This should be avoided and only used if necessary.

```ab
let a = "12"
let b = a as Num
```

We can clearly see that this could lead to some big bugs. For example one could pass `"abc"` instead of `"12"` in a string which is not a valid value for `Num` type. To convert a string to a number, it's better to use `parse()` function from the [standard library]().

```ab
import { parse_number } from "std/text"

let a = "12"
let b = parse_number(a) failed {
    echo "Variable `a` is not a number."
}

echo b + 12
// Outputs: 24
```
