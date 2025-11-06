---
layout: page
title: "Part 1: Linux Commands"
permalink: /lab-01/02
---

### 1. Verify Your System

1. Open **VS Code**.
1. Open VS Code terminal:
  - In VS Code, use keyboard shortcut `` ^` `` ( hold down Control and `` ` ``
    keys) or from the menu toolbar open `View > Terminal`.
1. Inside the terminal, enter the following:
  ```bash
  uname
  ```

You should see the above print either `Linux` (WSL, Linux) or `Darwin` (macOS).
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

### 2. Before Python... Some Linux Commands

> These are originally Unix (operating system) commands. Linux and macOS are
heavily influenced by Unix and reimplemented these commands.

| Command | Meaning | Usage |
|:-------:|:-------:|:-----:|
| `cd`    | Change directory (i.e., go to some folder). | `cd PATH_TO_FOLDER` |
| `ls`    | List directory content. | `ls PATH_TO_FOLDER` |
| `mkdir` | Make a new directory | `mkdir NEW_FOLDER` |
| `pwd`   | Print working directory name | `pwd`|
| `rm` | Permanently removes (deletes) files | `rm PATH_TO_FILE` |
| `touch` | Create empty file | `touch FILE` |

> Conceptually, directory in Linux is the same as folder on macOS and Windows.

- Enter the following in the VS Code terminal. Let's go to our *home* folder. We can
just enter `cd` without any arguments and options or `cd ~` to go to our home
directory in the terminal. The `~` is the short name for home folder.
```
cd ~
```

- Next, let's print our current path (location in the file system). This should
print your home folder's location. E.g., `/Users/murat/` or `/home/murat`:
```bash
pwd
```

- Use VS Code shortcut `^-Shift-P` (use Command instead of Control on macOS) to
use the search field and enter "Open Folder" and press enter. Alternatively, go to
`File > Open Folder...` on the menu bar. Open your home folder to see its contents
in the (file) Explorer tab of VS Code.

In the terminal:

- List the contents of your home folder.
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

- Create a new directory named `workspace`.
```bash
mkdir workspace
```

- Does the output from `ls -a` match what you see in the Explorer tab?

- `cd` to `workspace`. You may verify this with `pwd`
```bash
cd workspace
# check if you are in "workspace" directory
pwd
```

- Open "workspace" folder in the VS Code Explorer tab, e.g., press `Ctrl-Shift-P`,
type "Open Folder", and press Enter. Note that VS Code's terminal automatically changes
its current location to the folder that you have just opened.

In the terminal:

- Create new files:
```
touch file1 file2 file3
```

- Verify that the files exists by listing them with `ls -l`. Can you see these files in the "Explorer"?
- Remove (delete) the files with `rm`.
```bash
rm file1
```

Many Unix/Linux commands accept wildcard `*` to march patterns, e.g., `file*`
matches all file and folder names that start with `file`. Be careful to not
delete your other files that match this pattern.

- Delete all files with names that start with `file`. But before, let's do a
sanity check by listing these files (and folders):
```bash
ls -l file*
```

- If you are happy with what you see, go ahead and delete these files:
```bash
rm file*
```

### 3. Should You Use the Terminal?

Going forward you way use either the terminal and/or the Explorer
to manage your files and folders. You can also use your operating system's tools
such as Finder or File Explorer to browse and manage your files. I leave this up
to your preferences.

Nevertheless, it is generally much faster to navigate the filesystem and manage
your files via the terminal. Hence, I strongly suggest you to try to learn and at
least occasionally start using the terminal.

---

> Keep the `workspace` folder open in VS Code. We will use it in the next part.

---

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="01">Previous: Prerequisites</a>
    <a id="next" href="03">Next: Part 2</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
