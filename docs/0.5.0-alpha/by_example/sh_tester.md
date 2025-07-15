This script is used within the project to automate the process of identifying any ShellCheck validation issues in our test cases after they are compiled to Bash scripts.

> The script loops through all files in the Amber project's standard library test folder (`src/tests/stdlib/`), compiles each test to a Bash script, and then runs ShellCheck on the resulting script.
> If ShellCheck detects any issues (i.e., returns a non-zero exit code), the script generates a `.txt` report detailing the problems found. This report is stored in a designated temporary directory (`/tmp/amber-sc-tests`).

```ab
import { split, text_contains } from "std/text"
import { file_write, file_append, dir_exists, file_exists, dir_create } from "std/fs"

let path = "/tmp/amber-sc-tests"

if (not dir_exists(path)) {
    dir_create(path)
}
trust $cp -r "src/tests/stdlib/" {path}$
let report = "{path}/report.txt"
trust file_write(report, "Report for Shellcheck")
let output = ""

let stdtests = trust $ /usr/bin/ls "src/tests/stdlib/" $
let stdlib = split(stdtests, "\n")

for v in stdlib {
    if not text_contains(v, ".txt") and file_exists("src/tests/stdlib/{v}") {
        echo "Generating Bash script for test {v}"
        trust $ ./target/debug/amber build "src/tests/stdlib/{v}" "{path}/{v}.sh" $
        output = trust $ shellcheck "{path}/{v}.sh" $

        if (status != 0) {
            echo "Shellcheck found something!"
            trust file_append(report, output)
        }
    }
}
```
