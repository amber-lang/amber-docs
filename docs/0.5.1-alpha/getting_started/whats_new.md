Featuring a new compiler backend that improves readability, reliability, and performance of bash output, new `Int` data type and more.

# Amber LSP

Amber now offers code autocompletion, intelligent suggestions, real-time error checking, and more. It’s available in both [VS Code](https://marketplace.visualstudio.com/items?itemName=amber-lsp-publisher.amber-lsp), [Zed](https://zed.dev/extensions/amber) and [Helix](https://github.com/helix-editor/helix) through our language extension. Prebuilt binaries for all supported platforms can be found in the [LSP release page](https://github.com/amber-lang/amber-lsp/releases). Thank you [@KrosFire](https://github.com/KrosFire) for developing the LSP.

![Amber LSP Feature]{"width": "100%"}(/images/lsp-example-light.webp)(/images/lsp-example-dark.webp)

# Support for a wide range of Bash versions
<!-- #616 #686 #703 #704 #708 #701 #709 #710 #725 -->
Amber now compiles to a bash that is compatible with Bash versions all the way back from `3.2` to latest (currently `5.3`).

To achieve this, we integrated all the different bash versions and a macos runner into our continuous integration (CI) pipeline. Thank you [@lens0021](https://github.com/lens0021).

# More readable bash output <!-- #654 #804 #817 -->

The generated Bash output has been significantly improved for readability. The main block is now unindented, removing unnecessary leading spaces. Additionally, the `__` prefix has been removed from non-ALL-CAPS variable and function names, enhancing developer flexibility. ALL-CAPS identifiers retain the `__` prefix to prevent collisions.

![Bash output comparison]{"width": "100%"}(/images/bash-output-comparison-light.webp)(/images/bash-output-comparison-dark.webp)

# Integer type <!-- #721 #752 #768 #774 #821 -->

New integer `Int` data type that is now the only supported type for:

- **Array subscript** - `i` in `arr[i]` can only be of type `Int`
- **Range** - `a` and `b` in `a..b` range operator can only be `Int`
- **Iterator** - `i` in `for i, item in items` is `Int` instead of `Num`.

The standard library has been updated to consistently use `Int` for contexts like indexes, lengths, and incremental numbers.

# Comparison <!-- #703 -->

Comparison operator now supports lexical comparison of `Text` data type.

```ab
echo "file.txt" < "file_new.txt"
```

It also works for lexical comparison of array types `[Text]` and `[Int]`.

```ab
let left = ["apple", "banana", "cherry"]
let right = ["apple", "bananas", "dates"]

echo left > right // True
```

# Enhanced Test Coverage

![Chart showing growing trend of adding tests]{"width": "100%"}(/images/chart-tests-light.webp)(/images/chart-tests-dark.webp)

Over the past three releases, we've maintained a strong commitment to quality assurance, increasing our test coverage by approximately **140% with each version**. This dedication has enabled us to identify and resolve dozens of bugs, steadily advancing Amber toward enterprise-grade reliability. We're committed to continuing this trend in future releases.

# Optimizer <!-- #706 #728 #746 #763 -->

Optimizer removes redundant and unused variables in the bash output. It can significantly reduce the shell code size. Let's take this example:

```ab
let my_array = [1, 2, 3]
echo my_array
```

Now this simple code example would compile to the following result:

```sh
__array_0=(1 2 3)
my_array="${__array_0[@]}"
echo "${my_array[@]}"
```

Why does this code introduce a seemingly redundant variable? Because Bash can’t use array literals directly in expressions, so we must reference a variable. That's why we create an intermediate one. Here is the code after optimization:

```sh
my_array=(1 2 3)
echo "${my_array[@]}"
```

For now, this optimizer works for simple expressions, but it will be improved as we continue to develop Amber. It's still an alpha version, so if you suspect that it works incorrectly, you can disable it with an environment variable:

```sh
AMBER_NO_OPTIMIZE=1 amber ...
```

# Reversed range support <!-- #753 -->

Previously, the range function required `start < end`. Now it supports any numeric order.

```ab
echo 0..3 // [0, 1, 2]
echo 6..3 // [6, 5, 4]

echo 0..=3 // [0, 1, 2, 3]
echo 6..=3 // [6, 5, 4, 3]
```

# While Loop <!-- #762 #812 -->

New `while` loop for executing a block of code as long as a condition is true.

```ab
let i = 0
while i < 5 {
    i += 1
    echo i
}
```

# Conditional Blocks: `succeeded`, `exited` and `failed` <!-- #787 #800 #806 #812 -->

Amber now provides enhanced control flow for failable operations with the introduction of `succeeded` and `exited` blocks and parameter support for `failed` blocks. These features offer more explicit and cleaner ways to handle both success and failure paths for commands and failable functions.

## `succeeded` Block <!-- #787 -->

The `succeeded` block executes when a command or failable function completes successfully (exit code = 0). It complements the existing `failed` block functionality.

You cannot use both `succeeded` and `failed` blocks for the same command/function.

**Commands:**
```ab
$ echo "hello" $ succeeded {
    echo "Command worked!"
}
```

**Failable Functions:**
```ab
fun test(): Num? {
    // ... logic that might fail ...
    return 42
}

test() succeeded {
    echo "Function succeeded!"
}
```

## Enhanced `failed` Block with Parameter Support <!-- #806 -->

The `failed` block now supports an optional parameter that captures the exit code of the failed command or failable function. This eliminates the need for temporary variables and preserves the original exit code, even if other commands are run within the `failed` block.

**Basic usage:**
```ab
silent $ nonexistent_command $ failed(code) {
    echo "Command failed with exit code: {code}"
}
```

**Parameter isolation:**
```ab
silent $ false $ failed(error) {
    trust $ ls > /dev/null $  // This changes 'status'
    echo "Original error: {error}"  // But parameter preserves original code
    echo "Current status: {status}"
}
```

## `exited` Block <!-- #787 -->

Amber now introduces a `exited` block for handling command and failable function exit codes directly. It offers a unified way to access the exit status (success or failure) as a typed integer variable, providing an alternative to separate `failed` and `succeeded` blocks. This enhances code clarity and type safety. The `exited` block requires a mandatory parameter (e.g., `exited(code)`) and cannot be combined with `failed` or `succeeded` blocks for the same failable expression.

**Commands:**
```ab
$ command $ exited(code) {
    echo "Command finished with exit code: {code}"
}
```

**Failable Functions:**
```ab
fun my_failable_func(): Text? {
    // ... logic that might fail ...
    return "Success"
}

my_failable_func() exited(code) {
    echo "Function finished with exit code: {code}"
}
```

# Standard library

- New standard library function `bash_version` (in `std/env`) that returns currently installed version of bash. <!-- #703 -->
- New `temp_dir_create` function that properly creates a temporary directory on Linux and macOS. Thanks [@lens0021](https://github.com/lens0021) <!-- #718 #726 #730 -->
- New standard library function `parse_int` to parse text to an integer. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #768 -->
- Renamed `parse_number` to `parse_num` for clarity. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #768 -->
- `math_sum` no longer uses `awk`, improving portability. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #768 -->
- Seven standard library functions (`symlink_create`, `dir_create`, `file_chmod`, `file_chown`, `file_download`, `array_first`, `array_shift`) have been updated to be failable, providing more robust error handling. Thanks [@lens0021](https://github.com/lens0021). <!-- #791 #789 -->
- New standard library function `array_filled` (in `std/array`) to create an array of a specified size, filled with a given value. Thanks [@UrbanCoffee](https://github.com/UrbanCoffee). <!-- #783 -->
- Removed `env_const_get` function from `std/env`. Use `env_var_get` instead.

## `std/date` <!-- #712 -->

Improved date library by replacing old functions with new ones.

### Removed functions:

| Name | Description |
|:--|:--|
| `date_posix` | By default reads date in a  `YYYY-MM-DDTHH:MM:SST` format and stores in a platform dependent representation |
| `date_add` | Adds time to already parsed date |
| `date_compare` | Compares two dates and returns value of a sign function |

### Introduced functions:

| Name | Description |
|:--|:--|
| `date_from_posix` | Converts textual representation in a default `YYYY-MM-DD HH:MM:SS` format to [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) |
| `date_format_posix` | Converts [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) to a textual representation. |
| `date_add` | Adds time to passed date. |
| `date_sub` | Subtracts time to passed date. |

How to compare dates now? Since date is now stored as milliseconds since epoch, we can simply compare them with `>`, `>=`, `<` and `<=` operators.

# Sudo Command Modifier <!-- #782 #812 -->

Amber now includes a new `sudo` command modifier that intelligently handles privilege escalation. This modifier automatically detects at runtime whether `sudo` is necessary and available, ensuring your scripts run correctly whether executed as root or a regular user.

Its features include runtime detection of `sudo` availability (checked when the script runs, not during compilation), portable scripts that adapt to different environments, and seamless integration alongside existing command modifiers like `trust` and `silent`.

**Single command:**
```ab
sudo $ mv /test.txt /test1.txt $?
```

**Block syntax:**
```ab
sudo {
    $ systemctl restart nginx $?
    $ chown user:group /var/log/app.log $?
}
```

**Combined with other modifiers:**
```ab
sudo trust silent $ systemctl status nginx $
```

# Other Features

- Documentation Generator can output generated.documentation to standard output. Thanks [@hdwalters](https://github.com/hdwalters). <!-- #655 -->
- The documentation now uses `CARGO_PKG_VERSION` instead of `master` when linking, improving reliability. Thanks [@lens0021](https://github.com/amber-lang/amber/pull/649). <!-- #649 -->
- Improved compiler error reporting.
- Function bodies are now properly parsed even when the function is not called, ensuring syntax errors are caught at compile time. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #830 -->
- Refactored internal failable operations from "failable types" to "failable functions" for improved consistency. Thanks [@b1ek](https://github.com/b1ek). <!-- #642 -->
<!-- REVERTED - Added warnings for invalid escape sequences in string literals, improving developer experience by highlighting potential issues. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). #732 #823 -->
- Improved error handling for invalid import statements, providing more helpful messages when `*` is incorrectly used in import closures. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #755 -->
- Suppressed unnecessary warnings for valid escape characters used within commands, improving clarity in compiler output. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #759 -->
- Introduced `AMBER_HEADER` and `AMBER_FOOTER` environment variables, allowing users to customize the header and footer of generated Bash scripts. Thanks [@Thesola10](https://github.com/Thesola10). <!-- #682 -->
- Improved error messages when a `failed` block is not used after a failable expression, providing clearer guidance for error handling. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #769 -->
- Improved error message for `?` operator usage, providing more helpful feedback for developers. Thanks [@Mte90](https://github.com/Mte90). <!-- #805 -->
- The compiler now consistently supports both single-line (`:`) and multi-line (`{}`) block syntax across various language constructs. This enhances flexibility, allowing developers to choose the most readable and concise style for their code. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). For example: <!-- #765 -->
  ```ab
  main:
    run()?
  ```

# Bugfixes

- Duplicate argument names are not allowed. Thanks [@MuhamedMagdi](https://github.com/MuhamedMagdi). <!-- #680 -->
- Standard library `replace_regex` now properly works on macOS and Linux musl. Thanks [@Aleksanaa](https://github.com/Aleksanaa). <!-- #686 -->
- Casting `Text` to other types now emits warnings for potentially problematic conversions, improving type safety awareness. <!-- #830 -->
- Fixed escaping of backticks in text literals.
- The `replace_one` and `replace` functions now properly work when replacing backslash. <!--#592-->
- Fixed an issue where `shfmt` failed when processing generated Bash code for array comparisons. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #715 -->
- Improved cross-platform compatibility for `match_regex()` and `replace_regex()` by disabling certain GNU Sed-specific regular expression features. Thanks [@lens0021](https://github.com/lens0021). <!-- #717 -->
- Fixed bad escaping for strings containing `$` sequences, ensuring correct literal interpretation. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #594 -->
- Fixed an issue where escaped newlines in comments were not correctly ignored during parsing. Thanks [@b1ek](https://github.com/b1ek). <!-- #741 -->
- Fixed a bug where local variables in functions could be unintentionally overwritten by variables from nested function calls, ensuring correct variable scoping. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #729 -->
- Fixed incorrect interpolation of backticks within `Text` literals, ensuring proper command substitution behavior. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #759 -->
- Fixed an error that occurred when attempting to use nested arrays, ensuring proper array handling. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #780 -->
- Fixed an issue where reversed ranges on Linux did not function correctly, ensuring consistent behavior across platforms. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #785 -->
- Fixed an issue where arguments of the main function could be shadowed, ensuring globally unique IDs for main function arguments. Thanks [@lens0021](https://github.com/lens0021). <!-- #796 -->
- Corrected interpolation within single-quoted strings in commands, resolving issues where interpolated values were not properly parsed. Thanks [@lens0021](https://github.com/lens0021). For example:
  ```ab
  trust $ echo '\{"a":1, "b":2}' | jq '.["b"]' $
  ```
  This example now correctly prints `2`.<!-- #808 #814 #819 -->

# Internal Improvements

- When Amber is built by development branch, now the binary version includes commit hash. Thanks [@Thesola10](https://github.com/Thesola10). <!-- #685 -->
- Improved shellcheck code coverage.
- Compiler collaborators can now benefit from a ready VS Code debug profile. Thanks [@b1ek](https://github.com/b1ek). <!-- #692 -->
- Improved internal documentation generation and usage links by correctly referencing prefixed test files and removing excess blank lines from generated Markdown. Thanks [@hdwalters](https://github.com/hdwalters). <!-- #653 -->
- The compiled installation scripts have been removed from the repository and are now published via CI, streamlining the installation process. Thanks [@Mte90](https://github.com/Mte90). <!-- #644 -->
- Implemented a new translation modules architecture for the compiler, introducing a Bash pseudo AST for improved code generation. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #678 -->
- Added Git version information at build-time, which is now included in the command-line `-V` option and generated script headers for better version tracking. Thanks [@Thesola10](https://github.com/Thesola10). <!-- #685 -->
- Refactored the variable handling system in the compiler, transitioning to `VarExprFragment` and `VarStmtFragment` for improved clarity and maintainability. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #698 -->
- Updated CI/CD workflows to run on `main` and `staging` branches, ensuring continuous integration for key development branches. Thanks [@b1ek](https://github.com/b1ek). <!-- #705 -->
- Addressed `clippy::uninlined_format_args` warnings, improving code quality and adherence to Rust best practices. Thanks [@lens0021](https://github.com/lens0021). <!-- #722 -->
- Removed `shfmt` postprocessor support, as it was rendered redundant by internal compiler improvements, streamlining the build process. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #735 -->
- Renamed parameters of `text_contain()`, `text_contain_any()` and `text_contain_all()` functions to `source` and `search` for improved clarity. Thanks [@lens0021](https://github.com/lens0021). <!-- #742 -->
- Improved test suite robustness by fixing concurrency issues in input tests using unique temporary files. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #756 -->
- Refactored CLI tests to use internal API with inline logic, improving simplicity, reliability, and speed. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #754 -->
- Implemented a new and simpler release pipeline, replacing `cargo-dist` for improved maintainability and efficiency. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #758 -->
- Separated type checking into a distinct compiler phase, improving compiler architecture by cleanly separating parsing from type analysis. This allows for more robust error detection and better separation of concerns in the compiler pipeline. <!-- #770 -->
- Introduced an intermediate state for text handling between parsing and translation, simplifying escaping logic and improving compiler architecture. Thanks [@lens0021](https://github.com/lens0021). <!-- #772 -->
- Improved internal documentation and code clarity through various fixes, including correcting internal comments, fixing typos in the standard library documentation, and updating `std/array` documentation to accurately reflect current behaviors. Thanks [@lens0021](https://github.com/lens0021). <!-- #720 #790 #788 -->
- Removed the `build.ab` script, as its functionality has been replaced by the new release pipeline, streamlining the build process. Thanks [@lens0021](https://github.com/lens0021). <!-- #793 -->
- Migrated bash calls in test files to use built-in functions, improving test efficiency and reliability. Thanks [@lens0021](https://github.com/lens0021). <!-- #794 -->
- Updated internal installation, shared, and uninstallation scripts to use recent syntax and standard library features, improving maintainability. Thanks [@lens0021](https://github.com/lens0021). <!-- #792 -->
- Removed rotten TODOs from the codebase. Thanks [@lens0021](https://github.com/lens0021). <!-- #809 -->
- Refactored the `Statement` module for improved code organization and maintainability. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #839 -->
- Resolved issues with uncovered warnings in tests and removed overly strict return type warnings for functions with typed parameters. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #841 -->
- Optimized documentation generation usage examples for improved LSP performance and user experience. Thanks [@Ph0enixKM](https://github.com/Ph0enixKM). <!-- #843 -->
