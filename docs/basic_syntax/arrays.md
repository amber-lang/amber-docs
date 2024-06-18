# Arrays

We learned about array literals in the first chapter. In this chapter we will learn how to make use of them. Arrays are indexed from zero.

To store or retrieve a value at a particular index of an array, you can use the following syntax:

```ab
let groceries = ["Apple", "Banana", "Orange"]
groceries[0] = "Almond"
echo groceries[1]
// Outputs: Banana
```

> WARNING: As of right now (Amber alpha) the subscript syntax does not work with expressions! This means that you can't evaluate expressions like: `foo()[0]` yet.

You can also _echo_ an entire array

```ab
echo groceries
// Outputs: Almond Banana Orange
```

To add element to an array you can use the mentioned in the [expressions chapter](/basic_syntax/expressions) addition operator to merge two arrays together.

```ab
let capitals = ["London", "Paris"]
capitals += ["Warsaw"]

let cities = capitals + ["Barcelona", "Florence"]
```

In order to see more operations on the array data type take a look at the standard library documentation which covers functions such as `join`, `len` or `sum`.

# Ranges

Amber gives you the ability to generate an array of numbers `[Num]` of certain range. There are two types of ranges:
- `..` Exclusive that are from a to b excluding b
- `..=` Inclusive that are from a to b including b

```ab
echo 0..10
// Outputs: 0 1 2 3 4 5 6 7 8 9

echo 0..=10
// Outputs: 0 1 2 3 4 5 6 7 8 9 10
```
