import{G as e,I as t,J as n,K as r,L as i,N as a,Y as o,a as s,n as c,x as l,y as u,z as d}from"../chunks/BJyiuK88.js";import"../chunks/Ci6wYkGF.js";import{t as f}from"../chunks/BzAisrpb.js";import{t as p}from"../chunks/UsLUVTBu.js";import{t as m}from"../chunks/B3nTlWl4.js";var h=l(`<h3>Exceptions</h3> <p>Errors in Python are called <em>exceptions</em>. For example, syntax error is a special type of
	exception where the code&#39;s syntax is wrong, such as, forgetting <code>:</code> after <code>if</code> statement. You might even get errors when your code is
	syntactically correct. These are other types of <em>exceptions</em>.</p> <table><thead><tr><th align="center">Syntax Error</th><th align="center">Exceptions</th></tr></thead><tbody><tr><td align="center">No &quot;:&quot; after <code>if</code> statement</td><td align="center">Division by zero <code>2 / 0</code></td></tr><tr><td align="center">Mismatched brackets <code>[ ... )</code></td><td align="center">Type errors <code>2 + &quot;Hello&quot;</code></td></tr><tr><td align="center">Incorrect indentation</td><td align="center">Using an undefined object</td></tr><tr><td align="center">...</td><td align="center">...</td></tr></tbody></table> <p>You have likely already seen some of these errors in the Python shell or in the code cells if your
	browser supports error messages.</p> <p>E.g., entering <code>print(2/0)</code> in the <a target="_blank">Python shell</a> will produce</p> <!> <p>All error messages follow a similar format. Error message lists the location and a code snipped
	where the error happened together with the type of the error (e.g., <code>ZeroDivisionError</code>).</p> <h3>Do You Need to Memorise Errors?</h3> <p>You don&#39;t have to memorise the exceptions and syntax errors. However, conceptual understanding
	of syntax rules, and common errors, and their messages will help you resolve most of the issues
	you face when writing code. <em>You will naturally encounter and learn to recognise common errors as you gain more experience
		in Python.</em></p> <h3>Handling Exceptions</h3> <p>Errors disrupt the normal flow of the running program. When they occur the interpreter <em>raises an exception</em>. Python provides exception handling with <code>try-except</code> block. This allows managing the errors to prevent the program from crashing.</p> <!> <ul><li><p><code>try</code> block encloses the code that might raise exceptions, e.g., a code that reads files
			or a user input.</p></li> <li><p><code>except</code> block catches the exception that matches a given <code>ExceptionType</code> exception (error) type, e.g., <code>ValueError</code>, <code>ZeroDivisionError</code>, <code>KeyError</code>, etc.</p></li> <li><p>You can use <code>Exception</code> type to cover <em>all</em> built-in exceptions except <code>SystemExit</code>.</p></li></ul> <blockquote><p><code>SystemExit</code> exception signals the Python interpreter to terminate. See the <a href="https://docs.python.org/3/library/exceptions.html" target="_blank" rel="noopener">exceptions documentation</a> to find out more about exceptions.</p></blockquote> <ul><li><code>as</code> keyword assigns the caught exception to the variable <code>e</code>.</li> <li>You can also stack <code>except</code> blocks to handle multiple exceptions.</li></ul> <!> <blockquote><p>It is not necessary to call the error as <code>e</code> and you can use any valid name or omit
		the <code>as e</code> part altogether. If you omit the name, you need to refer to the exception
		using the class name of the exception (type, e.g., <code>ZeroDivisionError</code>).</p></blockquote> <!> <h3>Raising Exceptions</h3> <p>Python also allows you to force a specified exception with the <code>raise</code> statement.</p> <!> <p>You can use <code>raise</code> with an exception with a custom message to force your own exceptions.</p> <blockquote><p>All exceptions accept an optional message string, <code>ExceptionType(msg)</code>. The message
		is displayed when the error is encountered.</p></blockquote> <!> <p>Forcing exception might seem counterintuitive. You might be wondering why would anyone need a way
	to raise errors. You have to keep in mind that not all programs run in isolation, and programs
	might interact with files, users, or communicate with other machines. In this circumstances a
	program is expected to encounter errors.</p> <h3>Assertions</h3> <p>Catching errors to gracefully handle, or intentionally raising them provides an additional way to
	control your program. This also can be used to explicitly incorporate programmer&#39;s assumptions
	into the code. E.g., you might want to force a function to accept only a certain image size or
	format.</p> <p>For convenience, Python also provides an <code>assert</code> statement in addition to the <code>raise</code>. Assertions are a convenient way to quickly include assumptions about a program
	in a single line of code.</p> <!> <p><code>AssertionError</code> is raised if the <code>condition</code> is <code>False</code>. You can
	also include a message string after the condition to describe your error.</p> <!> <p>E.g., in the below code cell <code>div(a, b)</code> runs only when <code>b</code> is non-zero.</p> <!>`,1);function g(l,g){r(g,!1),c();var _=h(),v=d(i(_),8),y=d(t(v),3);n(),o(v);var b=d(v,2);f(b,{lang:`python`,code:String.raw`>>> print(2 / 0)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
ZeroDivisionError: division by zero`});var x=d(b,12);f(x,{lang:`python`,code:String.raw`try:
    # code that might raise an exception
except ExceptionType as e:
    # catch ExceptionType errors
    # ${"`"}e${"`"} represents the error`});var S=d(x,8);f(S,{lang:`python`,code:String.raw`try:
    # code that might raise an exception
except ExceptionType as e:
    # catch ExceptionType errors
except AnotherExceptionType as e:
    # catch AnotherExceptionType`});var C=d(S,4);p(C,{code:String.raw`try:
    print(42 / 0)
except ZeroDivisionError as error:
    print(f'{type(error)}: {error}')`});var w=d(C,6);f(w,{lang:`python`,code:String.raw`raise ExceptionType`});var T=d(w,6);p(T,{code:String.raw`def check(x):
    if x < 42:
        raise ValueError("The value is too low!")

try:
    check(10)
except ZeroDivisionError as e:
    # this code is not triggered
    print(f'{type(e)}: {e}')
except Exception as e:
    print(f'{type(e)}: {e}')`});var E=d(T,10);f(E,{lang:`python`,code:String.raw`assert condition`});var D=d(E,4);f(D,{lang:`python`,code:String.raw`assert condition, msg`});var O=d(D,4);p(O,{code:String.raw`def div(a, b):
    assert b != 0, "Divisor can't be zero!"
    print( a / b )

try:
    div(42, 0)
except Exception as e:
    print(f'{type(e)}: {e}')`}),a(e=>s(y,`href`,e),[()=>m(`terminal/`)]),u(l,_),e()}export{g as component};