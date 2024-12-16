## `download`

```ab
import { download } from "std/http"
```

```ab
pub fun download(url: Text, path: Text): Bool 
```

Downloads a file from a given URL and saves it to a specified path using available command-line tools.

This function attempts to download a file from the provided URL and save it to the specified path.
It checks for the availability of common command-line tools (`curl`, `wget`, and `aria2c`) and uses the first available tool to perform the download.
If none of the tools are available, the function returns `false`.


