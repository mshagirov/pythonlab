---
layout: page
title: "Part 2: DNA Analysis Tool"
permalink: /lab-01/03
---

### The Project

In this lab we will build a tool to analyse DNA sequences. We require this program
to do the following:

- It is a command line tool (we will use it from the terminal)
- Accept one or more paths to potential DNA sequence files (file locations)
- Read those files and ignore any comments
- Check if the sequence is a valid DNA data and ignore it if it is not
- Count the bases `A`, `T`, `G`, and `C`
- Compute the GC content (%)
- Estimate sequence's melting temperature (Tm assuming it is a plasmid)
- Print out all the analysis results to the terminal

```python
                                      ▄                         
█▀▀▄  █▀▀▄  ▄▀▀▄     ▄▀▀▄ ▄▄▄    ▄▄▄  █  ▄  ▄   ▄▄▄   ▄▄   ▄ ▄▄ 
█  █  █  █  █▄▄█     █▄▄█ █  █  █  █  █  █  █  ▀▄▄   █▄▄█  █▀   
█▄▄▀  █  █  █  █     █  █ █  █  ▀▄▀█  █  ▀▄▄█  ▄▄▄▀  ▀▄▄▄  █    
                                          ▄▄▀                   
Analysing sequences:
+--------------------+--------+--------+--------+--------+--------+
┊   Sequence File    ┊ #bases ┊ssMW kDa┊  GC%   ┊ AT/GC  ┊ Tm C°  ┊
+--------------------+--------+--------+--------+--------+--------+
┊     BGH-R.pri      ┊   18   ┊  5.66  ┊ 55.56% ┊  0.80  ┊   56   ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example1.txt    ┊  6458  ┊1998.87 ┊ 34.42% ┊  1.91  ┊ 17362  ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example3.dna    ┊   47   ┊ 14.61  ┊ 14.89% ┊  5.71  ┊  108   ┊
+--------------------+--------+--------+--------+--------+--------+
┊   MSCV-fwrd.pri    ┊   23   ┊  6.93  ┊ 60.87% ┊  0.64  ┊   74   ┊
+--------------------+--------+--------+--------+--------+--------+
┊   pBAD-fwrd.pri    ┊   20   ┊  6.10  ┊ 35.00% ┊  1.86  ┊   54   ┊
+--------------------+--------+--------+--------+--------+--------+
┊       T3.pri       ┊   21   ┊  6.45  ┊ 42.86% ┊  1.33  ┊   60   ┊
+--------------------+--------+--------+--------+--------+--------+

Skipped:
❌     example2.txt      Not a DNA sequence
❌     example4.rna      Not a DNA sequence
```

### Project Folder Organisation

> Please create `~/workplace/pythonlab/lab1/dna-analyser` if you haven't already
done so.

`workspace/pythonlab/` will house all the projects that you will write in this
and future labs. Inside it, we will create directories for each lab, and each
lab folder will contain all the projects for that given lab.
You are welcome to continue using `workspace` for your future projects.

> I saw this structure from [Lane Wagner (boot.dev)](https://blog.boot.dev/misc/how-i-organize-my-local-development-environment/)
and have adopted it in my own workflow.

### Entry Point for Your Program : `main.py`

1. Open `~/workplace/pythonlab/lab1/dna-analyser` as a folder in VS Code.
1. Create and open a new python file in the `dna-analyser`. Name the
file `main.py`. A Python file is just a text file with a name ending with `.py`.
1. Open `main.py` in VS Code.

> `main.py` will be an *entry point* for our program. The name `main.py` is a
conventional name given to the "main" file in your program that you run to use your
program. Naming your main file `main.py` is not a requirement. Nevertheless, it
is more convenient for organising our code by giving us a clear place to start
reading our code in the future.

Copy the following into `main.py`:

```python
print("Hello from DNA Analyser!")
```

Then run the following from the VS Code terminal (make sure your current working
directory is the same as the location of the `main.py`,
i.e.`~/workspace/pythonlab/lab1/dna-analyser`.

```bash
python3 main.py
```

> In the above we are "telling" Python interpreter to run our `main.py` code.

Congratulations, you have written your first Python program on your machine!🐍

### Shebang Line

Another convenient way to run Python programs in Unix-like systems (Linux, MacOS)
is by adding a *shebang* (`#!`) line on top of the file as shown below.

```python
#!/usr/bin/env python3

print("Hello from DNA Analyser!")
```

- Add the Python shebang as the very first line to `main.py`.
- Change `main.py` to be executable using `chmod +x` (this modifies file
permissions to executable or "runnable" file):

    ```bash
    chmod +x main.py
    ```

- Then run the following in the terminal:

    ```bash
    ./main.py
    ```

You should see your program run as usual. This time we did it without
explicitly calling the Python interpreter. The line with `#!` takes care
of calling the interpreter when we run the program.

Note the `./` in front of the file name. Here, we need to specify that
the *command* `main.py` is in the current directory as our system is not aware
of its location.

> To run commands without specifying their path, you need to add its directory
(location) to the [`PATH` environment variable](https://en.wikipedia.org/wiki/PATH_(variable)).

Going forward you may run `main.py` either by directly *calling* it or using
`python3 main.py`.

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="02">Previous: Part 1</a>
    <a id="next" href="04">Next: Part 3</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
