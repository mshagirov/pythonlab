---
layout : page
title: Variable Scope
permalink: /introduction/06
---

Let's run the following code and observe what happens.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
def fun1():
    x = 5
    print(f"x = {x}", "fun1")

def fun2():
    print(f"x = {x}", "fun2")

x = 42

print(f"x = {x}", "before")
fun1()
print(f"x = {x}", "after")

print('-'*10) # prints dashes '-'

print(f"x = {x}", "before")
fun2()
print(f"x = {x}", "after")
</script></pre></div>

You must be wondering, why is the value of `x` different in these two functions,
and why we could not update the value inside `fun1`.

This is all due to variable's *scope*. Scope defines where the variable is
accessible or "visible" and where we can update it.

### Global vs Local Scope

If the variable is accessible from all parts of our program we say that it is
in the *global scope* and the variable is a *global variable*.

Above, we set `x=42` in the global scope and all parts of your code (e.g., `fun1`
and `fun2`) can access this variable. That is why the value of `x` is 42 inside the
`fun2` function.

On the other hand, `fun1` defined `x` internally as a *local variable* in its
own *local scope*. Only `fun1` is able to access this local variable. Once you
define (or re-define) a variable inside a local scope that variable is declared
as a local variable.

> Try reversing order of `x = 5` and the `print` statement
inside `fun1`. You will get an error, as `print` is trying to access yet undefined
local `x`.

### Why We Need Scope

Every function has its own local scope, also known as a *function scope*. Scope
is what makes functions and other objects in Python reusable blocks of code.
Think about this for a moment. What happens if functions didn't have local scope?
Every variable would have to have a unique name.

If that was the case, you would have to make sure your function doesn't use the same
variable name inside it. It might be possible for small amount of code, but if you
are working with multiple modules and libraries with tens of thousands of lines of
code, things will quickly get out of hand. A variable naming nightmare!

### Nested Functions

***What are they, why are they, and most importantly how are they?***

### Updating Higher Scope Variables

If we think of scope as levels of access, highest level being the global and the
lowest the current local scope. In some cases you might want to access and update
a higher scope variable from a lower scope.

Python supports this functionality via `global` keyword. Let's modify `fun1` from
above so that it is able to update global `x`.

<div class="language-python highlighter-rouge">
<pre class="highlight"><script type="py-editor" worker>
x = 42

def fun1():
    global x

    x = 5
    print(f"x = {x}", "fun1")

print(f"x = {x}", "before")
fun1()
print(f"x = {x}", "after")
</script></pre></div>

Here `global x` declares `x` as a global variable and this allows `fun1` to update
the global `x`.

This might be unsafe in most of the cases as you are updating what all of your code
can access. You might end up *mutating* variables that you did not intend to update.

For cases when you don't need to update a global variable but still need access
to a higher level variable, Python uses `nonlocal` keyword.

<div class="prevnextlinks">
    <a id="previous" href="05">Previous: Functions</a>
    <a id="next" href="07">Next: Numerical Operations</a>
</div>
<script src="{{ '/assets/js/navigation.js' | relative_url }}" defer></script>

