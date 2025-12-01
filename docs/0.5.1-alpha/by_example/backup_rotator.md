This script demonstrates an automated backup rotation system that keeps only the most recent backups while deleting older ones.

```ab
import { dir_exists, dir_create, file_exists } from "std/fs"
import { parse_int, trim } from "std/text"
import { date_now, date_format_posix } from "std/date"

fun get_backup_count(backup_dir: Text): Int? {
    let count_output = trust $ ls -1 "{backup_dir}" | wc -l $
    return parse_int(trim(count_output))?
}

fun create_backup(source: Text, backup_dir: Text): Int? {
    let timestamp = date_format_posix(date_now())?
    let backup_name = "backup_{timestamp}.tar.gz"

    echo "Creating backup: {backup_name}"
    sudo $ tar -czf "{backup_dir}/{backup_name}" "{source}" $?

    echo "Backup created successfully"
    return 0
}

fun rotate_backups(backup_dir: Text, max_backups: Int) {
    let current_count = get_backup_count(backup_dir)?
    echo "Current backup count: {current_count}"

    // Remove old backups while we have too many
    while current_count > max_backups {
        echo "Removing oldest backup (count: {current_count}/{max_backups})"

        // Get the oldest backup file
        let oldest = trust $ ls -1t "{backup_dir}" | tail -n 1 $

        sudo $ rm "{backup_dir}/{oldest}" $ succeeded {
            echo "Removed: {oldest}"
        }
        current_count = get_backup_count(backup_dir)?
    }
    echo "Backup rotation complete. Keeping {current_count} backups."
}

main(args) {
    if len(args) < 2 {
        echo "Usage: backup-rotator <source_dir> <backup_dir> [max_backups]"
        echo "Example: backup-rotator /var/www /backups 5"
        exit 1
    }

    let source_dir = args[0]
    let backup_dir = args[1]
    let max_backups = len(args) >= 3
        then parse_int(args[2])?
        else 5

    // Validate source directory
    if not dir_exists(source_dir) {
        echo "Error: Source directory '{source_dir}' does not exist"
        exit 1
    }

    // Create backup directory if it doesn't exist
    if not dir_exists(backup_dir) {
        echo "Creating backup directory: {backup_dir}"
        sudo dir_create(backup_dir) failed {
            echo "Failed to create backup directory"
            exit 1
        }
    }

    // Create new backup
    create_backup(source_dir, backup_dir)?

    // Rotate old backups
    rotate_backups(backup_dir, max_backups)?
}
```
