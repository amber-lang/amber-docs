# Contributing to Amber

This is a simple but exhaustive guide to get you started on contributing to Amber.

## Contributing Guidelines

Before you dig into Amber, you should know a few things before you contribute.

Any code change is submitted [through a PR](https://github.com/amber-lang/Amber/pulls), which is then approved by at least 2 maintainers.

The way we talk on GitHub is not the same as we would talk in person. When on GitHub, always get straight to the point and be critical.

Personal grudges are forbidden around here, as well as anything offtopic or offensive.

### Opening a PR

Before a PR is opened, it usually has an issue about it first, where we discuss how exactly a feature must be implemented, to avoid making a mistake.

It is recommended that you see how features were already implemented. A good example is [#130](https://github.com/amber-lang/Amber/issues/130)

To create a PR, you should fork the repo, create a branch, do your work in there, and open a PR. It will then be reviewed and pushed into master.

The maintainers will check who it is the best reviewer, we suggest to open a ticket reporting the issue before starting to do the PR so we can discuss the implementation.

### Getting Help

Along the way, you may need help with your code. The best way to ask is in [our Discord server](https://discord.com/invite/cjHjxbsDvZ), but you may also ask other contributors personally or post in [Discussions](https://github.com/amber-lang/Amber/discussions).

### Development

Compile Amber with the following instructions:

```
git clone https://github.com/amber-lang/amber
cd amber
cargo build
```

In order to build the installer scripts run:

```bash
amber build.ab build.sh
```

Debugging Amber:
```bash
// Shows the AST
AMBER_DEBUG_PARSER=true cargo run <file.ab>
// Shows the time it took to compile each phase
AMBER_DEBUG_TIME=true cargo run <file.ab>

// Flamegraph is a profiling tool that is used to visualize the time each function took to execute
sudo cargo flamegraph -- <file.ab> <file.sh>
```

#### Running Tests

Tests modules can be found in [`src/tests`](https://github.com/amber-lang/amber/tree/master/src/tests) where every single module contains multiple testing functions. The exception is for [`stdlib.rs`](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib.rs) and [`validity.rs`](https://github.com/amber-lang/amber/blob/master/src/tests/validity.rs). They keep all the test scenarios in directories `stdlib/` and `validity/` for easier readability and better code organization.

To run ALL tests, run `cargo test`.

If you want to run only tests from a specific module, let's say from [`stdlib.rs`](https://github.com/amber-lang/amber/blob/master/src/tests/stdlib.rs), you can do that by adding the module name to the command: `cargo test stdlib` or `cargo test tests::stdlib::test_stdlib_src_tests_stdlib_extract_ab` to run a single test.

And if there is a specific function, like `function_with_wrong_typed_return()` in [`errors.rs`](https://github.com/amber-lang/amber/blob/master/src/tests/errors.rs), you should add the full path to it: `cargo test errors::function_with_wrong_typed_return`

#### Github Actions

We are using `cargo-dist` to build the binaries for all the platforms. The binaries are then uploaded to the release page once a new release a tag is created.
