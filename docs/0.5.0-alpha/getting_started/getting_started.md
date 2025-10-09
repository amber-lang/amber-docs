Welcome to the documentation of Amber the programming language! 🎉

Here is a minimal hello world example:
```ab
echo "Hello world!"
```

## What is Amber?

Amber is a programming language compiled into Bash Script. It was designed with a modern syntax, safety features, type safety and practical functionalities that Bash could not offer. The subsequent section will demonstrate how Amber embodies these characteristics.

### Modern Syntax

Amber is designed based on the ECMA script syntax. The goal was to create a syntax that any developer could feel comfortable with. Hence, Amber draws on features from languages like Rust and Python.

### Safety Features

When Bash command fails - it carries on with the code execution as if nothing has happened. This could lead to some serious problems and side effects that are irreversible.

We dislike this behavior. This is why Amber will not compile if edge cases aren't handled - whether that involves displaying an error message to the user or failing silently.

### Type Safety

Amber comes with a straightforward type system that aids in identifying simple bugs and errors at compile time, yet it remains unobtrusive, allowing you to focus on what matters most in scripting: the logic.

### Extra Features

Amber supports things that are essential to developer like floating point arithmetic, a non-obscure way to handle arrays or even passing variables by reference instead of by copy. In addition to that Amber comes with a standard library that includes features like text trimming, summing all number in an array, splitting text and many more.

### Supported Environments

Amber's compiled Bash scripts are actively tested across a range of environments.

| Environment       | Version Range | Status               | Notes                                                              |
|-------------------|---------------|----------------------|--------------------------------------------------------------------|
| **Bash (Linux)**  | 3.2 - 5.3     | Under Testing | All versions within this range are tested using [tianon/docker-bash](https://github.com/tianon/docker-bash). |
| **Bash (macOS)**  | N/A           | Under Testing | Verified through GitHub Actions `macos-latest` environments.       |
| **Sed**           | N/A           | Under Testing | Shell text processing utility. Tested for GNU and BusyBox `sed` compatibility due to behavioral differences. |
