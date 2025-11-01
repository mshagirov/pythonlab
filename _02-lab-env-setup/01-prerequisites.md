---
layout: page
title: Prerequisites
permalink: /lab-01/01
---

We will need a couple of things before we can start writing Python programs. A code
editor with support for Python programming to write and read our code, and the Python
interpreter to run it.

A good code editor should have tab completions, syntax highlighting, error checking,
and have ways to customise it. There are many excellent and free editors and
integrated development environment (IDE) tools that you can find online. A few popular
choices would be

- VS Code
- PyCharm by JetBrains
- Vim and Neovim
- Emacs
- other specilised tools for different systems, e.g., Android studio, Xcode, etc.

Here we will use [VS Code](https://code.visualstudio.com/). But if you have another
IDE or editor that you are familiar with and you know what you are doing, go ahead
and use your preferred tool ignore the parts where we install VS Code.

System notes (Nix and WSL)

### System Setup

Prepare your machine by following instructions for your operating system below:

{% tabs os-type %}

{% tab os-type Windows %}

File storage: [WSL development environment](https://learn.microsoft.com/en-us/windows/wsl/setup/environment)

[Instructions for VS Code for WSL](https://code.visualstudio.com/docs/remote/wsl)

install WSL

install VS Code

install WSL extension

```sh
cd .
```

{% endtab %}

{% tab os-type MacOS %}

install homebrew

install vscode

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
    <a id="next" href="02">Next: Install Python</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
