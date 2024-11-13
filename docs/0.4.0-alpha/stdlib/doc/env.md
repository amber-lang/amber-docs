## `color_echo`
```ab
pub fun color_echo(message: Text, color: Num): Null 
```

Prints a text with a specified color.


## `confirm`
```ab
pub fun confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Creates a confirm prompt (Yes/No), and returns true if the choice is Yes.

"No" is the default choice, set default_yes to true for "Yes" as default choice.


## `echo_info`
```ab
pub fun echo_info(message: Text): Null 
```

Prints a text as a info message.


## `echo_success`
```ab
pub fun echo_success(message: Text): Null 
```

Prints a text as a success message.


## `echo_warning`
```ab
pub fun echo_warning(message: Text): Null 
```

Prints a text as a warning message.


## `error`
```ab
pub fun error(message: Text, exit_code: Num = 1): Null 
```

Prints a text as a error and exits if the status code is greater than 0.


## `exit`
```ab
pub fun exit(code: Num): Null 
```

Closes the script.


## `get_env_var`
```ab
pub fun get_env_var(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.


## `has_failed`
```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed.


## `input`
```ab
pub fun input(prompt: Text): Text 
```

Creates a prompt and returns the value.


## `is_command`
```ab
pub fun is_command(command: Text): Bool 
```

Checks if a command exists.


## `is_root`
```ab
pub fun is_root(): Bool 
```

Checks if the script is running with a user with root permission.


## `load_env_file`
```ab
pub fun load_env_file(file: Text = ".env"): Null 
```

Loads the env file in the environment, using `xargs`.


## `printf`
```ab
pub fun printf(format: Text, args: [Text] = [""]): Null 
```

`printf` the text following the arguments.


## `printf_escape`
```ab
pub fun printf_escape(text: Text): Text 
```

Escapes the text to be used with `printf`.


## `shell_constant_get`
```ab
pub fun shell_constant_get(name: Text): Text ? 
```

Gets a constant inside the shell session.


## `shell_constant_set`
```ab
pub fun shell_constant_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.


## `shell_isset`
```ab
pub fun shell_isset(name: Text): Bool 
```

Checks if a variable inside the shell session exists.


## `shell_unset`
```ab
pub fun shell_unset(name: Text): Null ? 
```

Removes a variable inside the shell session.


## `shell_var_get`
```ab
pub fun shell_var_get(name: Text): Text ? 
```

Gets a constant inside the shell session.


## `shell_var_set`
```ab
pub fun shell_var_set(name: Text, val: Text): Null ? 
```

Sets a constant inside the shell session.


## `text_bold`
```ab
pub fun text_bold(message: Text): Text 
```

Returns a text as bold.


## `text_italic`
```ab
pub fun text_italic(message: Text): Text 
```

Returns a text as italic.


## `text_shell`
```ab
pub fun text_shell(message: Text, style: Num, fg: Num, bg: Num): Text 
```

Prepares a text with formatting options for `printf`.


## `text_underlined`
```ab
pub fun text_underlined(message: Text): Text 
```

Returns a text as underlined.


