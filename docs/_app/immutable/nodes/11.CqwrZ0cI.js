import{G as e,I as t,J as n,K as r,L as i,N as a,Y as o,a as s,n as c,x as l,y as u,z as d}from"../chunks/BJyiuK88.js";import"../chunks/Ci6wYkGF.js";import{t as f}from"../chunks/BzAisrpb.js";import{t as p}from"../chunks/UsLUVTBu.js";import{t as m}from"../chunks/B3nTlWl4.js";var h=l(`<p>Functions in programming allow reusing and logically organising programs into blocks of code or <em>modules</em>. We have already used <code>print</code>, <code>len</code>, <code>hasattr</code>, and <code>isinstance</code>, which are all examples of built-in Python functions.</p> <p>We have also used <em>methods</em>, <code>str</code>, <code>int</code>, <code>float</code>, and <code>type</code>. Method is a concept from object-oriented programming that refers to
	&quot;special&quot; functions that belong to specific objects or <em>classes</em> (of objects).</p> <p>In Python everything is an object (e.g., <code>str</code>, <code>int</code>, and <code>float</code> objects), including the functions. The functions have their own type, <code>function</code>.</p> <blockquote><p>We can&#39;t avoid using objects in Python. That said, object-oriented programming is optional
		in Python.</p></blockquote> <h3>Defining Functions</h3> <p>Python uses <code>def</code> keyword to <em>define</em> a function. You will need to provide a
	name, and optionally input <em>parameters</em> (a.k.a <em>arguments</em>). A function also must
	have a <em>body</em>, an indented block of code that runs each time you <em>call</em> the function.</p> <!> <p>To define an empty (template) function, that you plan to implement later, use <code>pass</code> keyword. You must <em>always</em> include <code>()</code> and <code>:</code> after
	the name of the function, even when you don&#39;t need to provide any input.</p> <!> <p>It is conventional to use <em>four spaces</em> or <em>one tab</em> for each level of indentation.
	Many text editors and <a href="https://en.wikipedia.org/wiki/Integrated_development_environment" target="_blank" rel="noopener">IDEs</a> allow setting dafault identation. Be consistent with the size and type (spaces or tabs) of indentation
	you use throughout your code. This is mainly for readability but also to avoid bugs due to inconsistent
	indentation.</p> <h3>Return Statement</h3> <p>The optional <code>return</code> statement <em>stops</em> the execution and returns the results of the
	function&#39;s computations up to that point.</p> <!> <ul><li>If we don&#39;t provide any variables to <code>return</code>, the function stops at the return
		statement and returns <code>None</code>.</li></ul> <!> <ul><li>If we completely omit the return statement, entire function body is executed, and once
		completed, the function returns <code>None</code>.</li></ul> <!> <h3>Multiparameter Functions</h3> <p>For many applications you would need more than one input parameter. E.g., a function <code>add(a, b)</code> with two inputs <code>a</code> and <code>b</code>. To define a function that accepts multiple input parameters, simply list the
	inputs in the function definition as a comma separated sequence.</p> <!> <!> <h3>Returning Multiple Values</h3> <p>Similarly, a function also can return multiple values by specifying multiple variables in the
	return statement.</p> <!> <!> <h3>args and kwargs</h3> <p>For the <em>positional</em> arguments, the value is defined by its position in the function definition.
	E.g., all the functions above used positional parameters. Python also allows defining default values
	for function arguments as key-value pairs. Key in this case refers to the variable name that your function
	uses inside its body.</p> <!> <p>In the above, <code>arg1</code> and <code>arg2</code> are positional arguments (<em>args</em>) and
	the rest are keyword arguments (<em>kwargs</em>) with default values.</p> <blockquote><p>In Python documentation, positional arguments are commonly called <code>args</code> and keyword
		arguments are called as <code>kwargs</code>.</p></blockquote> <!> <ul><li>The argument&#39;s value is inferred from its position if we don&#39;t provide the key for the
		argument.</li></ul> <!> <ul><li>You can also specify the name of the positional argument to provide values with their names
		inside the function.</li></ul> <!> <blockquote><p>Positional arguments must be provided before keyword arguments when defining and calling
		functions that use both positional and keyword arguments.</p></blockquote> <h3>Exercises</h3> <hr/> <p><strong>E1:</strong> Fix a Greeter Function.</p> <ul><li>Run the code. It should fail to run.</li> <li>Fix the code so that it prints <code>Hello, World!</code>.</li> <li>Set the <code>name</code> variable to your name as a <code>str</code> (using quotes or double quotes)
		then run the code again to print a geeting.</li></ul> <!> <hr/> <p><strong>E2:</strong> Complete the <code>vector_length</code> function.</p> <ul><li>Compute the <a href="https://mathworld.wolfram.com/L2-Norm.html" target="_blank" rel="noopener">Euclidean length or L2-norm</a> of a 3-dimensional vector by completing the function.</li> <li>You may find <a href="https://docs.python.org/3/library/math.html#math.sqrt" target="_blank" rel="noopener"><code>sqrt</code> function</a> useful for this. I have already <em>imported</em> it for you as a part of built-in <code>math</code> module. You can call it with <code>math.sqrt(...)</code> as shown below.</li></ul> <!> <blockquote><p><a href="https://docs.python.org/3/tutorial/modules.html" target="_blank" rel="noopener">Modules</a> are files with reusable code. E.g., you can write your own module as text file ending with <code>.py</code> with your functions and variables (a.k.a. Python file) and then import and reuse
		it in other parts of your code.</p></blockquote> <hr/> <p><strong>E3:</strong> Complete function <code>compute_l1_l2</code> below.</p> <ul><li>The function should return two values. First value must be the <a href="https://mathworld.wolfram.com/L1-Norm.html" target="_blank" rel="noopener">Manhattan length</a> <code>l1</code> and the second returned value must be the Euclidean length. Use predefined functions
		to compute L1 (Manhattan) and L2 (Euclidean) norms.</li></ul> <!> <ul><li>You are including function calls for <code>l1_norm</code> and <code>l2_norm</code> before Python
		is aware of them. Remembering that Python executes code sequentially, why doesn&#39;t this lead
		to an error? <em>Tip: function executes (runs) only when you call it.</em></li> <li>What is the sequence of calls when you run the code above?</li></ul> <hr/> <p><strong>E4:</strong> Function Objects</p> <p>As noted earlier on this page, Python treats functions as objects. You can check this using <code>type</code> method. Keeping this in mind, answer following question by running the code cell below.</p> <ul><li>What is the difference between <code>hi</code> and <code>hi()</code> below? Print statements are there
		to examine these objects by printing them to the console.</li></ul> <!> <blockquote><p>You don&#39;t need to use <code>print</code> to examine these commands in the <a target="_blank">Python shell</a>.</p></blockquote>`,1);function g(l,g){r(g,!1),c();var _=h(),v=d(i(_),12);f(v,{lang:`python`,code:String.raw`def FUNCTION_NAME(INPUT_ARGS):
    BODY
    return RESULTS`});var y=d(v,4);f(y,{lang:`python`,code:String.raw`def FUNCTION_NAME():
    pass`});var b=d(y,8);p(b,{code:String.raw`def add_five(number):
    return number + 5

result = add_five(10)
print(result)`});var x=d(b,4);p(x,{code:String.raw`def func1():
    x = 1
    return
    print(f'fun1 : x= {x}') # never executed

print(func1())`});var S=d(x,4);p(S,{code:String.raw`def func2():
    x = 1
    print(f'fun2 : x= {x}')

print(func2())`});var C=d(S,6);f(C,{lang:`python`,code:String.raw`def func(input1, input2, input3):
    pass`});var w=d(C,2);p(w,{code:String.raw`def add(a, b):
    res = a + b
    return res

result = add(5, 10)
print(result)`});var T=d(w,6);f(T,{lang:`python`,code:String.raw`def func():
    ...
    return result1, result2, ...`});var E=d(T,2);p(E,{code:String.raw`def numbers():
    return 1, 2, 3

a, b, c = numbers()

print(a)
print(b)
print(c)`});var D=d(E,6);f(D,{lang:`python`,code:String.raw`def func(arg1, arg2, value = 10.5, status = "active", on = True):
    ... `});var O=d(D,6);p(O,{code:String.raw`def decrease_val( curr, delta=5):
    return curr - delta

curr_T = 25
delta_T = 10

print(f"T : {curr_T}C")

print(f"new T={decrease_val(curr_T)}C (default)")

print(f"new T={decrease_val(curr_T, delta=delta_T)}C (kwarg)")`});var k=d(O,4);f(k,{lang:`python`,code:String.raw`new_T = decrease_val(25, 10)`});var A=d(k,4);f(A,{lang:`python`,code:String.raw`new_T = decrease_value(delta=10, current=25)`});var j=d(A,12);p(j,{code:String.raw`def greeter(name):
print(f"Hello, {name}!")

name = 'World'
greeter(name)`});var M=d(j,8);p(M,{code:String.raw`import math

def vector_length(x, y, z):
    # Don't edit above

    # math.sqrt( ? )

    #> Don't edit below
    return l

x1, x2, x3 = 4, 1, 8
l = vector_length(x1, x2, x3)

print(f"length of [{x1}, {x2}, {x3}] is {l}")`});var N=d(M,10);p(N,{code:String.raw`def compute_l1_l2(x, y, z):
    l1 = ? # l1-norm
    l2 = ? # l2-norm

    #> Don't edit below
    return l1, l2

def l2_norm(x, y, z):
    """Computes Euclidean length (norm)"""
    import math
    return math.sqrt(x*x + y*y + z*z)

def l1_norm(x, y, z):
    """Computes Manhattan length"""
    return abs(x) + abs(y) + abs(z)

def test(x, y, z):
    l1, l2 = compute_l1_l2(x, y, z)
    print(f"[{x:2},{y:2},{z:2}] -> L1: {l1 :4.2f}; L2: {l2 :4.2f}")

def main():
    test(1, -4, 8)
    test(1, 4, 8)
    test(-3, 5, 9)

main()`});var P=d(N,12);p(P,{code:String.raw`def hi():
    print("Hi!")

print(hi)
print(hi())`});var F=d(P,2),I=t(F),L=d(t(I),3);n(),o(I),o(F),a(e=>s(L,`href`,e),[()=>m(`terminal/`)]),u(l,_),e()}export{g as component};