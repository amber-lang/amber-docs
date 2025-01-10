## `file_download`

```ab
import { file_download } from "std/http"
```

```ab
pub fun file_download(url: Text, path: Text): Bool 
```

Downloads a file from a given URL and saves it to a specified path using available command-line tools.

It checks for the availability of common command-line tools (`curl`, `wget`, and `aria2c`, in order) and uses the first available tool to perform the download.
If none of the tools are available, the function returns `false`.

