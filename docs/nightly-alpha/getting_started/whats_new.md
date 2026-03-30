# Recursive Functions

Amber now supports recursive functions, allowing a function to call itself. Local variables inside recursive functions are automatically compiled as `local` in Bash to prevent namespace pollution between recursive calls.

```ab
fun factorial(n: Int): Int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

echo(factorial(5)) // Outputs: 120
```

# Testing suite

You can also name your tests for better readability and filter them by name or filename using CLI arguments. Read more in the [Testing Guide](testing).

# Public Variables

Variables can now be exported from a module using the `pub` keyword, making them importable in other files — just like functions. This enables sharing configuration values, constants, and other data across multiple Amber files without duplicating definitions.

```ab
// config.ab
pub const VERSION = "1.0"
pub const WORKING_DIR = "."
```

```ab
// main.ab
import { VERSION, WORKING_DIR } from "config.ab"

echo(VERSION)       // Outputs: 1.0
echo(WORKING_DIR)   // Outputs: .
```

## New builtins

Amber has gained many new builtins for common shell operations. These builtins generate valid, shellcheck-compatible Bash code and integrate with Amber's error handling system.

### `touch` — Create or update files

Creates empty files or updates the modification timestamp of existing files. Accepts one or more file paths.

```ab
touch("newfile.txt")
touch("/tmp/a.txt", "/tmp/b.txt")
```

### `rm` — Remove files or directories

Removes files or directories from the filesystem. This is a failable builtin — use `failed` blocks or `trust` to handle errors.

```ab
rm("oldfile.txt")
rm("-r", "/tmp/olddir")  // Recursive removal
```

### `sleep` — Pause execution

Pauses script execution for the specified number of seconds. Supports decimal values for sub-second delays.

```ab
sleep(5)   // Wait 5 seconds
sleep(0.5) // Wait half a second
```

### `ls` — List directory contents

Returns an array of filenames in the specified directory. Accepts optional `all` and `recursive` boolean parameters. This is a failable expression — it returns `[Text]`.

```ab
let files = trust ls("/tmp")

let all_files = trust ls("/tmp", true, false)         // Include hidden files
let recursive = trust ls("/tmp", false, true)         // List recursively
let everything = trust ls("/tmp", true, true)         // Both
```

### `pwd` — Print working directory

Returns the current working directory as a `Text` value.

```ab
let dir = pwd()
echo("Current directory: {dir}")
```

### `clear` — Clear the terminal

Clears the terminal screen. Takes no parameters.

```ab
clear()
```

### `cp` — Copy files or directories

Copies files or directories from one location to another. This is a failable builtin.

```ab
cp("source.txt", "backup.txt")
cp("-r", "src_dir", "dest_dir")  // Recursive copy
```

### `pid` — Get process ID

Returns the PID (Process ID) of the last background process executed. Useful for process management.

```ab
let last_pid = pid()
echo("Last process: {last_pid}")
```

### `disown` — Remove background jobs

Removes a job from the shell's active job table, allowing the script to continue without waiting for it. Can optionally accept a specific PID.

```ab
disown()      // Disown the most recent background job
disown(1234)  // Disown a specific PID
```

# Shell targets: Bash 3.2, Zsh, and Ksh

Amber now supports generating scripts for multiple shell targets. This is controlled via the `--target` flag during compilation:

```sh
$ amber build script.ab output.sh              # Default: Bash 4.3
$ amber build --target bash script.ab output.sh
$ amber build --target zsh script.ab output.zsh
$ amber build --target ksh script.ab output.ksh
```

**Bash 4.3 as the default target** — By default, Amber now generates scripts compatible with Bash 4.3. This is a significant change for future features like objects and custom structures and other useful features coming with bash 4+. We still keep support for bash 3.2 in a form of shell target `bash-3.2` to keep support for legacy OS X systems which only came with bash 3.2. Note that the bash 3.2 target will avoid future features like objects due to lack of functionality in older bash versions.

**Zsh support** — Scripts can be compiled to run under Zsh, which is the default shell on macOS. This enables better integration with Zsh-specific environments.

**Ksh support** — Ksh (KornShell) support is also available, extending Amber's reach to systems where Ksh is the primary shell, such as some enterprise Unix environments.

# Performance improvements

The Amber standard library has been optimized for better performance in the generated Bash code. Many functions now use more efficient shell constructs and avoid unnecessary subprocess spawning. Combined with the math improvements below, Amber scripts now run significantly faster, especially in loops and data processing tasks.

# Math improvements

Mathematical operations in Amber-generated Bash code no longer depend on `bc` or `sed`. Range computations and arithmetic are now handled using native Bash arithmetic, improving performance and reducing external dependencies. This means Amber scripts run faster and require fewer tools installed on the target system.

# Standard library improvements

## New `std/test` module

We introduced a new [`std/test`](stdlib/doc/test) library that provides `assert` and `assert_eq` functions to help you write tests.

```ab
import { assert, assert_eq } from "std/test"

test "can multiply numbers" {
    let result = 10 * 2
    assert(result == 20)
    assert_eq(result, 20)
}
```

## New `fetch` function for HTTP requests

The `fetch` function provides a functionality for making HTTP requests. It intelligently utilizes available command-line tools for network operations, with a failover to bash's network sockets. This function supports a comprehensive set of HTTP methods, including `GET`, `POST`, `PUT`, and `DELETE`.

```ab
import { fetch } from "std/http"

let response = trust fetch("https://example.com")
let post_request = trust fetch("https://example.com", "POST", "hello world!", [ "content-type: text/plain" ]) // POST request
```

## Array sorting

New `sort` and `sorted` functions are available in [`std/array`](stdlib/doc/array). `sort` sorts an array in-place, while `sorted` returns a new sorted array leaving the original unchanged.

```ab
import { sort, sorted } from "std/array"

let array = ["15", "-3", "foo", "bar"]
sort(array)
echo(array) // Outputs: ["-3", "15", "bar", "foo"]

let sorted_arr = sorted([3, 1, 4, 1, 5])
echo(sorted_arr) // Outputs: [1, 1, 3, 4, 5]
```

## File compression

The new [`file_compress`](stdlib/doc/fs) function compresses files or directories into various archive formats including `tar.gz`, `zip`, `bz2`, `xz`, and `7z`.

```ab
import { file_compress } from "std/fs"

file_compress(["main.ab", "src"], "archive.tar.gz")?
```

## Shell options control

New [`shopt_enable`](stdlib/doc/env) and [`shopt_disable`](stdlib/doc/env) functions allow you to control shell options at runtime. These are useful for enabling features like `globstar` (for `**` expansion patterns) or `dotglob` (for matching hidden files in globs).

```ab
import { shopt_enable, shopt_disable } from "std/env"

shopt_enable("globstar")?   // Enable ** recursive globbing
shopt_disable("dotglob")?   // Hide dotfiles from globs
```

## Text center padding

The new [`cpad`](stdlib/doc/text) function pads text to the center with a specified character, useful for formatting console output and aligning text.

```ab
import { cpad } from "std/text"

echo(cpad("42", "0", 5))   // Outputs: "04200"
echo(cpad("Title", " ", 20)) // Outputs: "       Title        "
```

# Packaging

Amber is now available as **Debian** (`.deb`) and **RPM** packages, making installation easier on most Linux distributions. This is the first step toward providing official package repositories, so you can install and update Amber through your system's package manager.

# Internal improvements

These changes improve Amber's development workflow, code quality, and internal tooling:

## Testing and code coverage

The Amber codebase now has more tests and code coverage reporting via [Codecov](https://app.codecov.io/gh/amber-lang/amber). This helps ensure stability and catch regressions early in the development process.

## CI improvements

The continuous integration pipeline has been improved with:
- **Nightly builds** — automated builds published every night for early testing
- **Shellcheck validation** — all generated Bash code is validated against shellcheck
- **Fixed action versions** — GitHub Actions use pinned versions for reproducibility
- **rustfmt** — Rust code is automatically formatted

## Removed shfmt

The `shfmt` tool has been removed as a processing tool in the Amber build pipeline, simplifying the build process and reducing external dependencies.

## Improved shellcheck error messages

Shellcheck error messages are now clearer and more helpful when the compiler encounters issues with generated Bash code.

## Amber scripts in the codebase

More Amber scripts are now used internally in the project (see [scripts/](https://github.com/amber-lang/amber/tree/staging/scripts)), demonstrating Amber's capabilities and dogfooding the language in its own development.

# License change

Amber has switched its license from **GPLv3** to **LGPL** (GNU Lesser General Public License). Here's what this means in practice:

- **GPLv3** required that any project distributing Amber-compiled code would also need to be licensed under GPLv3 — a "viral" copyleft license that applies to derivative works.
- **LGPL** is more permissive: you can freely use Amber and its compiled scripts in proprietary or closed-source projects. The LGPL only applies to modifications of Amber itself, not to the scripts you write and compile with it.

This change makes Amber suitable for a wider range of use cases, including commercial and enterprise environments where GPL licensing may be a concern.
