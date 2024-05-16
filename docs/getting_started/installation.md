# Installation

Amber compiler currently works on:
- Linux x86 and ARM
- macOS x86 and ARM (Apple Silicon)

## macOS / Linux

Make sure that the operating system meets the following prerequisites

- Bourne-again shell (Bash)
- Curl tool for downloading the installation script

```sh
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/install.sh" | $(echo /bin/bash)
```

## Windows support

As windows does not come with bash installed it makes no sense to support it. Please install WSL 2 on your windows machine and install Linux version of Amber compiler inside.

# Uninstallation

You can uninstall Amber any time. To do this you can simply run the following code snippet.

```sh
curl -s "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/uninstall.sh" | $(echo /bin/bash)
```



