## `bold`

```ab
import { bold } from "std/env"
```

```ab
pub fun bold(message: Text): Text 
```

Returns a text as bold.

You can check the original tests for code examples:
* [env_bold.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_bold.ab)

## `echo_colored`

```ab
import { echo_colored } from "std/env"
```

```ab
pub fun echo_colored(message: Text, color: Num): Null 
```

Prints a text with a specified color.

You can check the original tests for code examples:
* [env_echo_colored.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_echo_colored.ab)

## `echo_error`

```ab
import { echo_error } from "std/env"
```

```ab
pub fun echo_error(message: Text, exit_code: Num = 1): Null 
```

Prints a text as a error and exits if the status code is greater than 0.

You can check the original tests for code examples:
* [env_echo_error.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_echo_error.ab)

## `echo_info`

```ab
import { echo_info } from "std/env"
```

```ab
pub fun echo_info(message: Text): Null 
```

Prints a text as a info message.

You can check the original tests for code examples:
* [env_echo_info.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_echo_info.ab)

## `echo_success`

```ab
import { echo_success } from "std/env"
```

```ab
pub fun echo_success(message: Text): Null 
```

Prints a text as a success message.

You can check the original tests for code examples:
* [env_echo_success.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_echo_success.ab)

## `echo_warning`

```ab
import { echo_warning } from "std/env"
```

```ab
pub fun echo_warning(message: Text): Null 
```

Prints a text as a warning message.

You can check the original tests for code examples:
* [env_echo_warning.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_echo_warning.ab)

## `env_const_get`

```ab
import { env_const_get } from "std/env"
```

```ab
pub fun env_const_get(name: Text): Text ? 
```

Gets a constant inside the shell session.

You can check the original tests for code examples:
* [env_const_get.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_const_get.ab)

## `env_const_set`

```ab
import { env_const_set } from "std/env"
```

```ab
pub fun env_const_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.

You can check the original tests for code examples:
* [env_const_set.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_const_set.ab)

## `env_file_load`

```ab
import { env_file_load } from "std/env"
```

```ab
pub fun env_file_load(file: Text = ".env"): Null 
```

Loads the env file in the environment, using `xargs`.

You can check the original tests for code examples:
* [env_file_load.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_file_load.ab)

## `env_var_get`

```ab
import { env_var_get } from "std/env"
```

```ab
pub fun env_var_get(name: Text): Text ? 
```

Gets a constant inside the shell session.

You can check the original tests for code examples:
* [env_var_get.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_var_get.ab)

## `env_var_load`

```ab
import { env_var_load } from "std/env"
```

```ab
pub fun env_var_load(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.

You can check the original tests for code examples:
* [env_var_load.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_var_load.ab)

## `env_var_set`

```ab
import { env_var_set } from "std/env"
```

```ab
pub fun env_var_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.

You can check the original tests for code examples:
* [env_var_set.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_var_set.ab)

## `env_var_test`

```ab
import { env_var_test } from "std/env"
```

```ab
pub fun env_var_test(name: Text): Bool 
```

Checks if a variable inside the shell session exists.

You can check the original tests for code examples:
* [env_var_test.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_var_test.ab)

## `env_var_unset`

```ab
import { env_var_unset } from "std/env"
```

```ab
pub fun env_var_unset(name: Text): Null ? 
```

Removes a variable inside the shell session.

You can check the original tests for code examples:
* [env_var_unset.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_var_unset.ab)

## `escaped`

```ab
import { escaped } from "std/env"
```

```ab
pub fun escaped(text: Text): Text 
```

Escapes the text to be used with `printf`.

You can check the original tests for code examples:
* [env_escaped.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_escaped.ab)

## `has_failed`

```ab
import { has_failed } from "std/env"
```

```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed.

You can check the original tests for code examples:
* [env_has_failed.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_has_failed.ab)

## `input_confirm`

```ab
import { input_confirm } from "std/env"
```

```ab
pub fun input_confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Creates a confirm prompt (Yes/No), and returns true if the choice is Yes.

"No" is the default choice, set default_yes to true for "Yes" as default choice.

You can check the original tests for code examples:
* [env_input_confirm.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_input_confirm.ab)

## `input_hidden`

```ab
import { input_hidden } from "std/env"
```

```ab
pub fun input_hidden(prompt: Text): Text 
```

Creates a prompt, hides any user input and returns the value.

You can check the original tests for code examples:
* [env_input_hidden.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_input_hidden.ab)

## `input_prompt`

```ab
import { input_prompt } from "std/env"
```

```ab
pub fun input_prompt(prompt: Text): Text 
```

Creates a prompt and returns the value.

You can check the original tests for code examples:
* [env_input_prompt.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_input_prompt.ab)

## `is_command`

```ab
import { is_command } from "std/env"
```

```ab
pub fun is_command(command: Text): Bool 
```

Checks if a command exists.

You can check the original tests for code examples:
* [env_is_command.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_is_command.ab)

## `is_root`

```ab
import { is_root } from "std/env"
```

```ab
pub fun is_root(): Bool 
```

Checks if the script is running with a user with root permission.

You can check the original tests for code examples:
* [env_is_root.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_is_root.ab)

## `italic`

```ab
import { italic } from "std/env"
```

```ab
pub fun italic(message: Text): Text 
```

Returns a text as italic.

You can check the original tests for code examples:
* [env_italic.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_italic.ab)

## `printf`

```ab
import { printf } from "std/env"
```

```ab
pub fun printf(format: Text, args: [Text] = [""]): Null 
```

`printf` the text following the arguments.

You can check the original tests for code examples:
* [env_printf.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_printf.ab)

## `styled`

```ab
import { styled } from "std/env"
```

```ab
pub fun styled(message: Text, style: Num, fg: Num, bg: Num): Text 
```

Prepares a text with formatting options for `printf`.

You can check the original tests for code examples:
* [env_styled.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_styled.ab)

## `underlined`

```ab
import { underlined } from "std/env"
```

```ab
pub fun underlined(message: Text): Text 
```

Returns a text as underlined.

You can check the original tests for code examples:
* [env_underlined.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/env_underlined.ab)

