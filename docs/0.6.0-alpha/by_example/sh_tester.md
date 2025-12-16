This script is used within the project to automate the process of identifying any ShellCheck validation issues in our test cases after they are compiled to Bash scripts.

> The script loops through all files in the Amber project's standard library test folder (`src/tests/stdlib/`), compiles each test to a Bash script, and then runs ShellCheck on the resulting script.
> If ShellCheck detects any issues (i.e., returns a non-zero exit code), the script generates a `.txt` report detailing the problems found. This report is stored in a designated temporary directory (`/tmp/amber-sc-tests`).

```ab
import { split, text_contains } from "std/text"
import { file_write, file_append, dir_exists, file_exists, dir_create } from "std/fs"

let path = "/tmp/amber-sc-tests"

if (not dir_exists(path)) {
    dir_create(path) failed {
        echo("Failed to create directory {path}")
        exit 1
    }
}
trust $ cp -r "src/tests/stdlib/" {path} $
let report = "{path}/report.txt"
file_write(report, "Report for Shellcheck") failed {
    echo("Failed to write report file")
    exit 1
}
let output = ""

let stdtests = trust $ /usr/bin/ls "src/tests/stdlib/" $
let stdlib = split(stdtests, "\n")

for v in stdlib {
    if not text_contains(v, ".txt") and file_exists("src/tests/stdlib/{v}") {
        echo("Generating Bash script for test {v}")
        trust $ ./target/debug/amber build "src/tests/stdlib/{v}" "{path}/{v}.sh" $
        
        $ shellcheck "{path}/{v}.sh" $ exited(code) {
            if code != 0 {
                echo("Shellcheck found something!")
                file_append(report, "\n--- Issues in {v} ---\n") failed {
                    echo("Failed to append to report")
                }
            }
        }
    }
}
```
