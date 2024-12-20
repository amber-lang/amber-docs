# Ranges

Amber gives us the ability to generate an array of numbers `[Num]` of certain range. There are two types of ranges:
- `a..b` is exclusive from `a` to `b` excluding `b`.
- `a..=b` is inclusive from `a` to `b` including `b`.

```ab
echo 0..10
// Outputs: 0 1 2 3 4 5 6 7 8 9
echo 0..=10
// Outputs: 0 1 2 3 4 5 6 7 8 9 10
```

# Arrays

We learned about array literals in the first chapter. In this chapter we will learn how to make use of them. Arrays are indexed from zero.

To store or retrieve a value at a particular index of an array, we can use the following syntax:

```ab
let groceries = ["apple", "banana", "cherry", "date"]
groceries[0] = "kiwi"
echo groceries[1]
// Outputs: banana
```

> WARNING: As of right now (Amber alpha) the subscript syntax does not work with expressions. This means that we can't evaluate expressions like `foo()[0]` yet.

We can also _echo_ an entire array:

```ab
echo groceries
// Outputs: kiwi banana cherry date
```

To retrieve a slice between a pair of indices of an array, we can use an exclusive range `a..b` or inclusive range `a..=b` (see above) with the following syntax:

```ab
echo groceries[1..3]
// Outputs: banana cherry
echo groceries[1..=2]
// Outputs: banana cherry
```

> WARNING: It is not currently possible to *replace* a slice of an array. This means that we can't evaluate expressions like `groceries[1..=2] = ["kiwi"]` yet.

To add an element to an array, we can use the mentioned in the [expressions chapter](/basic_syntax/expressions) addition operator to merge two arrays together.

```ab
let capitals = ["London", "Paris"]
capitals += ["Warsaw"]
let cities = capitals + ["Barcelona", "Florence"]
```

In order to see more operations on the array data type take a look at the standard library documentation which covers functions such as `join`, `len` or `sum`.

## Nested Arrays

We already learned that Bash does not support nesting arrays. But what makes this limitation? The answer is that under the hood Bash defines arrays that essentially only store structures containing string value. You can learn more about Bash arrays by reading [the official source code](https://git.savannah.gnu.org/cgit/bash.git/tree/array.h).

```c
typedef struct array {
    arrayind_t	max_index;
    arrayind_t	num_elements;
#ifdef ALT_ARRAY_IMPLEMENTATION
    arrayind_t	first_index;
    arrayind_t	alloc_size;
    struct array_element **elements;
#else
    struct array_element *head;
    struct array_element *lastref;
#endif
} ARRAY;

typedef struct array_element {
    arrayind_t	ind;
    char	*value;
#ifndef ALT_ARRAY_IMPLEMENTATION
    struct array_element *next, *prev;
#endif
} ARRAY_ELEMENT;
```
