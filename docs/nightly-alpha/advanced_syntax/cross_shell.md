Since 0.6.0, Amber has introduced support for multiple shell targets:
- zsh 5.8+ (only tested on 5.8 and above)
- ksh 93u+m (only tested on 1.0.10)
- bash 4.3+
- bash 3.2+

This gives developers the ability to write one usable code for multiple shells without the need to consider all the differences between them all. 

While the syntax side is generated for specific target automatically, each shell has its own behaviour for the same commands, which still need to be processed individually.

To implement code logic for individual shells, we have included `shellname()` and `shellversion()` builtins:

```ab
if {
    shellname() == "bash" and shellversion() > [3,2,0] {
        echo("using bash above 3.2")
    }
    shellname() == "ksh" {
        echo("using ksh")
    }
    shellname() == "zsh" {
        echo("using zsh")
    }
}
```
The builtins don't execute any other function and can be safely used multiple times without any performance losses.

To build the script for specific target, use `--target` argument:

```sh
amber build script.ab --target bash # default (bash 4.3+)
amber build script.ab --target bash-3.2
amber build script.ab --target zsh
amber build script.ab --target ksh
```
