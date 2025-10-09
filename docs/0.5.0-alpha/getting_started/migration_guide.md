This guide provides a step-by-step walkthrough for migrating code from 0.4.0-alpha to 0.5.0-alpha. The current version introduces several breaking changes. This document outlines the modifications, explains how to adapt your code to maintain the same behavior, and highlights updated features. In this guide we will cover two main categories of changes:
1. **Language Features**: Changes and updates to the core language syntax and semantics.
2. **Standard Library Updates**: Modifications to existing standard library functions and their usage.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# New integer `Int` data type <!-- #712 #752 -->

Previously, Amber supported only the Num type. This release introduces `Int`, which maps to Bash’s native integer arithmetic. To support this, we’ve updated parts of the language syntax.

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

Status builtin now returns value of type `Int`.

```ab
// Before
status // Returns `Num` value

// After
status // Returns `Int` value
```

# Failable Types Replaced by Failable Functions <!-- #642 -->

The internal handling of "failable" operations has been refactored. Previously, the concept of failability was tied to a `Failable` type variant (e.g., `Text?`), which could lead to confusion. The `Failable` type variant has now been removed from the type system.

This change clarifies how the `?` operator functions and how return types are interpreted for failable operations.

**Before (Conceptual Interpretation):**
Under the old model, `fun getData(): Text?` might have been conceptually understood as a function returning an "optional Text" type, similar to `Option<Text>` in other languages.

```ab
fun get_data(): Text? {
    // ... logic that might fail ...
    return "Success"
}

// If 'Text?' was a distinct type, one might conceptually expect to 'unwrap' it.
// However, Amber's '?' operator already handled control flow.
let result = trust get_data() // 'result' was implicitly Text if successful, but the type system had 'Text?'
```

**After (Actual Interpretation):**
Now, `fun getData(): Text?` explicitly means that `getData` is a *failable function* that, upon successful execution, returns a value of type `Text`. The `?` is a modifier on the function declaration, not part of the return type itself.

```ab
fun getData(): Text? { // This function is failable, and returns Text on success.
    // ... logic that might fail ...
    return "Success"
}

let result = trust getData() // 'result' is now explicitly of type Text if the function succeeds.
// The compiler no longer considers 'Text?' as a distinct type.
// The '?' operator continues to propagate failure as before.
```

**Impact on your code:**
Existing failable operations (e.g., `let raw = $ curl data.com $?`) retain their syntax. The key change is conceptual: `?` now signifies a *failable function* rather than a "failable type." This improves consistency and predictability in error handling. While direct code changes are generally not required for existing failable operations, this refactoring provides a stronger foundation for future error handling features, including the new `succeeded` blocks (see [What's New](/0.5.0-alpha/getting_started/whats_new#conditional-blocks-succeeded-and-failed)).

# Text to Bool Casting Warning <!-- #719 -->

Casting `Text` to `Bool` now issues an "absurd cast" warning. While not an error, it indicates a potential logical issue and encourages explicit conversion for clarity.

```ab
// Before
let my_text = "true"
if my_text { // Implicit cast, no warning
    echo "It's true!"
}

// After
let my_text = "true"
if my_text { // Warning: Absurd cast from Text to Bool
    echo "It's true!"
}
// Recommended explicit conversion
if my_text == "true" {
    echo "It's true!"
}
```

# String Literal Escaping Changes <!-- #594 -->

A bug related to the escaping of `$` sequences within string literals has been fixed. Previously, `"\\$variable"` would incorrectly interpolate the value of `variable` instead of treating `$` as a literal character. If your code inadvertently relied on the previous buggy behavior where `\$` within a string literal was interpolated, you will now observe the correct behavior where `\$` is treated as a literal dollar sign. You may need to adjust your string literals if you intended interpolation in such cases.

**Before (Buggy Behavior):**
```ab
fun print_var(var: Num): Null {
    echo "\\$var"
}
print_var(45) // Output: 45 (incorrect interpolation)
```

**After (Correct Behavior):**
```ab
fun print_var(var: Int): Null {
    echo "\\$var"
}
print_var(45)  // Output: \\$var (literal dollar sign)
```

# Invalid Escape Sequence Warnings <!-- #732 -->

The compiler now issues warnings for invalid escape sequences within string literals. While this does not prevent compilation or change the runtime behavior of your scripts (invalid sequences are still output literally), it helps identify potential mistakes and encourages the use of valid escape sequences. If your build process treats warnings as errors, you may need to address these warnings by correcting the escape sequences or explicitly escaping backslashes.

```ab
echo "Hello \$ World" // This will now produce a warning
```

# Command String Escaping Changes <!-- #772 -->

The internal handling of text within commands has been refactored, leading to a breaking change in how double quotes (`"`) should be escaped within command strings. Previously, `"` might have been escaped with `\"` in some contexts, but this is no longer the correct behavior.

Double quotes (`"`) should *not* be escaped with a backslash (`\`) when used within command strings. The parser now handles this automatically. If your code contains command strings where double quotes are escaped (e.g., `$ echo \"hello\" $`), you must remove the backslash.

```ab
// Before (will now cause an error or incorrect behavior)
$ printf \"Amber\" $ // Incorrect: will now be interpreted as a literal backslash followed by a double quote

// After (correct behavior)
$ printf "Amber" $ // Correct: the double quote is handled by the parser
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
| *removed* | `date_compare` | Compares two dates and returns value of a sign function. |

## Regex Functions Compatibility Changes <!-- #717 -->

To improve cross-platform compatibility, especially with macOS and BusyBox environments, the standard library functions `match_regex()` and `replace_regex()` no longer support certain GNU Sed-specific regular expression features. If your existing code relies on these GNU Sed-specific features within `match_regex()` or `replace_regex()`, you will need to update your regular expressions to use POSIX-compliant alternatives. For example, instead of `\b`, you might use `[[:<:]]` and `[[:>:]]` for word boundaries, or ensure you are using ERE for alternation (`|`).

The following regular expression features are no longer supported within `match_regex()` and `replace_regex()`:
*   `\b` (word boundary) in both Extended Regular Expressions (ERE) and Basic Regular Expressions (BRE).
*   `|` (alternation) in Basic Regular Expressions (BRE).

## Function Renaming <!-- #768 -->

The standard library function `parse_number` has been renamed to `parse_num` to align with the new `Int` data type and improve clarity. If your code directly calls `parse_number`, you will need to update these calls to `parse_num`.

```ab
// Before
let num_val = parse_number("123.45")

// After
let num_val = parse_num("123.45")
```

## Functions Now Failable <!-- #791 -->

Several standard library functions that previously returned a `Bool` to indicate success or failure have been updated to be failable functions. This change aligns with Amber's failable function paradigm, providing a more consistent and robust error handling mechanism. These functions no longer return a `Bool`. Instead, they will either succeed (and return `Null`) or fail, triggering the failable mechanism (e.g., propagating failure with `?` or being caught by a `failed` block).

**Affected Functions:**
- `std/fs::symlink_create`
- `std/fs::dir_create`
- `std/fs::file_chmod`
- `std/fs::file_chown`
- `std/net::file_download`

```ab
// Before
if dir_create("my_directory") {
    echo "Directory created successfully."
} else {
    echo "Failed to create directory."
}

// After
dir_create("my_directory") then(status) {
    if status == 0:
        echo "Directory created successfully."
    else:
        echo "Failed to create directory."
}
```
