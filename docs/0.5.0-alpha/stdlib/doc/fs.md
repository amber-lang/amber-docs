## `dir_create`

```ab
pub fun dir_create(path: Text): Null? 
```

Creates a directory with all parent directories as required.

### Usage
```ab
import { dir_create } from "std/fs"

dir_create("/tmp/my/nested/directory")
```

## `dir_exists`

```ab
pub fun dir_exists(path: Text): Bool 
```

Checks if a directory exists.

### Usage
```ab
import { dir_exists } from "std/fs"

if dir_exists("/tmp/mydir") {
echo "Directory exists"
}
```

## `escape_non_glob_chars`

```ab
fun escape_non_glob_chars(path: Text): Text 
```

Escapes all characters in the passed-in glob except "*", "?" and "/",
to prevent injection attacks.
```ab
import { escape_non_glob_chars } from "std/fs"
```
## `file_append`

```ab
pub fun file_append(path: Text, content: Text): Text? 
```

Appends content to a file.

Doesn't check if the file exists.

### Usage
```ab
import { file_append } from "std/fs"

file_append("log.txt", "New log entry")
```

## `file_chmod`

```ab
pub fun file_chmod(path: Text, mode: Text): Null? 
```

Changes the permission bits of a file.

If the file doesn't exist, it fails and prints a message.

### Usage
```ab
import { file_chmod } from "std/fs"

file_chmod("script.sh", "755")
```

## `file_chown`

```ab
pub fun file_chown(path: Text, user: Text): Null? 
```

Changes the owner of a file.

If the file doesn't exist, it fails and prints a message.

### Usage
```ab
import { file_chown } from "std/fs"

file_chown("/var/www/html", "www-data")
```

## `file_exists`

```ab
pub fun file_exists(path: Text): Bool 
```

Checks if a file exists.

### Usage
```ab
import { file_exists } from "std/fs"

if file_exists("config.txt") {
echo "File exists"
}
```

## `file_extract`

```ab
pub fun file_extract(path: Text, target: Text): Null? 
```

Extract the file detecting from the filename the extension
Supports: bz2, gz, xz, bz2, deb, rar, rpm, tar(gz/xz/bz), zip(war/jar), 7z
Note: Not all the commands supports the output folder path

### Usage
```ab
import { file_extract } from "std/fs"

file_extract("archive.tar.gz", "/tmp/extracted")
```

## `file_glob`

```ab
pub fun file_glob(path: Text): [Text]? 
```

Finds all files or directories matching a file glob.

### Usage
```ab
import { file_glob } from "std/fs"

let files = file_glob("*.txt")
```

## `file_glob_all`

```ab
pub fun file_glob_all(paths: [Text]): [Text]? 
```

Finds all files or directories matching multiple file globs. When
we have union types, this functionality can be merged into the main
`file_glob` function.

### Usage
```ab
import { file_glob_all } from "std/fs"

let files = file_glob_all(["*.txt", "*.md"])
```

## `file_read`

```ab
pub fun file_read(path: Text): Text? 
```

Gets file contents from a path.

### Usage
```ab
import { file_read } from "std/fs"

let content = file_read("data.txt")
```

## `file_write`

```ab
pub fun file_write(path: Text, content: Text): Text? 
```

Writes content to a file.
Doesn't check if the file exist

### Usage
```ab
import { file_write } from "std/fs"

file_write("output.txt", "Hello, World!")
```

## `is_mac_os_mktemp`

```ab
fun is_mac_os_mktemp(): Bool 
```

Determine whether mktemp is macOS's.
```ab
import { is_mac_os_mktemp } from "std/fs"
```
## `symlink_create`

```ab
pub fun symlink_create(origin: Text, destination: Text): Null? 
```

Creates a symbolic link.

If the file doesn't exist, it fails and prints a message.

### Usage
```ab
import { symlink_create } from "std/fs"

symlink_create("/usr/bin/python3", "/usr/local/bin/python")
```

## `temp_dir_create`

```ab
pub fun temp_dir_create(template: Text = "tmp.XXXXXXXXXX", auto_delete: Bool = false, force_delete: Bool = false): Text? 
```

Create a temporary directory and return the path.
Please note this does not respect _CS_DARWIN_USER_TEMP_DIR environment variable.

### Usage
```ab
import { temp_dir_create } from "std/fs"

let temp = temp_dir_create("myapp.XXXXXX", true, false)
```

