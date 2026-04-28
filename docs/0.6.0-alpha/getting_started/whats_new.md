Amber 0.6.0 brings exciting new features, improved developer experience, multi-shell support, and important additions to the standard library. Let's delve into what's new.

# Multi-shell support (Zsh, Ksh, Bash 3.2)
Amber now supports compiling not just to modern Bash, but also directly to Zsh, Ksh, and Bash 3.2 via the new `--target` argument! Now you can deploy Amber scripts in a broader range of UNIX environments.
```sh
amber my_script.ab --target zsh
```
Amber generated scripts now emit the correct shebang for the selected target. Range-related generated code no longer depends on external `bc`/`sed` in the same way, greatly improving portability, especially on macOS (where Bash 3.2 is default). You can also now use the new `shellname()` and `shellversion()` builtins for runtime shell introspection.

```ab
echo("Running on {shellname()} version {shellversion()}")
```

# Public (`pub`) variables
You can now declare variables as `pub` to expose them across modules, simplifying data sharing across your multi-file Amber projects.
```ab
pub const my_global = "value"
```
Please note that exposing mutable variables (`pub let`) is also supported but requires explicit opt-in using the `#[allow_public_mutable]` attribute at declaration.

# Recursive Functions
Amber now supports recursive function calls, giving you more flexibility for implementing algorithms.

```ab
fun factorial(n: Int): Int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

echo("{factorial(4)}") // Outputs: 24
```

# Ternary Control-Flow Validation
Added control-flow-aware validation for ternary expressions and related typing, making your inline conditional assignments much safer and smarter.

```ab
// The compiler correctly types this based on condition logic
let candy = count > 1 then "candies" else "candy"
```

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

We also introduced a new `std/test` library.

```ab
test "can multiply numbers" {
    let result = 10 * 2
    // assertions ...
}
```

You can also name your tests for better readability and filter them by name or filename using CLI arguments. Read more in the [Testing Guide](testing).

# Improved variable diagnostics

The compiler now surfaces clearer warnings when variables are not used, helping you catch mistakes earlier. It also warns when a variable declared with `let` is never modified, encouraging the use of `const` for bindings that never need reassignment. All same-scope redeclarations of symbols are now completely rejected, enforcing better coding practices.

```ab
let unused = 1 // Warning: variable 'unused' is not used
let count = 3  // Warning: variable 'count' is never modified - consider using 'const'
echo(count)
```

# Enhanced CLI and Failable diagnostics

Improved handling and messaging for unknown CLI commands, including typo suggestions to quickly help you fix your command. It also brings improved errors when external commands do not exist.

Rules around failable functions are also now strictly validated:
*   Failable functions must use `?` syntax.
*   Infallible functions must not use `?`.
*   Invalid combinations of `trust` and `?` are clearly diagnosed.

```ab
// ERROR: Infallible function using ?
fun no_fail(): Int? { return 1 }

// ERROR: Failable function not using ?
fun might_fail() { fail 1 } 

// CORRECT
fun will_fail(): Int? { fail 1 }
```

# Improved runtime safety

A runtime error is now raised correctly if you attempt out-of-bounds indexing on arrays, including source location.

```ab
let items = ["apple", "banana"]
echo(items[5])
// Error: Index out of bounds (at file:row:col)
```

# New builtins and syntax reform

All builtins like `echo` have moved toward function-call syntax with parentheses:

```ab
echo("Hello world")
cd("newdir")
mv("file.ab", "newdir")
exit(1)
```

Older no-parentheses builtin calls are still supported in relevant cases, but now emit deprecation warnings.

Amber 0.6.0 also adds many useful builtins: `touch()`, `lock()`, `clear()`, `cp()`, `ls()`, `rm()`, `pwd()`, `pid()`, `sleep()`, `await()`, and `disown()`.

# Array Type Resolution

Amber now supports type inference for empty arrays `[]`. You can initialize an empty array without specifying its type immediately. The type will be resolved later based on how the array is used, such as in assignments, binary operations, or function calls.

```ab
let arr = [] // Type is generic
arr += [1]   // Resolved to [Int]
```

# Array destructing

You can now destruct arrays into separate variables for both declarations and assignments:

```ab
// Declaration
let arr = [1,2,3]
let [key1, key2, key3] = arr

echo("{key1} {key2} {key3}") // 1 2 3

// Re-assignment
[key1, key2, key3] = [4, 5, 6]
```

# More flexible comments
Comments are now supported inside function properties, if blocks, arrays and multi-line imports, making the language significantly more pleasant to format over multiple lines.

# Standard library improvements

This release includes numerous improvements to the Standard Library such as `cpad`, `file_compress`, `shopt_enable`/`shopt_disable`, and array sorting functions (`sort()`, `sorted()`).

Other major additions include:
*   **Filesystem helpers:** `file_glob()` and `file_glob_all()`.
*   **Environment and system helpers:** `env_const_set()`, `env_var_set()`, `uname_*()` variants, `mount()`, `umount()`, and `umount_force()`.
*   **Process management:** `pgrep()`, `pgrep_exact()`, `pkill()`, `pkill_exact()`, `pkill_force()`, and `kill()`.
*   **Text/output helpers:** `printf()`, `styled()`, `echo_colored()`, `count_lines()`, `count_words()`, `count_chars()`, `sort_lines()`, and `uniq_lines()`.

```ab
import * from "std/env"
import * from "std/fs"

// Use wildcards
let files = file_glob_all("**/*.ab") 

// Modify shell environment execution easily
env_var_set("DEBUG", "1")
```

## New `std/test` module

We introduced a new [`std/test`](../stdlib/doc/test) library that provides `assert` and `assert_eq` functions to help you write tests.

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

## Docs and Distribution

Amber now officially offers Debian and RPM packaging for our releases. In addition, we have improved the documentation generation around shell function declarations and more reliably preserve indentation in doc code blocks!

# Breaking Changes / Migration Notes

Amber 0.6.0 introduces several important breaking changes to improve correctness and safety:

*   **Builtins function-call syntax:** Builtins like `echo` must now use the `()` syntax (`echo("Hello")`). The legacy no-parentheses usage is deprecated and emits warnings.
*   **No Same-Scope Redeclaration:** Redeclaring an existing variable name within the exact same scope is now strictly rejected.
*   **Strict Failure Validation:** Rules regarding failable returns and trust are much stricter. Using `?` in an infallible function or omitting it in a failable return type will result in compilation errors.
*   **Index Out of Bounds:** Out of bounds array indexing will properly fail at runtime rather than behaving silently.
