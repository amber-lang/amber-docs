In Amber, you can import functions from other files. To make a function accessible from an external file, you need to declare it as _public_ within the file where it’s defined.

## Public Functions

To declare a function as public you can use a `pub` keyword. Keep in mind that `pub` keyword has to be used before the `fun` keyword that declares your function:

```ab
pub fun sum(left: Num, right: Num): Num {
	return left + right
}
```

### Importing from Other Files

You can import each function individually...

```ab
import { foo, bar } from "./my-file.ab"

foo()
bar()
```

...or you can import all functions at once

```ab
import * from "./arith.ab"

echo sum(1, sub(2, mul(4, 5)))
```

## Public Imports

There are times when you might want to export what you imported. Then you can simply do this:

```ab
pub import * from "my/path/file.ab"
```

This will import all functions defined in `file.ab` and all of them will be publicly available again from this file.

## Main Block

Sometimes you want to run certain code when file is being run directly. The same issue can be solved in Python:

```py
if __name__ == '__main__':
	# code to execute
```

Amber has a special syntax for this pattern. It is not just a syntactic sugar though. Main scope gives you also the ability to use `?` operator in which case the exit code will be simply propagated to the external shell.

```ab
echo "Running indirectly"

main {
	$ some command $?
	echo "Running directly"
}
```

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
	loop i, arg in args {
		echo "{i}: {arg}"
	}
}
```
