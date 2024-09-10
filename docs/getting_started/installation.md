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
bash <(curl -s "https://raw.githubusercontent.com/amber-lang/amber/master/setup/install.sh")
```
- **Local-user**
```bash
bash -- --user <(curl -s "https://raw.githubusercontent.com/amber-lang/amber/master/setup/install.sh")
```
- **Package manager**
> Contribute and add Amber to your favourite package manager!

    Available distributions:
    - [**Ubuntu**](https://snapcraft.io/amber-bash) on Snapcraft with package name `amber-bash`
    - [**Arch Linux**](https://aur.archlinux.org/packages/amber-bash-bin) (AUR) with package name `amber-bash-bin`

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

# Uninstallation

You can uninstall Amber any time. To do this you can simply run the following code snippet.

```sh
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/uninstall.sh" | bash
```
