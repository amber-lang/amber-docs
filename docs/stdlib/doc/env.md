## `get_env_var`
```ab
pub fun get_env_var(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.


## `load_env_file`
```ab
pub fun load_env_file(file: Text = ".env"): Null 
```

Load the env file in the environment, using `xargs`


## `shell_isset`
```ab
pub fun shell_isset(name: Text): Bool 
```

Check if a variable inside the Shell session exist


## `shell_constant_set`
```ab
pub fun shell_constant_set(name: Text, val: Text): Null ? 
```

Set a constant inside the Shell session


## `shell_constant_get`
```ab
pub fun shell_constant_get(name: Text): Text ? 
```

Get a constant inside the Shell session


## `shell_var_set`
```ab
pub fun shell_var_set(name: Text, val: Text): Null ? 
```

Set a constant inside the Shell session


## `shell_var_get`
```ab
pub fun shell_var_get(name: Text): Text ? 
```

Get a constant inside the Shell session


## `shell_unset`
```ab
pub fun shell_unset(name: Text): Null ? 
```

Remove a variable inside the Shell session


## `is_command`
```ab
pub fun is_command(command: Text): Bool 
```

Check if the command exist


## `input`
```ab
pub fun input(prompt: Text): Text 
```

Create a prompt and return the value


## `confirm`
```ab
pub fun confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Confirm prompt (Yes/No), return true if choice is Yes
"No" is the default choice, set default_yes to true for "Yes" as default choice


## `has_failed`
```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed


## `exit`
```ab
pub fun exit(code: Num): Null 
```

Close the script


## `is_root`
```ab
pub fun is_root(): Bool 
```

Check if the script is running with a user with root permission


## `printf`
```ab
pub fun printf(format: Text, args: [Text] = [""]): Null 
```

`printf` the text following the arguments


## `printf_escape`
```ab
pub fun printf_escape(text: Text): Text 
```

Escape the text to be used with `printf`


## `text_shell`
```ab
pub fun text_shell(message: Text, style: Num, fg: Num, bg: Num): Text 
```

Prepare a text with formatting options for `printf`


## `text_bold`
```ab
pub fun text_bold(message: Text): Text 
```

Return a text as bold


## `text_italic`
```ab
pub fun text_italic(message: Text): Text 
```

Return a text as italic


## `text_underlined`
```ab
pub fun text_underlined(message: Text): Text 
```

Return a text as underlined


## `color_echo`
```ab
pub fun color_echo(message: Text, color: Num): Null 
```

Print a text with a specified color


## `echo_info`
```ab
pub fun echo_info(message: Text): Null 
```

Print a text as Info


## `echo_success`
```ab
pub fun echo_success(message: Text): Null 
```

Print a text as Success


## `echo_warning`
```ab
pub fun echo_warning(message: Text): Null 
```

Print a text as Warning


## `error`
```ab
pub fun error(message: Text, exit_code: Num = 1): Null 
```

Print a text as Error and exit if the status code is greater than 0


