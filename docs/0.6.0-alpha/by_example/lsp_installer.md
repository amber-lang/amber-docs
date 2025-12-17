This script automates the installation of several Language Server Protocol (LSP) tools, primarily by downloading them from GitHub and installing them on your system. The latest version of the script (and also **complete**) can be found [here](https://github.com/Mte90/My-Scripts/blob/master/dev/lsp-installer/install.ab).

> The script uses standard library functions to simplify the process of downloading, unpacking, and installing various LSP tools. It checks for necessary permissions, downloads the latest releases of selected LSPs, moves them to system directories, makes them executable, and installs additional LSPs using `npm`, `pip`, and `gem` as needed.
> For each tool, if the download or installation fails, an error message is displayed, and the script exits to prevent partial installations.

```ab
import { dir_exists, file_chmod, symlink_create } from "std/fs"
import { file_download } from "std/http"
import { is_root } from "std/env"
import { text_contains } from "std/text"

if not is_root() {
    echo("This script requires root permissions!")
    exit(1)
}

fun get_download_path(repo, position) {
    return trust $ curl -sL "https://api.github.com/repos/{repo}/releases" | jq -r ".[0].assets.[{position}].browser_download_url" $
}

fun move_to_bin(download_url, binary) {
    file_download(download_url, binary) failed {
        echo("Download for {binary} at {download_url} failed")
        exit(1)
    }
    
    mv binary "/usr/local/bin" failed {
        echo("Move {binary} to /usr/local/bin failed!")
        exit(1)
    }
    
    file_chmod("/usr/local/bin/{binary}", "+x") failed {
        echo("Failed to make {binary} executable")
        exit(1)
    }
}

fun download_to_bin(download_url, binary, packed_file) {
    file_download(download_url, packed_file) failed {
        echo("Download for {binary} at {download_url} failed")
        exit(1)
    }
    
    trust {
        if text_contains("tar.gz", packed_file) {
            $ tar -zxvf "./{packed_file}" -C ./ > /dev/null 2>&1 $
            trust mv "./{binary}" "/usr/local/bin"
        } else {
            $ gunzip -c - > "/usr/local/bin/{binary}" $
        }
        $ rm "./{packed_file}" $
    }
    
    file_chmod("/usr/local/bin/{binary}", "+x") failed {
        echo("Failed to make {binary} executable")
        exit 1
    }
}

cd "/tmp"

echo("Install Typos LSP")
download_to_bin(get_download_path("tekumara/typos-lsp", 6), "typos-lsp", "typos.tar.gz")

echo("Install Rust LSP")
download_to_bin("https://github.com/rust-lang/rust-analyzer/releases/latest/download/rust-analyzer-x86_64-unknown-linux-gnu.gz", "rust-analyzer", "rust-analyzer-x86_64-unknown-linux-gnu.gz")

echo("Install Lua LSP")
if not dir_exists("/opt/lua-language-server") {
    cd "/opt/"
    trust $ git clone https://github.com/LuaLS/lua-language-server $
} else {
    cd "/opt/lua-language-server"
}
silent trust {
    cd "lua-language-server"
    $ git pull $
    $ ./make.sh $
}
symlink_create("/opt/lua-language-server/bin/lua-language-server", "/usr/local/bin/lua-language-server") failed {
    echo("Failed to create symlink for lua-language-server")
    exit 1
}

cd "/tmp"

let npm_lsp = ["vscode-langservers-extracted", "@tailwindcss/language-server", "@olrtg/emmet-language-server", "intelephense", "bash-language-server"]
let npm_lsp_name = ["CSS, HTML, JSON LSP", "Tailwind LSP", "Emmet LSP", "Intelephense LSP", "Bash LSP"]
for index, lsp in npm_lsp {
    echo("Install {npm_lsp_name[index]}")
    $ npm i -g "{lsp}" $ failed(code) {
        echo("Error! Exit code: {code}")
    }
}
```
