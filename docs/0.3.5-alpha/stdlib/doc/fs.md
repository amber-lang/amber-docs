## `dir_exist`

```ab
import { dir_exist } from "std/fs"
```

```ab
pub fun dir_exist(path) 
```

Check if directory exists



You can check the original tests for code examples:
* [dir_exist.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/dir_exist.ab)

## `file_exist`

```ab
import { file_exist } from "std/fs"
```

```ab
pub fun file_exist(path) 
```

Check if file exists



You can check the original tests for code examples:
* [file_exist.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/file_exist.ab)

## `file_read`

```ab
import { file_read } from "std/fs"
```

```ab
pub fun file_read(path) 
```

Get the file content



You can check the original tests for code examples:
* [file_read.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/file_read.ab)

## `file_write`

```ab
import { file_write } from "std/fs"
```

```ab
pub fun file_write(path, content) 
```

Write the content to the file
Doesn't check if the file exist



You can check the original tests for code examples:
* [file_write.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/file_write.ab)

## `file_append`

```ab
import { file_append } from "std/fs"
```

```ab
pub fun file_append(path, content) 
```

Append the content to the file
Doesn't check if the file exist



You can check the original tests for code examples:
* [file_append.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/file_append.ab)

## `create_symbolic_link`

```ab
import { create_symbolic_link } from "std/fs"
```

```ab
pub fun create_symbolic_link(origin: Text, destination: Text): Bool 
```

Create a symbolic link
If the file doens't exist return a boolean and print a message



You can check the original tests for code examples:
* [create_symbolic_link.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/create_symbolic_link.ab)

## `create_dir`

```ab
import { create_dir } from "std/fs"
```

```ab
pub fun create_dir(path: Text): Null 
```

Create a directory with all intermediate directories as required



You can check the original tests for code examples:
* [create_dir.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/create_dir.ab)

## `make_executable`

```ab
import { make_executable } from "std/fs"
```

```ab
pub fun make_executable(path: Text): Bool 
```

Set the file as executable
If the file doesn't exist return a boolean and print a message



You can check the original tests for code examples:
* [make_executable.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/make_executable.ab)

## `change_owner`

```ab
import { change_owner } from "std/fs"
```

```ab
pub fun change_owner(user: Text, path: Text): Bool 
```

Change the owner of the file
If the file doesn't exist return false



You can check the original tests for code examples:
* [change_owner.ab](https://github.com/amber-lang/amber/blob/0.3.5-alpha/src/tests/stdlib/change_owner.ab)

