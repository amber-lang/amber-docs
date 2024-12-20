In Amber, functions can be imported from other files. To make a function accessible externally, it must be declared as public in the file where it is defined.

## Public Functions

To declare a function as public we can use a `pub` keyword. Let's keep in mind that `pub` keyword has to be used before the `fun` keyword that declares our function:

```ab
pub fun sum(left: Num, right: Num): Num {
	return left + right
}
```

### Importing from Other Files

It's possible to import functions individually.

```ab
import { foo, bar } from "./my-file.ab"

foo()
bar()
```

It's also possible to import all functions at once.

```ab
import * from "./arith.ab"

echo sum(1, sub(2, mul(4, 5)))
```

## Public Imports

There are situations where we might need to re-export something we’ve imported. Amber makes this straightforward with the following syntax:

```ab
pub import * from "my/path/file.ab"
```

This statement imports all functions defined in file.ab and re-exports them, making them publicly accessible from the current file.

## Main Block

In case when we want a specific code to run only when a file is executed directly, Amber offers a clean and powerful solution. Similar to Python’s approach:

```py
if __name__ == '__main__':
	# code to execute
```

Amber uses a dedicated main scope for this purpose. However, it’s more than just a convenient syntax — it also provides additional functionality. Within the main block, we can use the `?` operator to propagate exit codes directly to the external shell, simplifying error handling.

```ab
echo "Running indirectly"

main {
	$ some command $?
	echo "Running directly"
}
```

> DETAILS: Key features of `main` block:
- Code outside the main block runs regardless of how the file is executed.
- Code inside the main block runs only when the file is executed directly.
- The `?` operator ensures that any exit code from a failable command or function call is automatically passed back to the shell, making it easy to handle script results effectively.

Now if we run this file the output will look like this:
```
Running indirectly
Running directly
```

Here is the behavior when we import the file instead.

```ab
import * from "./file.ab"
// Outputs: Running indirectly
```


### Main Block and External Arguments

Main block can provide an array of arguments (that is of type `[Text]`) passed to this script.

```ab
main (args) {
    for i, arg in args {
        echo "{i}: {arg}"
    }
}
```
