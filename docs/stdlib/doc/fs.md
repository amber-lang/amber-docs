## `dir_exist`
```ab
pub fun dir_exist(path) 
```

Checks if a directory exists.


## `file_exist`
```ab
pub fun file_exist(path) 
```

Checks if a file exists.


## `file_read`
```ab
pub fun file_read(path) 
```

Gets file contents from a path.


## `file_write`
```ab
pub fun file_write(path, content) 
```

Writes content to a file.
Doesn't check if the file exist


## `file_append`
```ab
pub fun file_append(path, content) 
```

Appends content to a file.

Doesn't check if the file exists.


## `create_symbolic_link`
```ab
pub fun create_symbolic_link(origin: Text, destination: Text): Bool 
```

Creates a symbolic link.

If the file doesn't exist, it returns a boolean and prints a message.


## `create_dir`
```ab
pub fun create_dir(path: Text): Null 
```

Creates a directory with all parent directories as required.


## `make_executable`
```ab
pub fun make_executable(path: Text): Bool 
```

Sets a file as executable.

If the file doesn't exist, it returns a boolean and prints a message.


## `change_owner`
```ab
pub fun change_owner(user: Text, path: Text): Bool 
```

Changes the owner of a file.

If the file doesn't exist, it returns `false`


