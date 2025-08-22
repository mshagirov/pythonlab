---
layout : page
title: Syntax and Arithmetics
permalink: /introduction/02
---

#### Python Syntax

*Syntax* in programming refers to the grammar rules of the programming language.
The syntax, just like in human-languages, determines how the code is structured
and how it runs. I believe it is easier to learn the Python and its syntax by
trying and breaking it instead of reading the syntax documentation. So, let's
try running some code.

#### Basic Arithmetics

For example, let's start with basic arithmetics. To
do basic arithmetics Python uses the following operators,

- addition `+`,
- subtraction `-`,
- multiplication `*`,
- and division `/`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(40 + 2)
print(42 - 3)
print(42 * 2)
print(42 / 3)
</script></pre></div>

When you run your code, Python interprets the code *sequentially* line-by-line.
Try switching the sequence of the print statements above to see the effect.

The order of the arithmetic operations follows the usual *operator precedence*:

1. parantheses
1. multiplication and division
1. addition and subtraction.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print((1 + 2)* 3)
print( 1 + 2 * 3)
</script></pre></div>

In addition to these, Python also has *integer division* and modulo operators,

- floor or integer division: `a // b`, divides `a` by `b` then returns integer
part of the quotient (rounds down the result to the nearest whole number),

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(294 // 7)
</script></pre></div>

- modulo: `a % b`, returns the remainder of the division.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(85 % 43)
</script></pre></div>

> Try to run the above commands in the  [terminal](/pythonlab/terminal/){:target="_blank"}.
You don't need to use `print` in the terminal to see the output of the command.
Keep the terminal open when reading through the pages of this site to quickly
try out different variations of the commands.

### Indentation

Note that, compared to other programming languages, *indentation* is important
in Python. E.g., this will produce an error.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(1 + 2)
  print(3 + 4)
</script></pre></div>

In your browser the above won't run or show any errors. We will see
the importance of indentation when defining *functions*. For now, try fixing the
error in the above code so that it is able to run.

<div class="prevnextlinks">
    <a href="01">Previous: Standard Library</a>
    <a href="03">Next: Strings</a>
</div>
