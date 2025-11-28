The only way to access the bash shell is through Amber's commands. Commands can be used in the form of a statement or an expression.

Commands (as well as *failable functions*) can sometimes _fail_, so it’s important for whoever uses them to be ready to handle what happens next. There are different ways to deal with failures, each with its own pros and cons:
- `failed` - the recommended way to handle failing that enables you to write some specific logic to run when a command fails
- `succeeded` - allows you to write specific logic to run when a command completes successfully
- `exited` - allows you to write logic that runs regardless of whether the command failed or succeeded
- `?` - this shorthand for propagating the failure to the caller. This operator can only be used in a `main` block or inside of a function.
- `trust` - the discouraged way to handle failing. This modifier will treat commands as if they have completed successfully and will allow them to be parsed without any further steps.

Here is an example use:

```ab
// Command statement
$ mv file.txt dest.txt $ failed {
    echo "It seems that the file.txt does not exist"
}

// Command expression
let result = $ cat file.txt | grep "READY" $ failed {
    echo "Failed to read the file"
}
echo result
```

> DETAILS: Command expression result is sent to the variable instead of _standard output_.

Command can also be interpolated with other expressions and variables

```ab
let file_path = "/path/to/file"
$ cat {file_path} $ failed {
    echo "Could not open '{file_path}'"
}
```

### Failed

The `failed` modifier allows you to write specific logic that runs only when a command fails. This is useful when you want to handle errors gracefully or perform recovery operations. Note that `failed` can optionally accept an exit code parameter, like `failed(code)`, to access the command's exit code.

```ab
$ cat file.txt $ failed(code) {
    echo "Exited with code {code}."
}
```

### Succeeded

Just like `failed` allows you to handle command failures, `succeeded` lets you write specific logic that runs only when a command completes successfully. This can be useful when you want to perform additional operations that should only happen if the command succeeds.

```ab
$ cat file.txt $ succeeded {
    echo "File was read successfully"
}
```

### Exited

The `exited` modifier allows you to write logic that runs regardless of whether the command failed or succeeded. This is useful when you need to perform cleanup or logging operations that should always happen. Note that `exited` can only be used when an exit code parameter is provided, like `exited(code)`.

```ab
$ cat file.txt $ exited(code) {
    echo "Command finished with exit code {code}"
}
```


## Status

The `status` keyword allows you to access the exit code of a command. This is the old school and Bash way of handling failures. Its trait is that it holds the exit code of only the previous command or *failable function* call.

```ab
trust $ no-access.txt < "some text" $ // status: 1
trust $ cat available-for-all.txt $ // status: 0
echo "The status code is: {status}" // The status code is 0
```

## Failure Propagation

In order to propagate failure to the context above, you can simply use the question mark syntax `?`.

Here is an example:

```ab
$ test -d /path/to/file $?
// Which is the same as

$ test -d /path/to/file $ failed {
    fail status
}
```

To learn more about fail keyword, please read the article covering [failures](/basic_syntax/functions#failing).

# Command Modifiers

Command modifier is a keyword that alters the behavior of a command. Here are some examples:
- `silent` - prevents command from displaying the result to the standard output.
- `trust` - disables Amber's mechanism that requires user to handle failures.

You can learn more details about each command modifier in the forthcoming chapters.

Here is the example usage of a command modifier:

```ab
silent trust $ my command $
```

You can use the command modifiers as modifier scopes. This way you don't have to repeat yourself on multiple commands.

```ab
silent trust {
    $ first command $
    if isReady:
            $ second command $
    $ third command $
}
```

## Unsafe Command Execution

```ab
trust $ test -d /path/to/file $
```

This will be treated the same way Bash treats statements. If it fails, then carry on with the code execution. This behavior is the one that we were trying to avoid when building Amber. The cases when this method is encouraged are the following:

- You are **fully sure** that this command will complete successfully
- You **do not care** whether the command will fail or not

## Silencing Commands

You can easily silent given command. Here is an example usage:

```ab
silent $ very loud command $
```
