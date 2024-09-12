# Contributing to Amber
This is a simple but exhaustive guide to get you started on contributing to amber.

## Contributing guidelines
Before you dig into Amber, you should know a few things before you contribute.

Any code change is submitted [through a PR](https://github.com/amber-lang/Amber/pulls), which is then approved by at least 2 maintainers.

The way we talk on github is not the same as we would talk in person. When on github, always get straight to the point and be critical.

Personal grudges are forbidden around here, as well as anything offtopic or offensive.

### Opening a PR

Before a PR is opened, it usually has an issue about it first, where we discuss how exactly a feature must be implemented, to avoid making a mistake.

It is recommended that you see how features were already implemented. A good example is [#130](https://github.com/amber-lang/Amber/issues/130)

To create a PR, you should fork the repo, create a branch, do your work in there, and open a PR. It will then be reviewed and pushed into master.

The maintainers will check who it is the best reviewer, we suggest to open a ticket reporting the issue before starting to do the PR so we can discuss the implementation.

### Getting help

Along the way, you may need help with your code. The best way to ask is in [our Discord server](https://discord.com/invite/cjHjxbsDvZ), but you may also ask other contributors personally or post in [Discussions](https://github.com/amber-lang/Amber/discussions).

#### Running tests

To run ALL tests, run `cargo test`.

If you want to run only tests from a specific file, let's say from [`stdlib.rs`](src/tests/stdlib.rs), you add the file name to the command: `cargo test stdlib`

And if there is a specific function, like `test_function()` in `stdlib.rs`, you should add the full path to it: `cargo test stdlib::test_function` 
