---
layout : page
title: Strings
permalink: /introduction/03
---

We now know that Python executes your code sequentially line-by-line, and how
you can do basic arithmetics in it. Next, let's see how Python represents text.

In Python, *strings* represent text and you define them with `' '` or `" "`. E.g.,
`'this is a string'` and `"this is also a string"`. We actually used strings when
we were printing greeting text.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('this is a string')
print("this is also a string")
</script></pre></div>

Strings can contain quotes and other special characters.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Insure the return of organism for 'analysis'")
print('"double quotes"')
print('or include quotes \" and \' by escaping with \\ character')
</script></pre></div>

Here is an example of *new line* character `\n`:

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print('Priority One\nInsure the return of organism\nfor analysis.')
</script></pre></div>

> Learn more about special characters or *escape sequences* such as `\n`
(new line) from
[the official documention](https://docs.python.org/3/reference/lexical_analysis.html#escape-sequences){:target="_blank"}.

You also can define multi-line strings with `'''...'''` or `"""..."""`.
Multi-line strings defined in this way retain their indentations and lines.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("""Priority One
Insure the return of organism
for analysis.""")
</script></pre></div>

### Raw Strings

If you want Python to *not* interpret an escape sequence, you may prefix a string
with `r` to create a *raw* string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"This characters \n are on the same line")
print(r'\t is a tab and \n is a new line sequences')
</script></pre></div>

Run the above print commands with and without `r` prefix to see the differences
between raw and regular Python strings. Raw strings produce regular strings but
without a need to use the backwards slash `\` (escape) when defining a string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(r"These two strings are the same \n")
print("These two strings are the same \\n")
</script></pre></div>

### String Concatenation and Length

You can concatenate (join) multiple strings together using `+`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Weyland" + "-" + "Yutani" + " " + "Corporation")
</script></pre></div>

To get the length of a string, the number of charachters in a string, use `len` function.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(len("cargo"))
</script></pre></div>

### F-Strings

> [Formatted string literals](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals){:target="_blank"}

Formatted strings, f-strings for short, allow you to include and format the value
of Python expression into strings. To define f-string, use `f` or `F` prefix and
insert Python expressions as placeholders in curly braces `{expression}`.
The f-string evaluates the expression inside `{...}` first. Then, the result is
converted to its string representation. For instance, the following evaluates an
addition, formats, and prints the result as a string.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"The new route takes {8 + 10} months to reach Earth.")
</script></pre></div>

You are not limited to simple expressions like above, and you can use any valid
Python expression inside the placeholders. E.g., in the code below, we call `len`
function.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(f"Word 'Alien' is {len("Alien")} characters long.")
</script></pre></div>

### Exercises

---
**E1:** Debug a Syntax Error

- Oh no! I broke Python. Fix the following code so that it prints two lines.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print("Neo: 'I know kung-fu'\nMorpheus: 'Show me'')
</script></pre></div>
---

<div class="prevnextlinks">
    <a id="previous" href="02">Previous: Arithmetics</a>
    <a id="next" href="04">Next: Variables</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}"></script>
