# FAQ

## Who is Amber for?

Amber is aimed at developers who need the power of a modern programming language while staying within the ubiquitous Bash environment. It is especially useful for:
- System administrators automating complex tasks.
- DevOps engineers writing portable scripts.
- Developers who want type‑safety and richer abstractions without abandoning the shell.

## Why not Python?

Python excels at many domains, but it requires a separate runtime and often incurs additional deployment overhead. Amber compiles directly to Bash, so you can:
- Leverage existing shell tooling and pipelines.
- Deploy a single script without installing a language interpreter.
- Benefit from Bash‑native features (process substitution, job control) while enjoying high‑level syntax and safety.

## Why not write Bash directly?

Pure Bash scripts lack static type checking, modular imports, and modern language constructs. Amber provides:
- A type system that catches errors early.
- Structured imports and modules for better code organization.
- Built‑in helpers (e.g., safe string interpolation, automatic error handling) that reduce boilerplate.

## How does Amber compare to other languages?

| Feature | Amber | Bash | Python | Rust |
|---|---|---|---|---|
| Compiles to Bash | ✅ | ✅ | ❌ | ❌ |
| Static typing | ✅ | ❌ | ✅ | ✅ |
| Native shell integration | ✅ | ✅ | ❌ | ❌ |
| Learning curve | Low | Moderate | Moderate | High |

Amber fills a niche between lightweight shell scripting and full‑featured high‑level languages.

## Is Amber production‑ready?

Amber is under active development. The **nightly** provides the latest features and improvements, but may contain breaking changes. For production workloads, we recommend using the latest stable release (e.g., `0.5.x`) rather than the nightly build.

## Can I use Amber for system scripts?

Yes. Amber is designed for exactly that purpose. It can replace many typical Bash one‑liners and larger maintenance scripts, offering better readability, safety, and testability while still running on any POSIX‑compatible system.

## What shells does Amber support?

Currently, Amber targets **Bash** versions 3.2 through 5.3. We actively test across:
- Linux (GNU bash 3.2-5.3)
- macOS (bash 3.2)

The compiled code is highly portable and will run on any system with the target shell installed.

## Can Amber compile to other shells like Zsh or POSIX sh?

Yes, this is actively being developed. Amber currently targets Bash as its primary shell, but we're working on mechanisms to allow targeting different shells. For now, you can use Amber's built-in features that have equivalents in POSIX shell, and we're working on a target configuration that will let you specify the target shell.

## Is Amber written in Rust?

Yes! Amber's compiler is written in Rust and targets Bash. We're currently at version 0.5.1 and always looking for contributors, especially Rust developers. If you're interested in helping, check out our [contributing guide](contribute/contribute) or reach out on Discord.

## Why not just use an LLM to write scripts?

LLMs can generate scripts, but they come with their own challenges:
- Scripts may only work on your machine with your specific Bash version
- No type safety or compile-time error checking
- Security concerns with AI-generated code

Amber provides the ease of writing with a modern syntax while ensuring your scripts work reliably across different environments.

## Is Amber better than Python for shell tasks?

It depends on your needs:

| Consider Amber if... | Consider Python if... |
|---------------------|----------------------|
| You need maximum portability (only Bash required) | You need external dependencies (pip packages) |
| Your scripts must run on any Unix-like system | You control the deployment environment |
| You want type safety in shell scripting | You need complex data structures or AI integration |
| You prefer Bash-native features | You need WebAssembly or GUI support |

Many users use Amber for system administration and DevOps tasks where portability matters, and Python for application development where ecosystem matters more.

## Can I use Amber for CI/CD pipelines?

Absolutely! Amber shines in CI/CD because:
- Only Bash is required (pre-installed on all CI runners)
- Type safety catches errors before they reach production
- Scripts compile to clean, readable Bash
- *Bshchk* validation ensures dependencies exist
- The compiler itself can be installed via various methods (bin, brew, pip, etc.)

We even use Amber to generate parts of our own documentation!

## How does Amber handle error cases?

Amber enforces explicit error handling at compile time. If a function can fail, Amber will not compile your code unless you handle both success and failure cases, either by displaying an error message or failing silently. This prevents the "silent failure" problem common in Bash scripts where commands fail but execution continues as if nothing happened.

## Can Amber generate Bash that ShellCheck would accept?

Yes! Our focus on clean Bash generation means the compiled code follows ShellCheck (not yet at 100%) best practices. We're also working on integrating ShellCheck into our CI pipeline to ensure the generated code maintain high quality standards.

## Is Amber suitable for beginners?

Yes, Amber is designed to be approachable:
- Syntax similar to JavaScript/Python/Rust (familiar to most developers)
- Type system catches common mistakes early
- Built-in functions reduce boilerplate
- Documentation includes many examples
- The compiler provides helpful error messages

Many users start with Amber to learn scripting concepts before moving to more complex languages.

## Why was Amber created?

The project started as a PhD research topic, focusing on making Bash scripting safer and more maintainable. It gained community interest and evolved into a full project.
