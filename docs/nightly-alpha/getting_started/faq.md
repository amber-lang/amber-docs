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
| Cross‑platform binaries | ❌ (script) | ✅ | ✅ | ✅ |
| Learning curve | Low‑moderate | Low | Moderate | High |

Amber fills a niche between lightweight shell scripting and full‑featured high‑level languages.

## Is Amber production‑ready?

Amber is under active development. The **nightly‑alpha** channel provides the latest features and improvements, but may contain breaking changes. For production workloads, we recommend using the latest stable release (e.g., `0.5.x`) rather than the nightly build.

## Can I use Amber for system scripts?

Yes. Amber is designed for exactly that purpose. It can replace many typical Bash one‑liners and larger maintenance scripts, offering better readability, safety, and testability while still running on any POSIX‑compatible system.

## Where can I get help?

- **Documentation** – see the [examples](by_example/examples) and the [getting started guide](getting_started/installation).
- **GitHub** – open an issue or browse the [repository](https://github.com/amber-lang/amber).
- **Discord** – join the community chat at https://discord.gg/cjHjxbsDvZ.
- **Changelog** – review recent changes on the [GitHub releases page](https://github.com/amber-lang/amber/releases).
- **Community** – follow [r/amberlang](https://www.reddit.com/r/amberlang/) on Reddit for news and discussions.

## What shells does Amber support?

Currently, Amber targets **Bash** versions 3.2 through 5.3. We actively test across:
- Linux (GNU bash 3.2-5.3)
- macOS (bash 3.2)
- BusyBox (ash-based environments like Alpine Linux)

**Future plans include:**
- **Zsh support** (work in progress via a target attribute)
- **POSIX sh** compatibility where possible

The compiled code is highly portable and will run on any system with the target shell installed.

## Can Amber compile to other shells like Zsh or POSIX sh?

Yes, this is actively being developed. Amber currently targets Bash as its primary shell, but we're working on mechanisms to allow targeting different shells. For now, you can use Amber's built-in features that have equivalents in POSIX shell, and we're working on a target configuration that will let you specify the target shell.

## Does Amber support associative arrays?

Yes, we're actively working on implementing associative arrays and multi-dimensional arrays. See [issue #66](https://github.com/amber-lang/amber/issues/66) and [issue #263](https://github.com/amber-lang/amber/issues/263) on GitHub for updates and technical details.

## Is Amber written in Rust?

Yes! Amber's compiler is written in Rust and targets Bash. We're currently at version 0.5.1 and always looking for contributors, especially Rust developers. If you're interested in helping, check out our [contributing guide](contribute/contribute) or reach out on Discord.

## Why not just use an LLM to write scripts?

LLMs can generate scripts, but they come with their own challenges:
- Scripts may only work on your machine with your specific Bash version
- No type safety or compile-time error checking
- Security concerns with AI-generated code

Amber provides the ease of writing with a modern syntax while ensuring your scripts work reliably across different environments.

## Does Amber use `curl | bash` for installation?

No. Amber's installation script is self-contained and explicitly chosen by the user. You download a script and run it with `bash`, not pipe directly from the internet. This is a security best practice we care about deeply. The Amber compiler itself is written in Rust and can be installed via various package managers including Homebrew, Nix, and Snap.

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
- Bshchk validation ensures dependencies exist
- The compiler itself can be installed via various methods (bin, brew, pip, etc.)

We even use Amber to generate parts of our own documentation!

## How does Amber handle error cases?

Amber enforces explicit error handling at compile time. If a function can fail, Amber will not compile your code unless you handle both success and failure cases, either by displaying an error message or failing silently. This prevents the "silent failure" problem common in Bash scripts where commands fail but execution continues as if nothing happened.

## What's the relationship between Amber and Bash compatibility?

Amber is designed for **Bash-first compatibility**:
- Target Bash versions: 3.2-5.3
- Generates human-readable Bash code
- Preserves comments in output
- Works on Alpine Linux (BusyBox ash environments)
- Supports process substitution, job control, and other Bash features
- We're working on a target attribute to specify different shell versions

The goal isn't to replace Bash, but to make writing Bash scripts safer, more maintainable, and more enjoyable.

## Where can I see Amber in action?

Check out:
- [Example scripts](by_example/examples) in the documentation
- Our [GitHub repository](https://github.com/amber-lang/amber) for the compiler source
- The [Amber by Example](https://github.com/amber-lang/amber-kate) repository for real-world scripts
- [FOSDEM 2026 talk slides](https://mte90.tech/Talk-Amber/) for technical deep-dive

## Can Amber generate Bash that ShellCheck would accept?

Yes! Our focus on clean Bash generation means the compiled code follows ShellCheck best practices. We're also working on integrating ShellCheck into our CI pipeline to ensure the generated code maintain high quality standards.

## Is Amber suitable for beginners?

Yes, Amber is designed to be approachable:
- Syntax similar to JavaScript/Python/Rust (familiar to most developers)
- Type system catches common mistakes early
- Built-in functions reduce boilerplate
- Documentation includes many examples
- The compiler provides helpful error messages

Many users start with Amber to learn scripting concepts before moving to more complex languages.

## What makes Amber different from other Bash alternatives?

Amber fills a unique niche in the ecosystem:

| Approach | Target | Learning Curve | Portability |
|----------|--------|----------------|-------------|
| **Bash** | Native | Low (basic), High (advanced) | Maximum |
| **Python** | Interpreter | Moderate | Requires Python |
| **Go/Rust** | Compiled | High | Cross-platform binaries |
| **Amber** | Bash transpiler | Low | Maximum (needs only Bash) |

Amber is not trying to replace Bash or Python—it's about **writing better Bash** by:
- Keeping the deployment simplicity of Bash (one script, no dependencies)
- Adding modern language features (types, error handling, modular imports)
- Maintaining compatibility with Bash 3.2-5.3 across platforms

## What tools integrate with Amber?

### Bshchk (Runtime Dependency Checker)
When available, Amber automatically runs `bshchk` on compiled scripts to verify all external commands exist at runtime. This prevents "command not found" errors when scripts are deployed.

### Editor Support
Amber has first-class editor support:
- **VS Code** - Full language support with LSP
- **Zed** - Native integration
- **Vim** - Language plugin
- **Kate/KWrite** - Syntax highlighting via `amber.xml`

All editor integrations work with the same Amber LSP implementation built on TreeSitter.

### Standard Library
Amber includes battle-tested functions:
- `std/env` - Environment checking (`is_root`, `is_command`)
- `std/fs` - File operations (`download`, `file_write`, `dir_create`)
- `std/text` - String operations (`split`, `text_contains`)
- `std/http` - HTTP operations (`download`)
- `std/array` - Array utilities
- `std/math` - Float arithmetic
- `std/date` - Date/time operations

## What's Amber's roadmap?

The project is actively evolved with these key areas:

**Short term:**
- More builtins (`ls` command support)
- More stdlib functions (`zip`, `unzip`, `tar` wrappers)
- More control blocks (`silent`, `suppress`)
- ShellCheck compliance (100% clean generated code)

**Medium term:**
- Dictionary/hash map data structures
- Object-oriented support with commands library
- Better Zsh compatibility
- Target shell attribute (specify `--target bash`, `--target zsh`, etc.)

**Long term:**
- Potential funding for full-time development
- WebAssembly compilation target
- Fine-tuned LLM for converting Bash/Python to Amber

## Why was Amber created?

The project started as a PhD research topic, focusing on making Bash scripting safer and more maintainable. It gained community interest and evolved into a full project.

While LLMs can now generate scripts, Amber's value remains in:
- **Portability guarantees** - Tested across Bash 3.2-5.3
- **Type safety** - Compile-time error prevention
- **Clean generated code** - Human-readable, ShellCheck-compatible
- **Standard library** - Pre-tested functions for common tasks

## How do I get started quickly?

1. **Install Amber** via your preferred method (bin, brew, pip, Nix, Snap)
2. **Write a simple script** with a shebang: `#!/usr/bin/env amber`
3. **Run it** - Amber compiles and executes in one step
4. **For production** - Compile first: `amber build input.ab output.sh`
5. **Deploy** - The compiled Bash script works anywhere

The [Getting Started guide](getting_started/getting_started) and [examples](by_example/examples) provide detailed walkthroughs.

## What are Amber's limitations?

**Current limitations:**
- Still in alpha (breaking changes possible)
- No associative arrays yet (work in progress)
- No pipes in the language yet (planned for future)
- Compiled scripts still only run in Bash-like environments

**These are actively being addressed** - check the issue tracker on GitHub for updates.

## How do I contribute?

We welcome contributors at all skill levels:

**For Rust developers:**
- Check out [`CONTRIBUTING`](contribute/contribute) guide
- Look for beginner-friendly issues
- Help with compiler improvements

**For everyone:**
- Test Amber on different platforms
- Report bugs with detailed reproduction steps
- Help with documentation
- Share your use cases and scripts
- Join the Discord community
