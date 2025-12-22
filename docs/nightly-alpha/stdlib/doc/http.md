## `fetch`

```ab
pub fun fetch(url: Text, method: Text = "GET", data: Text = "", headers: [Text] = [""]): Text? 
```

Makes a HTTP request using available command-line tools or bash's network sockets as failover.

For POST requests with a custom data type, you should include `content-type` header in `headers[]`.

### Usage
```ab
import { fetch } from "std/http"

let response = trust fetch("https://example.com")

// POST request example
let post_request = trust fetch("https://example.com", "POST", "hello world!", [
    "content-type: text/plain"
])
```

## `file_download`

```ab
pub fun file_download(url: Text, path: Text): Null? 
```

Downloads a file from a given URL and saves it to a specified path using available command-line tools.

It checks for the availability of common command-line tools (`curl`, `wget`, and `aria2c`, in order) and uses the first available tool to perform the download.
If none of the tools are available, the function fails.

### Usage
```ab
import { file_download } from "std/http"

file_download("https://example.com/file.zip", "/tmp/file.zip")
```

