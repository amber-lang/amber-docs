## `dir_exist`
```ab
pub fun dir_exist(path) 
```

Check if directory exists


## `file_exist`
```ab
pub fun file_exist(path) 
```

Check if file exists


## `file_read`
```ab
pub fun file_read(path) 
```

Get the file content


## `file_write`
```ab
pub fun file_write(path, content) 
```

Write the content to the file
Doesn't check if the file exist


## `file_append`
```ab
pub fun file_append(path, content) 
```

Append the content to the file
Doesn't check if the file exist


## `create_symbolic_link`
```ab
pub fun create_symbolic_link(origin: Text, destination: Text): Bool 
```

Create a symbolic link
If the file doens't exist return a boolean and print a message


## `create_dir`
```ab
pub fun create_dir(path: Text): Null 
```

Create a directory with all intermediate directories as required


## `make_executable`
```ab
pub fun make_executable(path: Text): Bool 
```

Set the file as executable
If the file doesn't exist return a boolean and print a message


## `change_owner`
```ab
pub fun change_owner(user: Text, path: Text): Bool 
```

Change the owner of the file
If the file doesn't exist return false


