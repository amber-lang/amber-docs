This guide provides a step-by-step walkthrough for migrating code from 0.3.5-alpha to 0.4.0-alpha. The current version introduces several breaking changes. This document outlines the modifications, explains how to adapt your code to maintain the same behavior, and highlights updated features. In this guide we will cover two main categories of changes:
1.	**Language Features**: Changes and updates to the core language syntax and semantics.
2.	**Standard Library Updates**: Modifications to existing standard library functions and their usage.

Follow along to ensure a smooth transition to the new version. Let’s get started!

# Command

The command can potentially fail. In the previous version the `unsafe` keyword was used to indicate that this command's failure should be ignored. In this release we renamed this keyword to `trust`, to better convey intent.

```ab
// Before
unsafe $ ls -a $

// After
trust $ ls -a $
```

# Iterator loop

To align with standards and improve readability, the `loop` keyword used for iterator loops has been replaced with `for`. This change ensures linguistic consistency and adopts a convention widely recognized across many programming languages.

```ab
// Before
loop number in 0..=5 {
    echo number
}

// After
for number in 0..=5 {
    echo number
}
```

# Builtin

We've introduced new builtins `len`, `exit` and `lines`, replacing their equivalents in the standard library.

## Len

To emphasize that `len` supports multiple data types, such as text and arrays, it has been moved to a builtin.

```ab
// Before
import { len } from "std/text"
echo len("Hello there!")
echo len([1, 2, 3])

// After
echo len("Hello there!")
echo len([1, 2, 3])
```

## Exit

Exit is used so often that we decided to move it as a separate built-in as well. It's implemented as a builtin statement which means that we can remove the parentheses.

```ab
// Before
import { exit } from "std/env"
exit(1)

// After
exit 1
```

## Lines

Lines was not only moved into a built-in but also it was changed in functionality. Before it accepted a `Text` value which then was splited by new line characters. In this version the newly added builtin accepts a path to file for which it returns each line.

```ab
// Before
import { lines } from "std/text"
import { file_read } from "std/fs"
lines(file_read("/path/to/file"))

// After
lines("/path/to/file")
```

> DETAILS: This built-in is specifically optimized for direct use as an iterator in a for loop. When used this way, it does not load the entire file into memory but processes it line by line, ensuring efficient resource usage.

For scenarios where lines was used on a `Text` value originating from sources other than a file, it is recommended to use the new standard library function `split_lines` instead.

```ab
// Before
import { lines } from "std/text"
lines(long_text)

// After
import { split_lines } from "std/text"
split_lines(long_text)
```


# Standard Library

In order to keep a consistent standard library function naming, most of the functions have been renamed with one exception.

## Make executable (`make_executable`)

This function has been removed in favor of `file_chmod`. The same effect can be achieved when used with `+x` flag.

```ab
// Before
import { make_executable } from "std/fs"
make_executable("script.ab")

// After
import { file_chmod } from "std/fs"
file_chmod("script.ab", "+x")
```

## Renamed functions

Below is a table of all the functions that have been renamed. Their functionality and definitions remain unchanged.

### `std/array`

New Name             |Old Name
---------------------|---------------------
array_contains       |includes
array_extract_at     |extract_at
array_find           |array_first_index
array_find_all       |array_search
array_first          |first
array_last           |last
array_pop            |pop
array_remove_at      |remove_at
array_shift          |shift

### `std/date`

New Name             |Old Name
---------------------|---------------------
date_now             |now

### `std/env`

New Name             |Old Name
---------------------|---------------------
bold                 |text_bold
echo_colored         |color_echo
echo_error           |error
env_const_get        |shell_constant_get
env_const_set        |shell_constant_set
env_file_load        |load_env_file
env_var_get          |shell_var_get
env_var_load         |get_env_var
env_var_set          |shell_var_set
env_var_test         |shell_isset
env_var_unset        |shell_unset
escaped              |printf_escape
input_confirm        |confirm
input_prompt         |input
italic               |text_italic
styled               |text_shell
underlined           |text_underlined

### `std/fs`

New Name             |Old Name
---------------------|---------------------
dir_create           |create_dir
dir_exists           |dir_exist
file_chmod           |make_executable
file_chown           |change_owner
file_exists          |file_exist
file_extract         |extract
file_glob            |glob
file_glob_all        |glob_multiple
symlink_create       |create_symbolic_link

### `std/http`

New Name             |Old Name
---------------------|---------------------
file_download        |download

### `std/math`

New Name             |Old Name
---------------------|---------------------
std/maths            |abs
math_ceil            |ceil
math_floor           |floor
math_round           |round
math_sum             |sum

### `std/text`

New Name             |Old Name
---------------------|---------------------
capitalized          |capitalize
lowercase            |lower
match_regex_any      |match_any_regex
parse_number         |parse
replace_one          |replace_once
reversed             |reverse
split_chars          |chars
split_words          |words
text_contains        |contains
text_contains_all    |contains_all
text_contains_any    |contains_any
uppercase            |upper
