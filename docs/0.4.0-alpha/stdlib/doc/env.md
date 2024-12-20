## `bold`

```ab
import { bold } from "std/env"
```

```ab
pub fun bold(message: Text): Text 
```

Returns a text as bold.


## `echo_colored`

```ab
import { echo_colored } from "std/env"
```

```ab
pub fun echo_colored(message: Text, color: Num): Null 
```

Prints a text with a specified color.


## `echo_error`

```ab
import { echo_error } from "std/env"
```

```ab
pub fun echo_error(message: Text, exit_code: Num = 1): Null 
```

Prints a text as a error and exits if the status code is greater than 0.


## `echo_info`

```ab
import { echo_info } from "std/env"
```

```ab
pub fun echo_info(message: Text): Null 
```

Prints a text as a info message.


## `echo_success`

```ab
import { echo_success } from "std/env"
```

```ab
pub fun echo_success(message: Text): Null 
```

Prints a text as a success message.


## `echo_warning`

```ab
import { echo_warning } from "std/env"
```

```ab
pub fun echo_warning(message: Text): Null 
```

Prints a text as a warning message.


## `env_const_get`

```ab
import { env_const_get } from "std/env"
```

```ab
pub fun env_const_get(name: Text): Text ? 
```

Gets a constant inside the shell session.



You can check the original tests for code examples:
* [env_const_get.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_const_get.ab)

## `env_const_set`

```ab
import { env_const_set } from "std/env"
```

```ab
pub fun env_const_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.



You can check the original tests for code examples:
* [env_const_set.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_const_set.ab)

## `env_file_load`

```ab
import { env_file_load } from "std/env"
```

```ab
pub fun env_file_load(file: Text = ".env"): Null 
```

Loads the env file in the environment, using `xargs`.



You can check the original tests for code examples:
* [env_file_load.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_file_load.ab)

## `env_var_get`

```ab
import { env_var_get } from "std/env"
```

```ab
pub fun env_var_get(name: Text): Text ? 
```

Gets a constant inside the shell session.



You can check the original tests for code examples:
* [env_var_get.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_var_get.ab)

## `env_var_load`

```ab
import { env_var_load } from "std/env"
```

```ab
pub fun env_var_load(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.



You can check the original tests for code examples:
* [env_var_load.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_var_load.ab)

## `env_var_set`

```ab
import { env_var_set } from "std/env"
```

```ab
pub fun env_var_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.



You can check the original tests for code examples:
* [env_var_set.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_var_set.ab)

## `env_var_test`

```ab
import { env_var_test } from "std/env"
```

```ab
pub fun env_var_test(name: Text): Bool 
```

Checks if a variable inside the shell session exists.



You can check the original tests for code examples:
* [env_var_test.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_var_test.ab)

## `env_var_unset`

```ab
import { env_var_unset } from "std/env"
```

```ab
pub fun env_var_unset(name: Text): Null ? 
```

Removes a variable inside the shell session.



You can check the original tests for code examples:
* [env_var_unset.ab](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib/env_var_unset.ab)

## `escaped`

```ab
import { escaped } from "std/env"
```

```ab
pub fun escaped(text: Text): Text 
```

Escapes the text to be used with `printf`.


## `has_failed`

```ab
import { has_failed } from "std/env"
```

```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed.


## `input_confirm`

```ab
import { input_confirm } from "std/env"
```

```ab
pub fun input_confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Creates a confirm prompt (Yes/No), and returns true if the choice is Yes.

"No" is the default choice, set default_yes to true for "Yes" as default choice.


## `input_hidden`

```ab
import { input_hidden } from "std/env"
```

```ab
pub fun input_hidden(prompt: Text): Text 
```

Creates a prompt, hides any user input and returns the value.


## `input_prompt`

```ab
import { input_prompt } from "std/env"
```

```ab
pub fun input_prompt(prompt: Text): Text 
```

Creates a prompt and returns the value.


## `is_command`

```ab
import { is_command } from "std/env"
```

```ab
pub fun is_command(command: Text): Bool 
```

Checks if a command exists.


## `is_root`

```ab
import { is_root } from "std/env"
```

```ab
pub fun is_root(): Bool 
```

Checks if the script is running with a user with root permission.


## `italic`

```ab
import { italic } from "std/env"
```

```ab
pub fun italic(message: Text): Text 
```

Returns a text as italic.


## `printf`

```ab
import { printf } from "std/env"
```

```ab
pub fun printf(format: Text, args: [Text] = [""]): Null 
```

`printf` the text following the arguments.


## `styled`

```ab
import { styled } from "std/env"
```

```ab
pub fun styled(message: Text, style: Num, fg: Num, bg: Num): Text 
```

Prepares a text with formatting options for `printf`.


## `underlined`

```ab
import { underlined } from "std/env"
```

```ab
pub fun underlined(message: Text): Text 
```

Returns a text as underlined.


