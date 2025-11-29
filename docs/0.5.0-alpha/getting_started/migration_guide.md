This guide provides a step-by-step walkthrough for migrating code from 0.4.0-alpha to 0.5.0-alpha. The current version introduces several breaking changes. This document outlines the modifications, explains how to adapt your code to maintain the same behavior, and highlights updated features. In this guide we will cover two main categories of changes:
1. **Language Features**: Changes and updates to the core language syntax and semantics.
2. **Standard Library Updates**: Modifications to existing standard library functions and their usage.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# New integer `Int` data type <!-- #712 #752 -->

Previously, Amber supported only the `Num` type. This release introduces `Int`, which maps to Bash’s native integer arithmetic. To support this, we’ve updated parts of the language syntax.

## Array subscript

Expression in the subscript can only be of type `Int`.

```ab
// Before
arr[12.0] // Ok; although fails

// After
arr[12.0] // Error: array subscript can only be an integer
```

## Range

Expressions in range operator can only be of type `Int`.

```ab
// Before
10.0..15.0 // OK; although fails

// After
10.0..15.0 // Error: range can only be applied on integers
```

## Iterator

Iterator variable in for-loop is now of type `Int`.

```ab
// Before
for i, item in items {} // `i` is a `Num`

// After
for i, item in items {} // `i` is an `Int`
```

## Exit

Exit builtin now accepts only expressions of type `Int`.

```ab
// Before
exit 2.0 // Ok; although fails

// After
exit 2.0 // Error: exit accepts only `Int` type
```

## Status

The `status` builtin now returns a value of type `Int`.

```ab
// Before
status // Returns `Num` value

// After
status // Returns `Int` value
```

## Len

The `len` builtin now returns a value of type `Int`.

```ab
// Before
len(text) // Returns `Num` value

// After
len(text) // Returns `Int` value
```

# Text Casting Warning <!-- #719 #830 -->

Casting `Text` to other types including `Bool` and `Int`, now issues an "absurd cast" warning. While not an error, it indicates a potential logical issue and encourages explicit conversion for clarity.

```ab
// Before
echo "true" as Bool then 1 else 0 // OK
echo "42" as Int // OK

// After
echo "true" as Bool then 1 else 0 // Warning: Absurd cast
echo "42" as Int // Warning: Absurd cast
```

To properly convert text to integers, use the `parse_int` function:
```ab
// Recommended approach
let text = "42"
let num = parse_int(text)?
echo num
```

# Escaping Changes

## String Literal Escaping Changes <!-- #594 -->

A bug related to the escaping of `$` sequences within string literals has been fixed. Previously, `"\$variable"` would incorrectly interpolate the value of `variable` instead of treating `$` as a literal character. If your code inadvertently relied on the previous buggy behavior where `\$` within a string literal was interpolated, you will now observe the correct behavior where `\$` is treated as a literal dollar sign. You may need to adjust your string literals if you intended interpolation in such cases.

```ab
// Before
let var = 45
echo "\$var" // Output: 45

// After
let var = 45
echo "\$var" // Output: \$var
```

## Command String Escaping Changes <!-- #772 -->

The internal handling of text within commands has been refactored, leading to a breaking change in how double quotes (`"`) should be escaped within command strings. Previously, `"` might have been escaped with `\"` in some contexts, but this is no longer the correct behavior.

Double quotes (`"`) should *not* be escaped with a backslash (`\`) when used within command strings. The parser now handles this automatically. If your code contains command strings where double quotes are escaped (e.g., `$ echo \"hello\" $`), you must remove the backslash.

```ab
// Before (will now cause an error or incorrect behavior)
trust $ printf \"Amber\" $ // Incorrect: will now be interpreted as a literal backslash followed by a double quote

// After (correct behavior)
trust $ printf "Amber" $ // Correct: the double quote is handled by the parser
```

# Standard Library Updates

## Redesigned `std/date`

The standard library’s Date module has been completely overhauled. We improved how its functions compose, removed obsolete ones, and repurposed others. The complete list of changes is below.

| Old Name | New Name | Description |
|:--|:--|:--|
| `date_posix` | `date_from_posix` | Converts textual representation in a default `YYYY-MM-DD HH:MM:SS` format to [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) |
| *new* | `date_format_posix` | Converts [unix epoch time](https://en.wikipedia.org/wiki/Unix_time) to a textual representation. |
| `date_add` | `date_add` | Adds time to passed date. |
| *new* | `date_sub` | Subtracts time to passed date. |
| *removed* | `date_compare` | Compares two dates and returns value of a sign function. Use standard comparison operators (`>`, `>=`, `<`, `<=`) instead. |

## Regex Functions Compatibility Changes <!-- #717 -->

To improve cross-platform compatibility, especially with macOS and BusyBox environments, the standard library functions `match_regex()` and `replace_regex()` no longer support certain GNU Sed-specific regular expression features. If your existing code relies on these GNU Sed-specific features within `match_regex()` or `replace_regex()`, you will need to update your regular expressions to use POSIX-compliant alternatives. For example, instead of `\b`, you might use `[[:<:]]` and `[[:>:]]` for word boundaries, or ensure you are using ERE for alternation (`|`).

The following regular expression features are no longer supported within `match_regex()` and `replace_regex()`:
*   `\b` (word boundary) in both Extended Regular Expressions (ERE) and Basic Regular Expressions (BRE).
*   `|` (alternation) in Basic Regular Expressions (BRE).

## Function Renaming <!-- #768 -->

The standard library function `parse_number` has been renamed to `parse_num` to align with the new `Int` data type and improve clarity. If your code directly calls `parse_number`, you will need to update these calls to `parse_num`.

```ab
// Before
const num_val = trust parse_number("123.45")

// After
const num_val = trust parse_num("123.45")
```

## Functions Now Failable <!-- #791 -->

Several standard library functions that previously returned a `Bool` to indicate success or failure have been updated to be failable functions. This change aligns with Amber's failable paradigm, providing a more consistent and robust error handling mechanism. These functions no longer return a `Bool`. Instead, they will either succeed or fail, triggering the failable mechanism (e.g., propagating failure with `?` or being caught by a `failed` block).

**Affected Functions:**
- `std/fs::symlink_create`
- `std/fs::dir_create`
- `std/fs::file_chmod`
- `std/fs::file_chown`
- `std/net::file_download`
- `std/array::array_first`
- `std/array::array_shift`

```ab
// Before
if dir_create("my_directory") {
    echo "Directory created successfully."
} else {
    echo "Failed to create directory."
}

// After
dir_create("my_directory") exited(code) {
    if code == 0:
        echo "Directory created successfully."
    else:
        echo "Failed to create directory."
}
```

## Removed `env_const_get` Function

The `env_const_get` function has been removed from `std/env`. Use `env_var_get` instead, which provides the same functionality.

```ab
// Before
env_const_get("VAR")

// After
env_var_get("VAR")
```
