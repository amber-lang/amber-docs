Featuring a new compiler backend that improves readability, reliability, and performance of bash output, new `Int` data type and more.

# Amber LSP

Amber now offers code autocompletion, intelligent suggestions, real-time error checking, and more. It’s available in both [VS Code](https://marketplace.visualstudio.com/items?itemName=amber-lsp-publisher.amber-lsp), [Zed](https://zed.dev/extensions/amber) and [Helix](https://github.com/helix-editor/helix) through our language extension. Prebuilt binaries for all supported platforms can be found in the [LSP release page](https://github.com/amber-lang/amber-lsp/releases). Thank you [@KrosFire](https://github.com/KrosFire) for developing the LSP.

![Amber LSP Feature]{"width": "100%"}(/images/lsp-example-light.webp)(/images/lsp-example-dark.webp)

# Support for a wide range of Bash versions
<!-- #616 #686 #703 #704 #708 #701 #709 #710 #725 -->
Amber now compiles to a bash that is compatible with Bash versions all the way back from `3.2` to latest (currently `5.3`).

To achieve this, we integrated all the different bash versions and a macos runner into our continuous integration (CI) pipeline. Thank you [@lens0021](https://github.com/lens0021).

# More readable bash output <!-- #654 -->

![Bash output comparison]{"width": "100%"}(/images/bash-output-comparison-light.webp)(/images/bash-output-comparison-dark.webp)

# Integer type <!-- #721 #752 #768 -->

New integer `Int` data type that is now the only supported type for:
- **Array subscript** - `i` in `arr[i]` can only be of type `Int`
- **Range** - `a` and `b` in `a..b` range operator can only be `Int`
- **Iterator** - `i` in `for i, item in items` is `Int` instead of `Num`.

# Comparison <!--703-->

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


# Optimizer <!-- #706 #728 #763 -->

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

For now, this optimizer works for simple expressions, but it will be improved as we continue to develop Amber.

# Reversed range support <!-- #753 -->

Previously, the range function required `start < end`. Now it supports any numeric order.

```ab
echo 0..3 // [0, 1, 2]
echo 6..3 // [6, 5, 4]

echo 0..=3 // [0, 1, 2, 3]
echo 6..=3 // [6, 5, 4, 3]
```

# Standard library

- New standard library function `bash_version` (in `std/env`) that returns currently installed version of bash.
- New `temp_dir_create` function that properly creates a temporary directory on linux and macOS. Thanks [@lens0021](https://github.com/lens0021) <!-- #718 #726 -->

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

# Other Features

- Documentation Generator can output generated.documentation to standard output. Thanks [@hdwalters](https://github.com/hdwalters).
- Improved compiler error reporting.
- When Amber is built by development branch, now the binary version includes commit hash. Thanks [@Thesola10](https://github.com/Thesola10).
- Improved shellcheck code coverage.
- Compiler collaborators can now benefit from a ready VS Code debug profile. Thanks [@b1ek](https://github.com/b1ek).

# Bugfixes

- Duplicate argument names are not allowed. Thanks [@MuhamedMagdi](https://github.com/MuhamedMagdi). <!-- #680 -->
- Standard library `replace_regex` now properly works on macOS and Linux musl. Thanks [@Aleksanaa](https://github.com/Aleksanaa). <!-- #686 -->
- Casting `Text` to `Bool` now raises an absurd cast warning. Thanks [@lens0021](https://github.com/lens0021). <!-- #719 -->
- Fixed escaping of backticks in text literals.
