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

