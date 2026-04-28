Welcome to the Amber Contributing Guidebook! 👋

This guide offers a clear and comprehensive introduction to getting started with contributing to Amber. If you haven’t already, consider joining our [Discord](https://discord.com/invite/cjHjxbsDvZ) community, where you can ask any questions and connect with other contributors.

## Contributing Guidelines

Before you dig into Amber, you should know a few things before you contribute.

Any code change is submitted [through a PR](https://github.com/amber-lang/Amber/pulls), which is then approved by at least 2 maintainers. Each pull request should be directed to the `staging` branch unless there is a specific justification for targeting the `master` branch.

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

In order to execute amber code, use the following command:

```bash
# `cargo run` - cargo command
# `run <file.ab>` - amber command
cargo run run <file.ab>
```

To compile amber code into a bash code, use the following command:

```bash
# `cargo run` - cargo command
# `build <input.ab> <output.sh>` - amber command
cargo run build <input.ab> <output.sh>
```

Debugging Amber:
```bash
# Displays Amber's AST trace of trying to parse code
AMBER_DEBUG_PARSER=true cargo run -- run <file.ab>
# Shows the time it took to compile each phase
AMBER_DEBUG_TIME=true cargo run -- run <file.ab>
# Flamegraph is a profiling tool that is used to visualize the time each function took to execute
sudo cargo flamegraph -- <file.ab> <file.sh>
```

#### Running Tests

Tests modules can be found in [`src/tests`](https://github.com/amber-lang/amber/tree/main/src/tests). Modules like [`erroring.rs`](https://github.com/amber-lang/amber/blob/main/src/tests/erroring.rs), [`stdlib.rs`](https://github.com/amber-lang/amber/blob/main/src/tests/stdlib.rs) and [`validity.rs`](https://github.com/amber-lang/amber/blob/main/src/tests/validity.rs) load test scenarios from directories `src/tests/erroring/`, `src/tests/stdlib/` and `src/tests/validity/` respectively.

To run ALL tests, run `cargo test`.

If you want to run only tests from a specific module, let's say from [`stdlib.rs`](https://github.com/amber-lang/amber/blob/main/src/tests/stdlib.rs), you can do that by adding the module name to the command: `cargo test stdlib`.

To run a single test case, for example `function_with_wrong_typed_return.ab` in `erroring`, you can filter by the test name:
`cargo test function_with_wrong_typed_return`

#### Github Actions

We use GitHub Actions to run tests and build binaries. When a new release tag is created, artifacts are built for Linux, macOS, and Windows (x86_64 and aarch64) and uploaded to the release page. We also generate installers and Debian packages.
