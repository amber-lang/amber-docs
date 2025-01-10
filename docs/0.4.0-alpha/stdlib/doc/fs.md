## `dir_create`

```ab
import { dir_create } from "std/fs"
```

```ab
pub fun dir_create(path: Text): Null 
```

Creates a directory with all parent directories as required.

You can check the original tests for code examples:
* [fs_dir_create.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_dir_create.ab)

## `dir_exists`

```ab
import { dir_exists } from "std/fs"
```

```ab
pub fun dir_exists(path) 
```

Checks if a directory exists.

You can check the original tests for code examples:
* [fs_dir_exists.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_dir_exists.ab)

## `escape_non_glob_chars`

```ab
import { escape_non_glob_chars } from "std/fs"
```

```ab
fun escape_non_glob_chars(path: Text): Text 
```

Escapes all characters in the passed-in glob except "*", "?" and "/",
to prevent injection attacks.

## `file_append`

```ab
import { file_append } from "std/fs"
```

```ab
pub fun file_append(path, content) 
```

Appends content to a file.

Doesn't check if the file exists.

You can check the original tests for code examples:
* [fs_file_append.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_append.ab)

## `file_chmod`

```ab
import { file_chmod } from "std/fs"
```

```ab
pub fun file_chmod(path: Text, mode: Text): Bool 
```

Changes the permission bits of a file.

If the file doesn't exist, it returns `false` and prints a message.

You can check the original tests for code examples:
* [fs_file_chmod.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_chmod.ab)

## `file_chown`

```ab
import { file_chown } from "std/fs"
```

```ab
pub fun file_chown(path: Text, user: Text): Bool 
```

Changes the owner of a file.

If the file doesn't exist, it returns `false` and prints a message.

You can check the original tests for code examples:
* [fs_file_chown.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_chown.ab)

## `file_exists`

```ab
import { file_exists } from "std/fs"
```

```ab
pub fun file_exists(path) 
```

Checks if a file exists.

You can check the original tests for code examples:
* [fs_file_exists.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_exists.ab)

## `file_extract`

```ab
import { file_extract } from "std/fs"
```

```ab
pub fun file_extract(path: Text, target: Text): Null ? 
```

Extract the file detecting from the filename the extension
Supports: bz2, gz, xz, bz2, deb, rar, rpm, tar(gz/xz/bz), zip(war/jar), 7z
Note: Not all the commands supports the output folder path

You can check the original tests for code examples:
* [fs_file_extract.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_extract.ab)

## `file_glob`

```ab
import { file_glob } from "std/fs"
```

```ab
pub fun file_glob(path: Text): [Text] ? 
```

Finds all files or directories matching a file glob.

You can check the original tests for code examples:
* [fs_file_glob_absolute_missing_file.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_absolute_missing_file.ab)
* [fs_file_glob_absolute_multiple_globs.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_absolute_multiple_globs.ab)
* [fs_file_glob_absolute_wild_char.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_absolute_wild_char.ab)
* [fs_file_glob_absolute_wild_star.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_absolute_wild_star.ab)
* [fs_file_glob_absolute_with_spaces.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_absolute_with_spaces.ab)
* [fs_file_glob_injection_attack.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_injection_attack.ab)
* [fs_file_glob_relative_missing_file.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_relative_missing_file.ab)
* [fs_file_glob_relative_multiple_globs.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_relative_multiple_globs.ab)
* [fs_file_glob_relative_wild_char.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_relative_wild_char.ab)
* [fs_file_glob_relative_wild_star.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_relative_wild_star.ab)
* [fs_file_glob_relative_with_spaces.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_glob_relative_with_spaces.ab)

## `file_glob_all`

```ab
import { file_glob_all } from "std/fs"
```

```ab
pub fun file_glob_all(paths: [Text]): [Text] ? 
```

Finds all files or directories matching multiple file globs. When
we have union types, this functionality can be merged into the main
`glob` function.

## `file_read`

```ab
import { file_read } from "std/fs"
```

```ab
pub fun file_read(path) 
```

Gets file contents from a path.

You can check the original tests for code examples:
* [fs_file_read.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_read.ab)

## `file_write`

```ab
import { file_write } from "std/fs"
```

```ab
pub fun file_write(path, content) 
```

Writes content to a file.
Doesn't check if the file exist

You can check the original tests for code examples:
* [fs_file_write.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_file_write.ab)

## `symlink_create`

```ab
import { symlink_create } from "std/fs"
```

```ab
pub fun symlink_create(origin: Text, destination: Text): Bool 
```

Creates a symbolic link.

If the file doesn't exist, it returns a boolean and prints a message.

You can check the original tests for code examples:
* [fs_symlink_create.ab](https://github.com/amber-lang/amber/blob/0.4.0-alpha/src/tests/stdlib/fs_symlink_create.ab)

