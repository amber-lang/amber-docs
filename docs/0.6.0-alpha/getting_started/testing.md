
Test blocks are dedicated scopes for writing tests. They are executed only when running the `amber test` command and are ignored during normal compilation. Test blocks can be optionally named using a string literal. This improves readability and allows for targetted execution.

## Syntax
```ab
import { assert } from "std/test"

// Unique named test block
test "can multiply numbers" {
    let result = 10 * 2
    assert(result == 20)
}

// Unnamed test block (only one allowed per file)
test {
    let name = "Amber"
    assert(name + " Lang" == "Amber Lang")
}
```

# CLI Test Filtering

The `amber test` command is designed to verify the correctness of your code by executing test blocks. By default, it recursively finds and runs all tests in the current directory. You can narrow down which tests to run by providing filter arguments.

## Filtering Tests

You can run a specific subset of tests by providing the `--test-case <TEST_CASE>` flag. This argument filters which tests to run by using a **prefix match** against the test case name.

```bash
# Run all tests located in the current directory whose names start with "variable"
amber test . --test-case "variable"
```

## Targeting Specific Files

Instead of running tests from the current directory, you can specify a particular file or directory to scan.

```bash
# Run all tests inside main.ab
amber test main.ab

# Run all tests in main.ab whose names start with "zip"
amber test main.ab --test-case "zip"
```
