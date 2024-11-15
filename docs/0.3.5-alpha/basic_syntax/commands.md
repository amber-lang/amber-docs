The only way to access the bash shell is through Amber's commands. Commands can be used in the form of a statement or an expression.

The important thing regarding commands is that they can `fail`. Failing is a new concept that forces the caller to handle the failure. There are many ways to handle failure:

- `failed` - the recommended way to handle failing that enables you to write some specific logic to run when a command fails
- `?` - this shorthand for propagating the failure to the caller. This operator can only be used in a `main` block or inside of a function.
- `unsafe` - the discouraged way to handle failing. This modifier will treat commands as if they have completed successfully and will allow them to be parsed without any further steps.

Here is an example use:

```ab
// Command statement
$mv file.txt dest.txt$ failed {
	echo "It seems that the file.txt does not exist"
}

// Command expression
let result = $cat file.txt | grep "READY"$ failed {
    echo "Failed to read the file"
}
echo result
```

Command expression result is sent to the variable instead of _standard output_.

Command expression can also be interpolated with other expressions and variables

```ab
let file_path = "/path/to/file"
$cat {file_path}$ failed {
	echo "Could not open '{file_path}'"
}
```

## Getting the Exit Code

In order to get the exit code, you can use the `status` keyword. It will always return you the exit code of the last bash command or *failable function*.

```ab
let file_path = "/path/to/file"
$cat {file_path}$ failed {
	echo "Error! Exit code: {status}"
}
echo "The status code is: {status}"
```

## Failure Propagation

In order to propagate failure to the context above, you can simply use the question mark syntax `?`.

Here is an example:

```ab
$test -d /path/to/file$?
// Which is the same as

$test -d /path/to/file$ failed {
	fail status
}
```

To learn more about fail keyword, please read the article covering [failures](/basic_syntax/functions#failing).

# Command Modifiers

Command modifier is a keyword that alters the behavior of a command. Here are some examples:
- `silent` - prevents command from displaying the result to the standard output.
- `unsafe` - disables Amber's mechanism that requires user to handle failures.

You can learn more details about each command modifier in the forthcoming chapters.

Here is the example usage of a command modifier:

```ab
silent unsafe $my command$
```

You can use the command modifiers as modifier scopes. This way you don't have to repeat yourself on multiple commands.

```ab
silent unsafe {
	$first command$
	if isReady:
        	$second command$
	$third command$
}
```

## Unsafe Command Execution

```ab
unsafe $test -d /path/to/file$
```

This will be treated the same way Bash treats statements. If it fails, then carry on with the code execution. This behavior is the one that we were trying to avoid when building Amber. The cases when this method is encouraged are the following:

- You are **fully sure** that this command will complete successfully
- You **do not care** whether the command will fail or not

## Silencing Commands

You can easily silent given command. Here is an example usage:

```ab
silent $very loud command$
```
