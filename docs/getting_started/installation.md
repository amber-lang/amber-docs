# Instalation

Amber compiler currently works on:
- Linux x86 and ARM
- macOS x86 and ARM (Apple Silicon)

## macOS

Make sure that the operating system meets the following prerequisites

- Bash or Zsh or any other Bourne-again shell (usually comes with macOS)
- Ruby 2.0 or newer (usually comes with macOS)

```sh
sudo ruby -e "require 'open-uri'; puts open('https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/install.sh').read" | $(echo $SHELL)
```

## Linux

Make sure that the operating system meets the following prerequisites

- Bash or Zsh or any other Bourne-again shell
- Curl tool for downloading the installation script

```sh
sudo curl "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/install.sh" | $(echo $SHELL)
```

# Uninstallation

You can uninstall Amber any time. To do this you can simply run the following code snippet.

## macOS 

```sh
sudo ruby -e "require 'open-uri'; puts open('https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/uninstall.sh').read" | $(echo $SHELL)
```

## Linux

```sh
sudo curl "https://raw.githubusercontent.com/Ph0enixKM/AmberNative/master/setup/uninstall.sh" | $(echo $SHELL)
```

