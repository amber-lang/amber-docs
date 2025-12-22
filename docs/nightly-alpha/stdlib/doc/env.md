## `bash_version`

```ab
pub fun bash_version(): [Int] 
```

Returns current bash version with major, minor and patch components.

### Usage
```ab
import { bash_version } from "std/env"

let version = bash_version()
echo "Bash {version[0]}.{version[1]}.{version[2]}"
```

## `bold`

```ab
pub fun bold(message: Text): Text 
```

Returns a text as bold.

### Usage
```ab
import { bold } from "std/env"

printf("%s\n", [bold("Important message")])
```

## `echo_colored`

```ab
pub fun echo_colored(message: Text, color: Text | Int): Null 
```

Prints a text with a specified color.

### Usage
```ab
import { echo_colored } from "std/env"

echo_colored("Red text", "red")
echo_colored("Blue text", 34)
```

### Supported color names
| Color name | Code |
| - | - |
| black | 30 |
| red | 31 |
| green | 32 |
| yellow | 93 |
| orange | 33 |
| blue | 34 |
| purple | 35 |
| cyan | 36 |
| gray | 37 |
| white | 97 |

For all supported color codes, please visit https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit

## `echo_error`

```ab
pub fun echo_error(message: Text, exit_code: Int = 1): Null 
```

Prints a text as a error and exits if the status code is greater than 0.

### Usage
```ab
import { echo_error } from "std/env"

echo_error("Fatal error occurred", 1)
```

## `echo_info`

```ab
pub fun echo_info(message: Text): Null 
```

Prints a text as a info message.

### Usage
```ab
import { echo_info } from "std/env"

echo_info("Information message")
```

## `echo_success`

```ab
pub fun echo_success(message: Text): Null 
```

Prints a text as a success message.

### Usage
```ab
import { echo_success } from "std/env"

echo_success("Operation completed successfully")
```

## `echo_warning`

```ab
pub fun echo_warning(message: Text): Null 
```

Prints a text as a warning message.

### Usage
```ab
import { echo_warning } from "std/env"

echo_warning("Warning: Disk space low")
```

## `env_const_set`

```ab
pub fun env_const_set(name: Text, val: Text | Int | Bool): Null? 
```

Sets a constant inside the shell session. Note that `true` is saved as int (`1`).

### Usage
```ab
import { env_const_set } from "std/env"

env_const_set("API_KEY", "secret123")
```

## `env_file_load`

```ab
pub fun env_file_load(file: Text = ".env"): Null 
```

Loads the env file in the environment, using `xargs`.

### Usage
```ab
import { env_file_load } from "std/env"

env_file_load(".env")
```

## `env_var_get`

```ab
pub fun env_var_get(name: Text): Text? 
```

Gets a variable or constant inside the shell session.

### Usage
```ab
import { env_var_get } from "std/env"

let debug = env_var_get("DEBUG")
```

## `env_var_load`

```ab
pub fun env_var_load(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.

### Usage
```ab
import { env_var_load } from "std/env"

let value = env_var_load("MY_VAR", ".env.local")
```

## `env_var_set`

```ab
pub fun env_var_set(name: Text, val: Text | Int | Bool): Null? 
```

Sets a variable inside the shell session. Note that `true` is saved as int (`1`).

### Usage
```ab
import { env_var_set } from "std/env"

env_var_set("STATUS","succeeded")
env_var_set("COUNT", 100)
env_var_set("DEBUG", true) // saved as int (`1`)
```

## `env_var_test`

```ab
pub fun env_var_test(name: Text): Bool 
```

Checks if a variable inside the shell session exists.

### Usage
```ab
import { env_var_test } from "std/env"

if env_var_test("PATH") {
    echo "PATH exists"
}
```

## `env_var_unset`

```ab
pub fun env_var_unset(name: Text): Null? 
```

Removes a variable inside the shell session.

### Usage
```ab
import { env_var_unset } from "std/env"

env_var_unset("TEMP_VAR")
```

## `escaped`

```ab
pub fun escaped(text: Text): Text 
```

Escapes the text to be used with `printf`.

### Usage
```ab
import { escaped } from "std/env"

printf("%s\n", [escaped("100% done\\n")])
```

## `has_failed`

```ab
pub fun has_failed(command: Text): Bool 
```

Checks if the command has failed.

### Usage
```ab
import { has_failed } from "std/env"

if has_failed("test -f config.txt") {
    echo "File doesn't exist"
}
```

## `input_confirm`

```ab
pub fun input_confirm(prompt: Text, default_yes: Bool = false): Bool 
```

Creates a confirm prompt (Yes/No), and returns true if the choice is Yes.

"No" is the default choice, set default_yes to true for "Yes" as default choice.

### Usage
```ab
import { input_confirm } from "std/env"

if input_confirm("Continue?", false) {
    echo "Continuing..."
}
```

## `input_hidden`

```ab
pub fun input_hidden(prompt: Text): Text 
```

Creates a prompt, hides any user input and returns the value.

### Usage
```ab
import { input_hidden } from "std/env"

let password = input_hidden("Enter password: ")
```

## `input_prompt`

```ab
pub fun input_prompt(prompt: Text): Text 
```

Creates a prompt and returns the value.

### Usage
```ab
import { input_prompt } from "std/env"

let name = input_prompt("Enter your name: ")
```

## `is_command`

```ab
pub fun is_command(command: Text): Bool 
```

Checks if a command exists.

### Usage
```ab
import { is_command } from "std/env"

if is_command("git") {
    echo "Git is installed"
}
```

## `is_root`

```ab
pub fun is_root(): Bool 
```

Checks if the script is running with a user with root permission.

### Usage
```ab
import { is_root } from "std/env"

if is_root() {
    echo "Running as root"
}
```

## `italic`

```ab
pub fun italic(message: Text): Text 
```

Returns a text as italic.

### Usage
```ab
import { italic } from "std/env"

printf("%s\n", [italic("Emphasized text")])
```

## `printf`

```ab
pub fun printf(format: Text, args: [Text] = []): Null 
```

`printf` the text following the arguments.

### Usage
```ab
import { printf } from "std/env"

printf("Hello %s!", ["World"])
```

## `styled`

```ab
pub fun styled(message: Text, style: Int, fg: Int | Text, bg: Int | Text): Text 
```

Prepares a text with formatting options for `printf`.

### Usage
```ab
import { styled } from "std/env"

printf("%s\n", [styled("Error!", 1, 31, 40)])
printf("%s\n", [styled("Warning!", 1, "white", "yellow")])
```

### Supported color names
| Color name | Foreground code | Background code |
| - | - |
| black | 30 | 40 |
| red | 31 | 41 |
| green | 32 | 42 |
| yellow | 33 | 43 |
| orange | 93 | 103 |
| blue | 34 | 44 |
| purple | 35 | 45 |
| cyan | 36 | 46 |
| gray | 37 | 47 |
| white | 97 | 107 |

For all supported color codes, please visit https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit

## `underlined`

```ab
pub fun underlined(message: Text): Text 
```

Returns a text as underlined.

### Usage
```ab
import { underlined } from "std/env"

printf("%s\n", [underlined("Underlined text")])
```

