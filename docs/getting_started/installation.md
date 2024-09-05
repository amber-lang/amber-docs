# Installation

Amber compiler currently works on:
- Linux x86 and ARM
- macOS x86 and ARM (Apple Silicon)
- Nix (NixOS)

## macOS / Linux

Make sure that the operating system meets the following prerequisites

- Bourne-again shell (Bash)
- Basic calculator `bc` command (On Debian run `sudo apt install bc`)
- Curl tool for downloading the installation script

### Installation Options
- **System-wide**
```bash
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/install.sh" | bash
```
- **Local-user**
```bash
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/install.sh" | bash -s -- --user
```
- **Package manager**

[![Packaging status](https://repology.org/badge/vertical-allrepos/amber-lang.svg)](https://repology.org/project/amber-lang/versions)

## NixOS and Flakes

The package contains all the required install scripts and dependencies. You can use the flake as:

```nix
{
    inputs = {
        # ...
        amber.url = "github:Ph0enixKM/Amber";
    };

    # then later with home manager for example
    home.packages = [ inputs.amber.packages.${pkgs.system}.default ];
}
```

The package is avaiable as `amber-lang` on [nixpkgs](https://github.com/NixOS/nixpkgs/pull/313774).

While developing with Nix, the flake defines all dependencies for `nix develop` (or `direnv` if used).

## Windows support

As windows does not come with bash installed it makes no sense to support it. Please install WSL 2 on your windows machine and install Linux version of Amber compiler inside.

In order for it to work you may need to run the following code that pulls all the prerequisites.

```sh
sudo apt install curl bc
sudo mkdir /opt /usr/local/bin
```

# External tools integrated

Amber is currently an alpha-stage project, and to implement some features, we have chosen to integrate external tools.

If these tools are available on your system, they will be executed at the end of the Bash compilation process.

* [shfmt](https://github.com/patrickvane/shfmt): A shell formatter (sh/bash/mksh), It is recommended because Amber currently does not format the generated Bash code.
* [bshchk](https://github.com/b1ek/bshchk): A runtime Bash dependency checker

# Uninstallation

You can uninstall Amber any time. To do this you can simply run the following code snippet.

```sh
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/uninstall.sh" | bash
```
