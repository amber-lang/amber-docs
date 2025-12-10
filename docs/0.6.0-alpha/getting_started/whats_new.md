> WARNING: Brief description of new changes TBD when releasing

# Union Types
Union types provide a flexible way to define function parameters that can accept values of multiple distinct types.

```ab
fun print_value(val: Int | Text | Bool) {
    echo val
}

print_value(42)       // Valid
print_value("Amber")  // Valid
print_value(true)     // Valid
```

# Testing suite
Amber now features a built-in testing suite. It allows you to write dedicated `test` blocks that are only executed when running the `amber test` command.

We also introduced a new `std/test` library. More on that in the [Standard library improvements](#standard-library-improvements) section.

```ab
test "can multiply numbers" {
    let result = 10 * 2
    // assertions ...
}
```

You can also name your tests for better readability and filter them by name or filename using CLI arguments. Read more in the [Testing Guide](testing).

# Array Type Resolution

Amber now supports type inference for empty arrays `[]`. You can initialize an empty array without specifying its type immediately. The type will be resolved later based on how the array is used, such as in assignments, binary operations, or function calls.

```ab
let arr = [] // Type is generic
arr += [1]   // Resolved to [Int]
```

# Standard library improvements

> WARNING: Brief description of new changes TBD when releasing

## New `std/test` module

We introduced a new [`std/test`](stdlib/doc/test) library that provides `assert` and `assert_eq` functions to help you write tests.

```ab
import { assert, assert_eq } from "std/test"

test "can multiply numbers" {
    let result = 10 * 2
    assert(result == 20)
    assert_eq(result, 20)
}
```
