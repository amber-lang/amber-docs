## Builtin vs Standard Library

[Builtins](/advanced_syntax/builtins) are methods that are included in the Amber compiler and don't need to be imported in the code.

In contrast, the standard library (stdlib) is a collection of Amber functions that are embedded in every Amber release. Each version of Amber may include changes to the standard library and you need to import these functions in your code. These functions are more advanced and can accept various parameters.

## Standard library and Shellcheck

Just like the Amber's compiled Bash output, all standard library functions are built from the ground up to be shellcheck compliant. This means that you can focus more on building the logic and spend less time on keeping the code predictable and valid.

## How to use it

Below is an example of how to use the standard library to generate documentation (using the [script](https://github.com/amber-lang/amber-docs/sync-stdlib-doc.ab) provided on the Amber Documentation repository):

```ab
import { download } from "std/http"
import { split, contains } from "std/text"
import { file_exist } from "std/fs"

unsafe $rm -fr /tmp/amber-git$
if silent download("https://github.com/amber-lang/amber/archive/refs/heads/master.zip", "/tmp/amber-git.zip") {
    unsafe $unzip "/tmp/amber-git.zip" -d /tmp/amber-git$

    let std = unsafe $/usr/bin/ls "/tmp/amber-git/amber-master/src/std/"$
    let stdlib = split(std, "\n")

    loop v in stdlib {
        if (contains(v, ".ab") and file_exist("/tmp/amber-git/amber-master/src/std/{v}")) {
            unsafe $amber --docs "/tmp/amber-git/amber-master/src/std/{v}" "./docs/stdlib/doc"$
            echo "\n"
        }
    }
}
```

> WARNING: Each Amber release may have a different version of the standard library, so make sure to verify compatibility with the specific release you are using.

### Importing a library

You can also import all functions from a module by using the following syntax:

```ab
import * from "std/http"
```

However, only the functions that are used in the script will be included in the generated Bash code, ensuring efficiency.

If you prefer a verbose import, you can specify a single function:

```ab
import { download } from "std/http"
```
