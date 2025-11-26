Here is an example script to periodically install software updates on an Ubuntu system. The update commands are wrapped in a `main` block, so that all commands between `$` signs can pass up errors with the `?` operator. The script will stop in that case and not execute any further commands.

> As you can see, the Amber code currently looks as if it is intertwined with bash commands. As development progresses, executing custom commands will be even better integrated with special syntax and improved runtime safety features to aid this process.

```ab
import { date_now, date_format_posix } from "std/date"

main {
    // Print output and log it at the same time.
    $ exec > >(tee -a /var/log/autoapt.log) 2>&1 $?
    // Log the current date so that we can check when any failed runs happened.
    echo date_format_posix(date_now())

    // Internet is slow on Austrian trains. Check the Wifi SSID and stop in that
    // case.
    trust $ iwgetid -r | grep -E '(OEBB|WESTlan)' $ succeeded {
        echo "Skipping updates because of slow Wifi"
        exit 0
    }

    $ export DEBIAN_FRONTEND=noninteractive $?
    $ apt update $?
    // By default answer all user interaction questions with yes, for example
    // for debconf.
    // Use the old configuration file when new config files arrive.
    // Also say yes to setting up config files.
    $ yes '' | apt \
        -o Dpkg::Options::=--force-confold \
        -o Dpkg::Options::=--force-confdef \
        -y --allow-downgrades --allow-remove-essential \
        --allow-change-held-packages \
        upgrade $?
    // Clean up any packages that are not needed anymore.
    $ apt autoremove -y $?
    // Also update Snap packages.
    $ snap refresh --color=never --unicode=never $?
}
```
