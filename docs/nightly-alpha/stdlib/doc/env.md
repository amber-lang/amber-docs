## `bash_version`

```ab
pub fun bash_version(): [Int] 
```

Returns current bash version with major, minor and patch components.

### Usage
```ab
import { bash_version } from "std/env"

const version = bash_version()
echo("Bash {version[0]}.{version[1]}.{version[2]}")
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

const debug = env_var_get("DEBUG")
```

## `env_var_load`

```ab
pub fun env_var_load(var: Text, file: Text = ".env"): Text 
```

Retrieves the value of an environment variable, optionally sourcing it from a file if not already set.

### Usage
```ab
import { env_var_load } from "std/env"

const value = env_var_load("MY_VAR", ".env.local")
```

## `env_var_set`

```ab
pub fun env_var_set(name: Text, val: Text | Int | Bool): Null? 
```

Sets a variable inside the shell session. Note that `true` is saved as int (`1`).

### Usage
```ab
import { env_var_set } from "std/env"

env_var_set("STATUS", "succeeded")
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
    echo("PATH exists")
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
    echo("File doesn't exist")
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
    echo("Continuing...")
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

const password = input_hidden("Enter password: ")
```

## `input_prompt`

```ab
pub fun input_prompt(prompt: Text): Text 
```

Creates a prompt and returns the value.

### Usage
```ab
import { input_prompt } from "std/env"

const name = input_prompt("Enter your name: ")
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
    echo("Git is installed")
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
    echo("Running as root")
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

## `kill`

```ab
pub fun kill(process_id: Int, signal: Text = "TERM"): Null? 
```

Sends a signal to a process by PID.

### Usage
```ab
import { kill } from "std/env"

kill(1234)?                  // Send SIGTERM (default)
kill(1234, "SIGKILL")?       // Send SIGKILL
kill(1234, "9")?             // Send signal 9 (SIGKILL)
```

## `mount`

```ab
pub fun mount(source: Text, target: Text, options: Text = ""): Null? 
```

Mounts a filesystem. Requires root privileges.

### Usage
```ab
import { mount } from "std/env"

mount("/dev/sda1", "/mnt/disk")?
mount("/root", "/test", "bind,ro")? // mount /root to /test directory with read-only permission
```

## `pgrep`

```ab
pub fun pgrep(pattern: Text): [Int] 
```

Finds process IDs by name pattern.

### Usage
```ab
import { pgrep } from "std/env"

const pids = pgrep("nginx")
for pid in pids {
    echo(pid)
}
```

## `pgrep_exact`

```ab
pub fun pgrep_exact(name: Text): [Int] 
```

Finds process IDs by exact name.

### Usage
```ab
import { pgrep_exact } from "std/env"

const pids = pgrep_exact("nginx")
```

## `pkill`

```ab
pub fun pkill(pattern: Text): Null? 
```

Kills processes by name pattern.

### Usage
```ab
import { pkill } from "std/env"

pkill("nginx")?
```

## `pkill_exact`

```ab
pub fun pkill_exact(name: Text): Null? 
```

Kills processes by exact name.

### Usage
```ab
import { pkill_exact } from "std/env"

pkill_exact("nginx")?
```

## `pkill_force`

```ab
pub fun pkill_force(pattern: Text): Null? 
```

Forcefully kills processes by name pattern (SIGKILL).

### Usage
```ab
import { pkill_force } from "std/env"

pkill_force("nginx")?
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

## `shopt_disable`

```ab
pub fun shopt_disable(optname: Text, set_opt: Bool = false): Null? 
```

Disables shopt or set option.

### Usage
```ab
import { shopt_disable } from "std/env"

shopt_disable("dotglob")? // Hides files starting with "." during filename expansion
shopt_disable("noglob", true)? // Enables filename expansion (globbing)
```
For all available options, see https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html

## `shopt_enable`

```ab
pub fun shopt_enable(optname: Text, set_opt: Bool = false): Null? 
```

Enables shopt or set option.

### Usage
```ab
import { shopt_enable } from "std/env"

shopt_enable("globstar")? // Enables star (*) expansion for filenames
shopt_enable("noglob", true)? // Disables filename expansion (globbing). Note that this option doesn't properly work in a limited environment, e.g. GitHub Actions
```
For all available options, see https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html

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

## `umount`

```ab
pub fun umount(target: Text): Null? 
```

Unmounts a filesystem. Requires root privileges.

### Usage
```ab
import { umount } from "std/env"

umount("/mnt/disk")?
```

## `umount_force`

```ab
pub fun umount_force(target: Text): Null? 
```

Force unmounts a filesystem. Requires root privileges.

### Usage
```ab
import { umount_force } from "std/env"

umount_force("/mnt/disk")?
```

## `uname_all`

```ab
pub fun uname_all(): Text 
```

Returns all system information from uname.

### Usage
```ab
import { uname_all } from "std/env"

const info = uname_all()
echo(info) // e.g., "Linux my-host 5.15.0 #1 SMP x86_64 GNU/Linux"
```

## `uname_kernel_name`

```ab
pub fun uname_kernel_name(): Text 
```

Returns the kernel name (e.g., "Linux", "Darwin").

### Usage
```ab
import { uname_kernel_name } from "std/env"

const kernel = uname_kernel_name()
echo(kernel) // "Linux" or "Darwin"
```

## `uname_kernel_release`

```ab
pub fun uname_kernel_release(): Text 
```

Returns the kernel release version.

### Usage
```ab
import { uname_kernel_release } from "std/env"

const release = uname_kernel_release()
echo(release) // e.g., "5.15.0-generic"
```

## `uname_kernel_version`

```ab
pub fun uname_kernel_version(): Text 
```

Returns the kernel version.

### Usage
```ab
import { uname_kernel_version } from "std/env"

const version = uname_kernel_version()
echo(version)
```

## `uname_machine`

```ab
pub fun uname_machine(): Text 
```

Returns the machine hardware name (architecture).

### Usage
```ab
import { uname_machine } from "std/env"

const arch = uname_machine()
echo(arch) // e.g., "x86_64" or "arm64"
```

## `uname_nodename`

```ab
pub fun uname_nodename(): Text 
```

Returns the network node hostname.

### Usage
```ab
import { uname_nodename } from "std/env"

const host = uname_nodename()
echo(host) // e.g., "my-computer"
```

## `uname_os`

```ab
pub fun uname_os(): Text 
```

Returns the operating system name.

### Usage
```ab
import { uname_os } from "std/env"

const os = uname_os()
echo(os) // e.g., "GNU/Linux" or "Darwin"
```

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

