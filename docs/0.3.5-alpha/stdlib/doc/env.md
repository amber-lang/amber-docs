## `get_env_var`

```ab
import { get_env_var } from "std/env"
```

```ab
pub fun get_env_var(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.



You can check the original tests for code examples:
* [get_env_var.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/get_env_var.ab)

## `load_env_file`

```ab
import { load_env_file } from "std/env"
```

```ab
pub fun load_env_file(file: Text = ".env"): Null 
```

Load the env file in the environment, using `xargs`



You can check the original tests for code examples:
* [load_env_file.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/load_env_file.ab)

## `shell_isset`

```ab
import { shell_isset } from "std/env"
```

```ab
pub fun shell_isset(name: Text): Bool 
```

Check if a variable inside the Shell session exist



You can check the original tests for code examples:
* [shell_isset.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_isset.ab)

## `shell_constant_set`

```ab
import { shell_constant_set } from "std/env"
```

```ab
pub fun shell_constant_set(name: Text, val: Text): Null ? 
```

Set a constant inside the Shell session



You can check the original tests for code examples:
* [shell_constant_set.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_constant_set.ab)

## `shell_constant_get`

```ab
import { shell_constant_get } from "std/env"
```

```ab
pub fun shell_constant_get(name: Text): Text ? 
```

Get a constant inside the Shell session



You can check the original tests for code examples:
* [shell_constant_get.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_constant_get.ab)

## `shell_var_set`

```ab
import { shell_var_set } from "std/env"
```

```ab
pub fun shell_var_set(name: Text, val: Text): Null ? 
```

Set a constant inside the Shell session



You can check the original tests for code examples:
* [shell_var_set.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_var_set.ab)

## `shell_var_get`

```ab
import { shell_var_get } from "std/env"
```

```ab
pub fun shell_var_get(name: Text): Text ? 
```

Get a constant inside the Shell session



You can check the original tests for code examples:
* [shell_var_get.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_var_get.ab)

## `shell_unset`

```ab
import { shell_unset } from "std/env"
```

```ab
pub fun shell_unset(name: Text): Null ? 
```

Remove a variable inside the Shell session



You can check the original tests for code examples:
* [shell_unset.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/shell_unset.ab)

## `is_command`

```ab
import { is_command } from "std/env"
```

```ab
pub fun is_command(command: Text): Bool 
```

Check if the command exist



You can check the original tests for code examples:
* [is_command.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/is_command.ab)

## `input`

```ab
import { input } from "std/env"
```

```ab
pub fun input(prompt: Text): Text 
```

Create a prompt and return the value



You can check the original tests for code examples:
* [input.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/input.ab)

## `confirm`

```ab
import { confirm } from "std/env"
```

```ab
pub fun confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Confirm prompt (Yes/No), return true if choice is Yes
"No" is the default choice, set default_yes to true for "Yes" as default choice



You can check the original tests for code examples:
* [confirm.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/confirm.ab)

## `has_failed`

```ab
import { has_failed } from "std/env"
```

```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed



You can check the original tests for code examples:
* [has_failed.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/has_failed.ab)

## `exit`

```ab
import { exit } from "std/env"
```

```ab
pub fun exit(code: Num): Null 
```

Close the script


## `is_root`

```ab
import { is_root } from "std/env"
```

```ab
pub fun is_root(): Bool 
```

Check if the script is running with a user with root permission



You can check the original tests for code examples:
* [is_root.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/is_root.ab)

## `printf`

```ab
import { printf } from "std/env"
```

```ab
pub fun printf(format: Text, args: [Text] = [""]): Null 
```

`printf` the text following the arguments



You can check the original tests for code examples:
* [printf.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/printf.ab)
* [printf_escape.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/printf_escape.ab)

## `printf_escape`

```ab
import { printf_escape } from "std/env"
```

```ab
pub fun printf_escape(text: Text): Text 
```

Escape the text to be used with `printf`



You can check the original tests for code examples:
* [printf_escape.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/printf_escape.ab)

## `text_shell`

```ab
import { text_shell } from "std/env"
```

```ab
pub fun text_shell(message: Text, style: Num, fg: Num, bg: Num): Text 
```

Prepare a text with formatting options for `printf`



You can check the original tests for code examples:
* [text_shell.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/text_shell.ab)

## `text_bold`

```ab
import { text_bold } from "std/env"
```

```ab
pub fun text_bold(message: Text): Text 
```

Return a text as bold



You can check the original tests for code examples:
* [text_bold.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/text_bold.ab)

## `text_italic`

```ab
import { text_italic } from "std/env"
```

```ab
pub fun text_italic(message: Text): Text 
```

Return a text as italic



You can check the original tests for code examples:
* [text_italic.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/text_italic.ab)

## `text_underlined`

```ab
import { text_underlined } from "std/env"
```

```ab
pub fun text_underlined(message: Text): Text 
```

Return a text as underlined



You can check the original tests for code examples:
* [text_underlined.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/text_underlined.ab)

## `color_echo`

```ab
import { color_echo } from "std/env"
```

```ab
pub fun color_echo(message: Text, color: Num): Null 
```

Print a text with a specified color



You can check the original tests for code examples:
* [color_echo.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/color_echo.ab)

## `echo_info`

```ab
import { echo_info } from "std/env"
```

```ab
pub fun echo_info(message: Text): Null 
```

Print a text as Info



You can check the original tests for code examples:
* [echo_info.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/echo_info.ab)

## `echo_success`

```ab
import { echo_success } from "std/env"
```

```ab
pub fun echo_success(message: Text): Null 
```

Print a text as Success



You can check the original tests for code examples:
* [echo_success.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/echo_success.ab)

## `echo_warning`

```ab
import { echo_warning } from "std/env"
```

```ab
pub fun echo_warning(message: Text): Null 
```

Print a text as Warning



You can check the original tests for code examples:
* [echo_warning.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/echo_warning.ab)

## `error`

```ab
import { error } from "std/env"
```

```ab
pub fun error(message: Text, exit_code: Num = 1): Null 
```

Print a text as Error and exit if the status code is greater than 0



You can check the original tests for code examples:
* [error.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/error.ab)

