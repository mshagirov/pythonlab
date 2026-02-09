---
layout: page
title: "Part 1: Linux Commands"
permalink: /lab-01/02
---

### Verify Your System

> If you would rather use a different IDE or editor to VS Code, please feel free
to run these commands in your preferred ternimal and IDE.

1. Open **VS Code**.
1. Open VS Code terminal:
    - In VS Code, use keyboard shortcut `` ^` `` ( hold down Control and `` ` ``
    keys) or from the menu toolbar go to `View > Terminal`.
1. Inside the terminal, enter the following:

    ```bash
    uname
    ```

You should see the above print either `Linux` (WSL and Linux) or `Darwin` (macOS).
E.g., your terminal should look like this (the exact prompt, `$` and everything
in front of it may differ from the example below):

```bash
$ uname
Linux
```

For macOS:

```bash
$ uname
Darwin
```

### Some Linux Commands (Optional)

> These are originally Unix (operating system) commands. Linux and macOS are
heavily influenced by Unix and have reimplemented these commands.

We will use the following command line interface (CLI) commands in the terminal:

| Command | Meaning | Usage |
|:-------:|:-------:|:-----:|
| `cd`    | Change directory (i.e., go to some folder). | `cd PATH_TO_FOLDER` |
| `ls`    | List directory content. | `ls PATH_TO_FOLDER` |
| `mkdir` | Make a new directory | `mkdir NEW_FOLDER` |
| `pwd`   | Print working directory name | `pwd`|
| `rm` | Permanently removes (deletes) files | `rm PATH_TO_FILE` |
| `touch` | Create empty file | `touch FILE` |

> Conceptually, directory in Linux is the same as folder on macOS and Windows.
Also, usage of [`touch` command](https://man7.org/linux/man-pages/man1/touch.1.html)
is not limited to creating empty files and you can use it to set file access and
modification times.

### Relative and Absolute Path

Linux uses two types of paths to locate files and folders, *absolute path* and
*relative path*. E.g., `~` is a relative path (shortcut) that refers to the
home folder in Unix-based system like Linux and MacOS. An absolute path for home
folder could look something like `/home/murat` (Linux and WSL) or `/Users/murat`
(macOS). Below are most commonly used relative path locations:

| Relative path | Meaning | Usage |
|:-------------:|:-------:|:-----:|
| `~` | User's home directory | `~/Documents/`  refers to `Documents/` in my home directory |
| `.` | The current directory | `./file1` is same as just `file1` but the first one is more specific |
| `..`| The parent directory (of the current one) | `../..` refers to a "grandparent" directory of the curent `.` |

### Workspace Folder

Let's use terminal to navigate to the home folder to setup our workspace.
Enter the CLI commands below to your terminal. Refer to the tables above
for explanations and names of the commands.

1. Go to your home folder using `cd` command. You may either enter `cd` (without
any arguments) or `cd ~` (use `~` to specify the relative path to the home folder).

    ```bash
    cd ~
    ```

    That is `cd` space and `~`. The *command signature* is the same for all other
    commands `COMMAND [OPTIONS] [ARGUMENTS]`, where square brackets represent
    optional inputs.

1. Next, let's print our current path (location in the file system). This should
print your home folder's location. E.g., `/Users/murat/` or `/home/murat`:

    ```bash
    pwd
    ```

1. List the contents of your home folder with `ls`.

    ```bash
    ls
    ```

    - `ls` accepts *options*, e.g.,
    - `ls -l`: lists contents line-by-line,
    - `ls -a`: lists *all* content including *hidden* files and folders.
    - `ls -la` or `ls -al`: combines `-l` and `-a` options.

    ```bash
    ls -al
    ```

1. Create a new directory named `workspace`.

    ```bash
    mkdir workspace
    ```

    - Verify that `workspace` was properly created with `ls -alF`. The `-F`
    option shows
`/` after directory names.
    - Use VS Code shortcut `^-Shift-P` (`Cmd-Shift-P` on macOS) to
use the search field and enter "Open Folder" and press enter. Alternatively, go to
`File > Open Folder...` on the menu bar. Open your home folder to see its contents
in the (file) Explorer tab of VS Code.
    - Does the output from `ls -a` match what you see in the Explorer tab?

1. `cd` to `workspace`. You may verify this with `pwd`

    ```bash
    cd workspace
    # check if you are in "workspace" directory
    pwd
    ```

1. Create some test files:

    ```bash
    touch file1 file2 file3
    ```

    - Verify that the files exists by listing them with `ls -l`. Can you see
    these files in the "Explorer"?
1. From the `workspace`, go to its parent directory (your home directory):

    ```bash
    cd ..
    ```

    - Open `workspace` folder in the VS Code (file) *Explorer* panel. Note that
VS Code's terminal automatically changes its current location to the folder
that you have just opened. If you don't see the Explorer panel,
press `Ctrl-Shift-P` (`Cmd-Shift-P` on MacOS), then type "Open Folder", and
    press Enter.

1. Go to `workspace` with `cd` if you are not in it. Then, remove (delete)
`file1` with `rm` (use `pwd` and `ls` to verify location and contents of
your current working directory).

    ```bash
    rm file1
    ```

1. Many Linux commands accept wildcard `*` to match patterns, e.g., `file*`
matches all file and folder names that start with `file`. Be careful to not
delete your other files that match this pattern.

    - Delete all files with names that start with `file` inside `workspace/`.
    But before, let's do a sanity check by listing these files (and folders):

    ```bash
    ls -al file*
    ```

    - If you are happy with what you see, go ahead and delete these files:

    ```bash
    rm file*
    ```

1. Create a new directory with path `~/workplace/pythonlab/lab1/dna-analyser`.
For this, you need to create multiple directories. In the terminal, this can be
done with `mkdir -p NEW_DIR`, `-p` option allows you to automatically create
parent directories for your path.

    ```bash
    mkdir -p ~/workplace/pythonlab/lab1/dna-analyser
    ```

1. Use either Explorer panel or terminal (`cd`) to navigate to `dna-analyser`
directory. Then, verify the current directory path with `pwd`.

### Should You Use the Terminal or Graphical User Interface?

Above we saw just a glimpse of what is possible with CLI or the terminal.
You may continue practicing these and other CLI commands if you want to get
better at it. Going forward you way use either the terminal and/or the Explorer
to manage your files and folders. You can also use your operating system's
tools such as Finder or File Explorer to browse and manage your files. I leave
this up to your preferences.

Nevertheless, it is generally much faster to navigate the filesystem and manage
your files via the terminal. Hence, I strongly suggest you to try to learn and
use the terminal (CLI) commands.

---

> Keep the `dna-analyser` folder open in VS Code. We will use it in the next part.

---

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="01">Previous: Prerequisites</a>
    <a id="next" href="03">Next: Part 2</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
