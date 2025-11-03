---
layout: page
title: Prerequisites
permalink: /lab-01/01
---

We will need a couple of things before we can start writing Python programs:
A code editor with support for Python programming to write and read our code,
and Python interpreter to run the code.

A good code editor should have tab completions, syntax highlighting, error checking,
and have ways to customise it. There are many excellent and free editors and
integrated development environment (IDE) tools that you can find online. A few popular
choices are:

- VS Code
- PyCharm (by JetBrains)
- Neovim or Vim
- Emacs
- other specilised tools for different systems, e.g., Android studio, Xcode, etc.

In this lab, we will use [VS Code](https://code.visualstudio.com/). Main benefits
of VS Code are that it is easy to install and to get started, and it comes with
built-in syntax highlighting, code completion, and Python extensions for running
and debugging Python programs.

If you have another IDE or editor that you are familiar with and you know
what you are doing, go ahead and use your preferred tool, and you may ignore the
parts where we install VS Code.

Below we will install the *newest stable* version of Python for your operating system.
*The exact version depends on the operating system and not important*. Here again,
if you already have Python with version 3.8 or later and you know what you are doing,
you can read through the Python installation sections below and optionally skip the
installation.

Throughout this lab we will use Python inside a Unix-like systems: WSL (Windows),
Mac OS, and Linux. This choice is intentional and gives us several advantages:

- Consistent set of commands (Unix commands) for working with the command line
interface (CLI) without the OS-specific quirks.
- Windows users will be able to seamlessly transfer their skills to Linux and MacOS
machines.
- Many Python tools such as package managers work more smoothly on Linux-like systems.

### System Setup

Prepare your machine by following instructions for your operating system below:

{% tabs os-type %}

{% tab os-type Windows %}

#### Install WSL and VS Code

For Windows, we will follow
[VS Code instructions for developing in WSL](https://code.visualstudio.com/docs/remote/wsl):

1. *Optional*: Update your Windows and install [Windows Terminal](https://aka.ms/terminal).
1. Open PowerShell in **administrator** mode and run the following command.
Set your Linux (Ubuntu) password and username. You may use the same credentials
as your Windows OS.

    ```sh
    wsl --install
    ```

1. Restart your machine.
1. Download and install VS Code for Windows from [code.visualstudio.com](https://code.visualstudio.com/).
Keep the default installation options.
1. Install the [WSL extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl).
You may either do it buy clicking install on the site or do it from the VS Code
extensions menu.

You may find the
[VS Code tutorial](https://code.visualstudio.com/docs/getstarted/getting-started#getstarted-articles)
and instructions on setting up and using
[WSL with VS Code](https://code.visualstudio.com/docs/remote/wsl#_from-vs-code)
helpfull when getting started with VS Code and WSL.

#### Install Python

Your WSL Linux should come with Python installed. To check your Python installation
start your WSL Ubuntu in PowerShell or Windows Terminal.

```sh
ubuntu
```

Then, run the following:

```bash
python3 --version
```

If you get `command not found` errors, install Python by following the steps below:

1. Update your Ubuntu packages. Use your Linux/Ubuntu password when prompted.

    ```bash
    sudo apt update
    sudo apt udgrade
    ```

1. Install Python.

    ```bash
    sudo apt install python3
    ```

You can exit or stop Ubuntu by entering `exit` in the Ubuntu shell (CLI) and/or
stopping WSL with `wsl.exe --shutdown` command in PowerShell or Ubuntu CLI.

#### Managing Files in WSL

Please read the notes on the
[file storage in WSL and Windows](https://learn.microsoft.com/en-us/windows/wsl/setup/environment#file-storage).

{% endtab %}

{% tab os-type MacOS %}

#### Install Homebrew and Python

We will use [Homebrew](https://brew.sh) to manage the system Python on MacOS.
Follow the steps below to install Homebrew on your Mac:

1. Open terminal app. (You may use spotlight to find Terminal and run it.)
1. Copy and run the following command to install Homebrew (`brew` command)

    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

1. Test the installation.

    ```bash
    brew
    ```

1. Install Python.

    ```bash
    brew install python
    ```

1. Test Python installation.

    ```bash
    python --version
    ```

#### Install VS Code

{% endtab %}

{% tab os-type Linux %}

update your repo indices

upgrade libraries

install VS Code

{% endtab %}

{% endtabs %}

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="/pythonlab/lab-01/">Previous: Contents</a>
    <a id="next" href="02">Next: Your First Python Program</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
