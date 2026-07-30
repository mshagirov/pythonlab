---
layout: page
title: "Relative Path"
permalink: /lab-01/04
---

### Relative and Absolute Path

Your operating system uses two types of paths to locate files and folders,
*absolute path* and *relative path*. E.g., `~` is a relative path (shortcut)
that refers to the home folder on Unix-based system like Linux and MacOS. An
absolute path for home folder could look something like `/home/murat` (Linux
and WSL) or `/Users/murat` (macOS).

Below are most commonly used relative path locations:

| Relative path | Meaning | Usage |
|:-------------:|:-------:|:-----:|
| `~` | User's home directory | `~/Documents/`  refers to `Documents/` in my home directory |
| `.` | The current directory | `./file1` is same as just `file1` but the first one is more specific |
| `..`| The parent directory (of the current one) | `../..` refers to a "grandparent" directory of the curent `.` |

### Where Do We Use Relative and Absolute Paths?

Inside our code you may use either of the relative or the absolute paths to refer
to files and folders on your machine. The relative path, as its name suggests,
may depend on your current working directory and change when you change your
working directory or the environment. The absolute path always starts with the root
directory `/` and does not depend on your current working directory or the
environment (e.g., your username).

As an exercise, list the contents of your home directory using `ls` command:

```bash
ls ~
```

> In the above, `ls` is a command that takes the input "`~`" (path to your
home directory) and lists its contents on the terminal.

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="03">Previous: Terminal</a>
    <a id="next" href="05">Next: Linux Commands</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
