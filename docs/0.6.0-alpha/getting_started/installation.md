The Amber compiler currently works on:

- Linux x86 and ARM
- macOS x86 and ARM (Apple Silicon)

## Preparation for installation

### Linux

Make sure that the operating system meets the following prerequisites

- Install the basic calculator:
  - On Debian and Ubuntu: `sudo apt install bc` 
  - On Arch: `sudo pacman -Syu bc`
  - On Fedora: `sudo dnf install bc`
  - On OpenSUSE: `sudo zypper install bc`

- `curl` and `bash` are both installed by default in most cases. 
  In the very rare case, that they happen to be not available yet, download them as well.

## macOS

You have everything preinstalled to use Amber on macOS.
The default shell in macOS is zsh, and that one should be compatible with our bash code.

We currently evaluate, if there are edge cases we still have to cover.
If you find any issues, please report that, and switch temporarily to bash. 

### Installation Options

- **System-wide**
```bash
bash <(curl -sL "https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/install.sh")
```

- **Local-user**
```bash
bash -- <(curl -sL "https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/install.sh") --user
```

- **Available versions with package managers**

<div style="width:250px;margin: 0 auto;">
[![Packaging status](https://repology.org/badge/vertical-allrepos/amber-lang.svg)](https://repology.org/project/amber-lang/versions)
</div>

## Homebrew

```bash
brew install --HEAD amber-lang/amber/amber-lang
```

## NixOS Channel

The name of the package is `amber-lang`.

- **configuration.nix**

```nix
  environment.systemPackages = [
    pkgs.amber-lang
  ];
```

- **And with home manager:**

```nix
  home.packages = with pkgs; [
    amber-lang
  ];

  programs.home-manager.enable = true;
}
```

- **Start a shell with:**

```nix
nix-shell -p amber-lang
```

### NixOS with Flakes

- **You can use the Amber flake like this:**

```nix
{
    inputs = {
        # ...
        amber.url = "github:amber-lang/Amber";
    };
}
```

- **Flakes with home manager:**

```nix
home.packages = [ inputs.amber.packages.${pkgs.system}.default ];
```

While developing with Nix, the flake defines all dependencies for `nix develop` (or `direnv` if used).

## Snap

`sudo snap install amber-bash --classic`

## Windows Support

As windows does not come with bash installed it makes no sense to support it. Please install WSL 2 on your windows machine and install Linux version of Amber compiler inside.

In order for it to work you may need to run the following code that pulls all the prerequisites. These count for Debian and Ubuntu based images.

```sh
sudo apt install curl bc
sudo mkdir /opt /usr/local/bin
```

# External Tools Integrated

Amber is currently an alpha-stage project, and to implement some features, we have chosen to integrate external tools.

If these tools are available on your system, they will be executed at the end of the Bash compilation process.
* [bshchk](https://github.com/b1ek/bshchk): A runtime Bash dependency checker

# Uninstallation

If you have installed it via the first installation option, simply run the following code snippet.

```sh
bash -- <(curl -sL "https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/uninstall.sh")
```
