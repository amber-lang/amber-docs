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
let result = value is Num then 42 else "Hello World"
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

All builtins like `echo` have moved toward function-call syntax with parentheses, older no-parentheses builtin calls are still supported in relevant cases, but now emit deprecation warnings:

```ab
echo("Hello world")
cd("newdir")
mv("file.ab", "newdir")
exit(1)

echo "Hello world" // Works, but produces a warning
```

Amber has gained many new builtins for common shell operations. These builtins generate valid, shellcheck-compatible Bash code and integrate with Amber's error handling system.

## `touch` - Create or update files
Creates an empty file or updates the modification timestamp of an existing file. Accepts a single file path. This is a failable builtin - use failed blocks or trust to handle
```ab
touch("newfile.txt")?
```

## `rm` - Remove files or directories
Removes files or directories from the filesystem. This is a failable builtin - use failed blocks or trust to handle errors.
```ab
rm("oldfile.txt")?
rm("/tmp/olddir", true)?  // Recursive removal
```
## `sleep` - Pause execution
Pauses script execution for the specified number of seconds. Supports decimal values for sub-second delays. Sleep value needs to be equal or greater than 0. This is a failable builtin - use failed blocks or trust to handle 
```ab
sleep(5)   // Wait 5 seconds
sleep(0.5) // Wait half a second
```
## `ls` - List directory contents
Returns an array of filenames in the specified directory. Accepts optional all and recursive boolean parameters. This is a failable expression that returns `[Text]`.
```ab
let files = trust ls("/tmp")

let with_hidden_files = trust ls("/tmp", true, false)
let with_files_in_subdir = trust ls("/tmp", false, true)
let every_file = trust ls("/tmp", true, true)
```
## `pwd` - Print working directory
Returns the current working directory as a `Text` value.
```ab
const dir = pwd()
echo("Current directory: {dir}")
```
## `clear` - Clear the terminal
Clears the terminal screen. Takes no parameters.
```ab
clear()
```
## `cp` - Copy files or directories
Copies files or directories from one location to another. This is a failable builtin.
```ab
cp("source.txt", "backup.txt")?
cp("src_dir", "dest_dir", true)?  // Recursive copy
```

## `pid` - Get process ID
Returns the PID (Process ID) of the last background job. Useful for process management.
```ab
let last_pid = pid()
echo("Last process: {last_pid}")
```

## `disown` - Remove background jobs
Removes a job from the shell's active job table, allowing the script to continue without waiting for it. Accepts optional job pids to disown specific background jobs.
```ab
// Disown the most recent background job
disown()
// Disown specific job
disown(pid)
disown([pid1, pid2])
```

## `lock` - File locking
Creates an exclusive lock on a file, useful for coordinating access between processes.
```ab
// Returns when lock is acquired
lock("/tmp/myapp.lock")?
// ...
```
## `await` - Wait for background processes
Waits for background processes to complete. It takes as an argument a pid or an array of pids. Requires failure handler.
```ab
trust $ sleep 2 & $
await(pid())?
```

## `shellname` - Get shell name
Returns the name of the current shell as a Text value.

```ab
let current_shell = shellname()
echo("Running in: {current_shell}")  // Outputs: bash, zsh, or ksh
```

## `shellversion` - Get shell version
Returns the version of the current shell as a `[Int]` value.

```ab
let version = shellversion()
echo("Shell version: {version}")  // e.g., "5 2 0"
```

## `suppress` - Turn off stderr
Does not display stderr for given command

```ab
suppress $ command that might error $?
```

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
Comments are now accepted in more places where you naturally write them, improving code readability:

* Inside array literals
    ```ab
    let config = [
        "value1",   // First option
        "value2",   // Second option
        // "value3", // Disabled option
    ]
    ```
* Inside import lists
    ```ab
    import {
        func1,      // Core function
        func2,      // Helper function
    } from "utils.ab"
    ```
* Between function parameters
    ```ab
    fun complex(
        a: Int,     // First parameter
        b: Text,    // Second parameter
    ): Text { ... }
    ```
* Between function arguments
    ```ab
    some_func(
        arg1,      // First argument
        arg2,      // Second argument
    )
    ```
* Inside if chains
    ```ab
    if condition1 {
        // Branch 1
    } else if condition2 {
        // Branch 2
    } else {
        // Default branch
    }
    ```

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

## Performance improvements
The Amber standard library has been optimized for better performance in the generated Bash code. Many functions now use more efficient shell constructs and avoid unnecessary subprocess spawning. Combined with the math improvements below, Amber scripts now run significantly faster, especially in loops and data processing tasks.

# Math improvements
Integer arithmetic operations in Amber-generated Bash code now use native Bash arithmetic, eliminating bc and sed dependencies for whole number calculations. Floating-point arithmetic and certain text operations still depend on bc and sed, respectively.

# Docs and Distribution

Amber now officially offers Debian and RPM packaging for our releases. In addition, we have improved the documentation generation around shell function declarations and more reliably preserve indentation in doc code blocks!

# Internal improvements
These changes improve Amber's development workflow, code quality, and internal tooling:

## Testing and code coverage
The Amber codebase now has more tests and code coverage reporting via Codecov. This helps ensure stability and catch regressions early in the development process.

## CI improvements
The continuous integration pipeline has been improved with:

* Nightly builds - automated builds published every night for early testing
* Shellcheck validation - all generated Bash code is validated against shellcheck
* Fixed action versions - GitHub Actions use pinned versions for reproducibility
* rustfmt - Rust code is automatically formatted

## Removed shfmt
The shfmt tool has been removed as a processing tool in the Amber build pipeline, simplifying the build process and reducing external dependencies.

## Improved shellcheck error messages
Shellcheck error messages are now clearer and more helpful when the compiler encounters issues with generated Bash code.

## Amber scripts in the codebase
More Amber scripts are now used internally in the project (see scripts/), demonstrating Amber's capabilities and dogfooding the language in its own development.

## License change
Amber has switched its license from GPLv3 to LGPL (GNU Lesser General Public License). Here's what this means in practice:

* GPLv3 required that any project distributing Amber-compiled code would also need to be licensed under GPLv3 - a "viral" copyleft license that applies to derivative works.
* LGPL is more permissive: you can freely use Amber and its compiled scripts in proprietary or closed-source projects. The LGPL only applies to modifications of Amber itself, not to the scripts you write and compile with it.

This change makes Amber suitable for a wider range of use cases, including commercial and enterprise environments where GPL licensing may be a concern.

# Breaking Changes / Migration Notes

Amber 0.6.0 introduces several important breaking changes to improve correctness and safety:

*   **Builtins function-call syntax:** Builtins like `echo` must now use the `()` syntax (`echo("Hello")`). The legacy no-parentheses usage is deprecated and emits warnings.
*   **No Same-Scope Redeclaration:** Redeclaring an existing variable name within the exact same scope is now strictly rejected.
*   **Strict Failure Validation:** Rules regarding failable returns and trust are much stricter. Using `?` in an infallible function or omitting it in a failable return type will result in compilation errors.
*   **Index Out of Bounds:** Out of bounds array indexing will properly fail at runtime rather than behaving silently.
