import{L as e,x as t,y as n,z as r}from"../chunks/BJyiuK88.js";import"../chunks/Ci6wYkGF.js";import{t as i}from"../chunks/UsLUVTBu.js";var a=t(`<p>Let&#39;s run the following code and observe what happens.</p> <!> <p>You must be wondering, why is the value of <code>x</code> different in these two functions, and
	why we could not update the value inside <code>fun1</code>.</p> <p>This is all due to variable&#39;s <em>scope</em>. Scope defines where the variable is accessible
	or &quot;visible&quot; and where we can update it.</p> <h3>Global vs Local Scope</h3> <p>If the variable is accessible from all parts of our program we say that it is in the <em>global scope</em> and the variable is a <em>global variable</em>.</p> <p>Above, we set <code>x=42</code> in the global scope and all parts of your code (e.g., <code>fun1</code> and <code>fun2</code>) can access this variable. That is why the value of <code>x</code> is 42
	inside the <code>fun2</code> function.</p> <p>On the other hand, <code>fun1</code> defined <code>x</code> internally as a <em>local variable</em> in its own <em>local scope</em>. Only <code>fun1</code> is able to access this local variable. Once
	you define (or re-define) a variable inside a local scope that variable is declared as a local variable.</p> <ul><li>Try reversing order of <code>x = 5</code> and the <code>print</code> statement inside <code>fun1</code>. You will get an error, as <code>print</code> is trying to access yet
		undefined local <code>x</code>.</li></ul> <blockquote><p>Every function has its own local scope, also known as a <strong>function scope</strong>. Scope
		is what makes functions and other objects in Python reusable blocks of code. Think about this
		for a moment. What happens if functions didn&#39;t have local scope? Every variable would have
		to have a unique name.<br/><br/> If that was the case, you would have to make sure your function doesn&#39;t use the same variable
		name inside it. It might be possible for small amount of code, but if you are working with multiple
		modules and libraries with tens of thousands of lines of code, things will quickly get out of hand.
		A variable naming nightmare!</p></blockquote> <h3>Nested Functions</h3> <p>Scope also applies to functions. If you define a <em>nested function</em>, a function defined
	inside another function, only the enclosing (function) scope has access to this nested function.
	Let&#39;s see it in an example.</p> <!> <p>Notes on nested functions:</p> <ul><li>Nested function <code>fahrenheit</code> has access to the enclosing scope of <code>set_temperature</code> function. See how <code>value</code> is used from within the <code>fahrenheit</code>.</li> <li>The nested functions can be accessed only within the enclosing scope of the function <code>set_temperature</code>.</li></ul> <h3>Updating Variables Outside the Scope</h3> <p>In some cases you might want to access and update a global variable from inside a function scope.
	Python supports this functionality via <code>global</code> keyword. Let&#39;s modify <code>fun1</code> from above so that it is able to update global <code>x</code>.</p> <!> <p>Here <code>global x</code> declares <code>x</code> as a global variable and <code>fun1</code> does
	not create a new local variable and instead uses <code>x</code> from the global scope.</p> <p>This might be unsafe in most of the cases as you are updating what all of your code can access.
	You might end up <em>mutating</em> variables that you did not intend to update.</p> <p>For cases when you don&#39;t need to update a global variable but still need access to a higher
	level variable, Python provides <code>nonlocal</code> keyword. You can update enclosing scope
	variables by declaring them as <code>nonlocal</code>, e.g., you can update an enclosing
	function&#39;s variable from inside a nested function.</p> <p>This is useful for cases when you need a function with a state or memory. For instance, you want
	to keep track of time inside you simulation. To do this, you could use a nested function with <code>nonlocal</code> variable as shown in the code below.</p> <!> <p>The <code>t</code> variable updates with every call of the <code>timer</code> function. E.g., you
	could feed the <code>timer</code> as an input to another function and keep updating <code>t</code>. The state of the function <code>timer</code> can&#39;t be updated from outside
	except by calling it and this protects <code>t</code> from unintendent modifications.</p> <h3>Exercises</h3> <hr/> <p><strong>E1:</strong> Timer with Customisable Step Size</p> <ul><li>Modify the code below to allow for a customisable step size <code>delta</code> when creating <code>timer</code>. Replace the fixed <code>0.25</code> in the update step with <code>delta</code>. Use <code>1</code> as the default value.</li> <li>Test your code by running it with different <code>delta</code> values.</li></ul> <!>`,1);function o(t){var o=a(),s=r(e(o),2);i(s,{code:String.raw`def fun1():
    x = 5
    print(f"x = {x} fun1")

def fun2():
    print(f"x = {x} fun2")

x = 42

print(f"x = {x} before")
fun1()
print(f"x = {x} after")

print('-'*10) # prints dashes '-'

print(f"x = {x} before")
fun2()
print(f"x = {x} after")`});var c=r(s,22);i(c,{code:String.raw`def set_temperature(value):
    def fahrenheit():
        return value * 9/5 + 32

    def format(t, symbol):
        return f"{t}°{symbol}"

    T_C = format(value, "C")
    T_F = format(fahrenheit(), "F")

    print(f"Temperature is set to {T_C} ({T_F})")

set_temperature(25)
set_temperature(0)
set_temperature(-5)`});var l=r(c,10);i(l,{code:String.raw`def fun1():
    global x
    x = 5
    print(f"x = {x} inside fun1")

x = 42

print(f"x = {x} before")
fun1() # this call updates x
print(f"x = {x} after")`});var u=r(l,10);i(u,{code:String.raw`def get_timer(start=0):
    t = start # keep track of time

    def step():
        nonlocal t
        t = t + 0.25 # update time
        return t

    return step

timer = get_timer()
print("simulation starting; t=", 0)

t_sec = timer()
print("simulation step 1: t=", t_sec)
t_sec = timer()
print("simulation step 2: t=", t_sec)
t_sec = timer()
print("simulation step 3: t=", t_sec)`});var d=r(u,12);i(d,{code:String.raw`def get_timer( ? ):
    t = start # keep track of time

    def step():
        nonlocal t
        t = ? # update time
        return t

    return step

timer = get_timer(start=5, delta=0.1)
print("simulation starting; t=", 0)

#> Don't edit below
t_sec = timer()
print(f'simulation step 1: t= {t_sec:.2f}')
t_sec = timer()
print(f'simulation step 2: t= {t_sec:.2f}')
t_sec = timer()
print(f'simulation step 3: t= {t_sec:.2f}')`}),n(t,o)}export{o as component};