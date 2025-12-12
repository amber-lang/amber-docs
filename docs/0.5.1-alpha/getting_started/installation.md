## Installation

### Support for architectures

The Amber compiler currently works on:
- Linux x86 and ARM
- macOS x86 and ARM (Apple Silicon)
- Windows over WSL 2

### Preparation for installation

## macOS
On macOS, you should have everything preinstalled (curl, bash, bc).

## Linux
Make sure that the operating system meets the following prerequisites
- Install the basic calculator:
  - On Debian and Ubuntu: `sudo apt install bc` 
  - On Arch: `sudo pacman -Syu bc`
  - On Fedora: `sudo dnf install bc`
  - On OpenSUSE: `sudo zypper install bc`
  
- `curl` and `bash` are both installed by default in most cases. 
  In the very rare case that they happen to be not available yet, download them as well.

> DETAILS: You should always update the system before you install a package in a rolling release distro, such as **Arch** and **Tumbleweed.**. Always reboot after an update of the kernel, init system, and similar software as well. 

## Installation via *bin*, the binary package manager

**Install bin itself**:

Download the binary for your platform here:

```
https://github.com/marcosnils/bin/releases 
```

And then make it executable: 

```
chmod +x ./bin_0.24.2_linux_amd64
```

And now run it from the directory where it is located:

```
./bin_0.24.2_linux_amd64 install github.com/marcosnils/bin
```

And now, install Amber:

```
bin install github.com/amber-lang/amber
```

Update it via:

```
bin update
```

> DETAILS: Bin can install all binaries that are hosted somewhere on GitHub, Codeberg, and other locations. For detailed documentation, see: [Commands Reference](https://github.com/marcosnils/bin?tab=readme-ov-file#-commands-reference)

## Installation via script

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

### NixOS Channel

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

### Snap

```bash
sudo snap install amber-bash --classic
```

## Windows Support

As Windows does not come with bash installed, it makes no sense to support it.  
Please install WSL 2 on your Windows machine and install the Linux version of the Amber compiler inside.

For it to work, you may need to run the following code that pulls all the prerequisites.  
These count for Debian and Ubuntu-based images.

```sh
sudo apt install curl bc
sudo mkdir /opt /usr/local/bin
```

## Integration of external tools

Amber is currently an alpha-stage project, and to implement some features, we have chosen to integrate external tools.  
If these tools are available on your system, they will be executed at the end of the Bash compilation process.

* [bshchk](https://github.com/b1ek/bshchk): A runtime Bash dependency checker

## Uninstallation

If you have installed it via the script installation option, simply run the following code snippet.

```sh
bash -- <(curl -sL "https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/uninstall.sh")
```
