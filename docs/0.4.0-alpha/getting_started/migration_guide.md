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

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/array |array_contains       |includes
std/array |array_extract_at     |extract_at
std/array |array_find           |array_first_index
std/array |array_find_all       |array_search
std/array |array_first          |first
std/array |array_last           |last
std/array |aray_pop             |op
std/array |array_remove_at      |remove_at
std/array |array_shift          |shift

### `std/date`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/date  |date_now             |now

### `std/env`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/env   |bold                 |text_bold
std/env   |echo_colored         |color_echo
std/env   |echo_error           |error
std/env   |env_const_get        |shell_constant_get
std/env   |env_const_set        |shell_constant_set
std/env   |env_file_load        |load_env_file
std/env   |env_var_get          |shell_var_get
std/env   |env_var_load         |get_env_var
std/env   |env_var_set          |shell_var_set
std/env   |env_var_test         |shell_isset
std/env   |env_var_unset        |shell_unset
std/env   |escaped              |printf_escape
std/env   |input_confirm        |confirm
std/env   |input_prompt         |input
std/env   |italic               |text_italic
std/env   |styled               |text_shell
std/env   |underlined           |text_underlined

### `std/fs`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/fs    |dir_create           |create_dir
std/fs    |dir_exists           |dir_exist
std/fs    |file_chmod           |make_executable
std/fs    |file_chown           |change_owner
std/fs    |file_exists          |file_exist
std/fs    |file_extract         |extract
std/fs    |file_glob            |glob
std/fs    |file_glob_all        |glob_multiple
std/fs    |symlink_create       |create_symbolic_link

### `std/http`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/http  |file_download        |download

### `std/math`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/math  |std/maths            |abs
std/math  |math_ceil            |ceil
std/math  |math_floor           |floor
std/math  |math_round           |round
std/math  |math_sum             |sum

### `std/text`

Module    |New Name             |Old Name
----------|---------------------|---------------------
std/text  |capitalized          |capitalize
std/text  |lowercase            |lower
std/text  |match_regex_any      |match_any_regex
std/text  |parse_number         |parse
std/text  |replace_one          |replace_once
std/text  |reversed             |reverse
std/text  |split_chars          |chars
std/text  |split_words          |words
std/text  |text_contains        |contains
std/text  |text_contains_all    |contains_all
std/text  |text_contains_any    |contains_any
std/text  |uppercase            |upper
