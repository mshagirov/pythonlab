---
layout: page
title: "Terminal"
permalink: /lab-01/03
---

### Verify Your System in the Terminal

> Terminal is a type of a command line interface (CLI) and people use these
terms interchangeably.

1. Open **VS Code**.
1. Open VS Code terminal:
    - In VS Code, use keyboard shortcut `` ^` `` ( press `Control` and `` ` ``
    keys together) or from the menu toolbar go to `View > Terminal`.
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

> If you would rather use a different IDE or editor to VS Code, please feel free
to run these commands in your preferred terminal or IDE.

### Relative and Absolute Path

Your operating system uses two types of paths to locate files and folders,
*absolute path* and *relative path*. E.g., `~` is a relative path (shortcut)
that refers to the home folder in Unix-based system like Linux and MacOS. An
absolute path for home folder could look something like `/home/murat` (Linux
and WSL) or `/Users/murat` (macOS).

Below are most commonly used relative path locations:

| Relative path | Meaning | Usage |
|:-------------:|:-------:|:-----:|
| `~` | User's home directory | `~/Documents/`  refers to `Documents/` in my home directory |
| `.` | The current directory | `./file1` is same as just `file1` but the first one is more specific |
| `..`| The parent directory (of the current one) | `../..` refers to a "grandparent" directory of the curent `.` |

Inside our code you may use either of the relative or the absolute paths to refer
to files and folders on your machine. The relative path, as its name suggests,
may depend on your current working directory and change when you change your
working directory or the environment. The absolute path always starts with the root
directory `/` and does not depend on your current working directory or the
environment (e.g., your username).

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="02">Previous: Project</a>
    <a id="next" href="04">Next: Relative Path</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
