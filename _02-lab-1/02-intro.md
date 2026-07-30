---
layout: page
title: "🧪 Project"
permalink: /lab-01/02
---

### DNA Analyser

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

### Goals of the Project

- Practice Python commands that we have learned from the previous session
- Get familiar with your tooling (e.g., IDE, your machine etc)
- Learn what is a Python environment
- Learn how to set up a Python environment for your project
- Practice writing (re-usable) Python modules
- Have fun with Python!

<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>
<div class="prevnextlinks">
    <a id="previous" href="01">Previous: Prerequisites</a>
    <a id="next" href="03">Next: Terminal</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
