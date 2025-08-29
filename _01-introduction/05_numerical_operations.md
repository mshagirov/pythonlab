---
layout : page
title: Numerical and Logical Operations 
permalink: /introduction/05
---

<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript">
</script>

### Infinity

For applications that require using *infinity*, Python allows creating `float`
values that represent positive and negative infinity.

- Positive infinity: `float("inf")`,
- negative infinity: `float("-inf")`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(float("inf"))
</script></pre></div>

> `inf` is usually used to initialise values or to handle special cases for
various algorithms. E.g., to find a maximum value you may start with `-inf`
and compare you numbers to it. Using `-inf` in the initial step will ensure
that your program will update the current maximum value since any number
is larger than `-inf`.

### Exponentials

Python also has a built-in operation `**` for computing exponentials. E.g.,
`2**4` computes $$2^4$$.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
print(2**4)
</script></pre></div>

### In-place Updates

`+=`, `-=`, `*=`, `/=`.

### Formatting numbers

formatting, scientific notation, readability `1_000 is 1000`.

Logical operations `==`, `and`, `or`.

Side note: Binary numbers, bitwise operations `&`, `|`. Converting binary to decimal

<div class="prevnextlinks">
    <a id="previous" href="04">Previous: Variables</a>
    <a id="next" href="06">Next: Functions</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>
