> WARNING: Brief description of new changes TBD when releasing

# Union Types
Union types provide a flexible way to define function parameters that can accept values of multiple distinct types.

```ab
fun print_value(val: Int | Text | Bool) {
    echo(val)
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

# Improved variable diagnostics

The compiler now surfaces clearer warnings when variables are not used, helping you catch mistakes earlier. It also warns when a variable declared with `let` is never modified, encouraging the use of `const` for bindings that never need reassignment.

```ab
let unused = 1 // Warning: variable 'unused' is not used
let count = 3  // Warning: variable 'count' is never modified - consider using 'const'
echo(count)
```

# Array Type Resolution

Amber now supports type inference for empty arrays `[]`. You can initialize an empty array without specifying its type immediately. The type will be resolved later based on how the array is used, such as in assignments, binary operations, or function calls.

```ab
let arr = [] // Type is generic
arr += [1]   // Resolved to [Int]
```

# Array destructing

You can now destruct arrays into separate variables:

```ab
let arr = [1,2,3]
let [key1, key2, key3] = arr

echo("{key1} {key2} {key3}" // 1 2 3)
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

## New `fetch` function for HTTP requests

The `fetch` function provides a functionality for making HTTP requests. It intelligently utilizes available command-line tools for network operations, with a failover to bash's network sockets. This function supports a comprehensive set of HTTP methods, including `GET`, `POST`, `PUT`, and `DELETE`.

```ab
import { fetch } from "std/http"

let response = trust fetch("https://example.com")
let post_request = trust fetch("https://example.com", "POST", "hello world!", [ "content-type: text/plain" ]) // POST request
```
