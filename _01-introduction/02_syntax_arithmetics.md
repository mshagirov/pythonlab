---
layout : page
title: Syntax and Arithmetics
permalink: /introduction/02
---

### Python Syntax

*Syntax* in programming, including Python, refers to the programming language rules.
The syntax determines the structure and interpretation of the code when it runs.
It may be easier to learn Python and its syntax by trying and breaking
it instead of purely reading the documentation. Let's try running (and breaking)
some code.

### Arithmetic Operators

For example, let's start with the basic arithmetics. Python uses the following
operators to do basic arithmetics,

- `+` : addition,
- `-` : subtraction,
- `*` : multiplication,
- `/` : division.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(10 + 5)
print(21 * 2)
print(22 / 7)
</script></pre></div>

> Feel free to edit the code cells. If you need to reset code to the default
state, just reload the page.

When you run your code, Python interprets the code *sequentially line-by-line*.
Try switching the sequence, deleting, and adding print statements to the
above to see the effect.

### Floor Division and Modulo Operators

In addition to these, Python also has *integer division* and modulo operators.

- `//` : floor or integer division. `a // b` divides `a` by `b` then returns *an
integer part of the quotient*. This operation rounds down the result to the nearest
whole number.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(22 // 7)
</script></pre></div>

> Note the absence of decimal point `.` that you get when using `/`, e.g., `3.14..`.

- `%` : modulo, `a % b` returns the remainder of the division.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(22 % 7)
</script></pre></div>

### Operator Precedence

The order of the arithmetic operations follows the usual *operator precedence*:

1. parantheses `(...)`
1. multiplication and division (`/` or `//`)
1. addition and subtraction.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print((1 + 2)* 3)
print( 1 + 2 * 3)
</script></pre></div>

### Exercises

---
**E1:** Indentation

Note that, compared to other programming languages, *indentation* is important
in Python. E.g., this will produce an error.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(1 + 2)
  print(3 + 4)
</script></pre></div>

- Try fixing the error in the code so that it is able to run.

> In your browser the above won't run and might not display any errors. In Python,
indentation defines a code block. We will revisit indentation in the coming sections.

---
**E2:** Floor Division with Negative Numbers

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print( -13 // 7  )
print(-(13 // 7) )
</script></pre></div>

Apply `//` to negative numbers. How does floor division behave in this case?

> Tip: compare the results of floor division with the ones you get from the
regular division operations `/`.

---
**E3:** Python Shell

Run some of the commands above in the [Python shell](/pythonlab/terminal/){:target="_blank"}.

- The shell displays a default *representation* of the commands' outputs if you
don't use `print`. The representation of an object (e.g., text), is more
informative. That's what you get when you enter commands into the shell.
- The output of `print` is meant to be human-readable and formatted. This may
hide some of the information about the object.

---

> Keep the terminal open when reading through the pages of this site to quickly
try out different variations of the commands.

<div class="prevnextlinks">
    <a id="previous" href="01">Previous: Standard Library</a>
    <a id="next" href="03">Next: Strings</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
