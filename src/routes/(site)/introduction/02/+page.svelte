<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
	import { href } from '#lib/href.ts';
</script>

<LessonSection id="python-syntax">
	<h3>Python Syntax</h3>

	<p>
		<em>Syntax</em> in programming refers to the (programming) language rules. The syntax determines the
		structure and interpretation of the code when it runs. It may be easier to learn Python and its syntax
		by trying to run and breaking Python code instead of purely reading the documentation.
	</p>

	<p>Let&#39;s run (and break) some code...</p>
</LessonSection>

<LessonSection id="commenting-your-code">
	<h3>Commenting Your Code</h3>

	<p>
		Python uses <code>#</code> for single-line, and <code>&#39;&#39;&#39;...&#39;&#39;&#39;</code>
		or
		<code>&quot;&quot;&quot; ... &quot;&quot;&quot;</code>
		for multi-line comments. The latter are technically just unused text objects, As for
		<code>#</code>, any part of a line after <code>#</code> is completely ignored by the Python interpreter.
	</p>

	<PyCell
		code={String.raw`# This is a single line comment

'''
This is multi-line comment
everything between
the triple ' or triple " quotes
are ignored. E.g., this doesn't print

print(123)
'''

print(42) # prints 42, everything after '#' is a comment`}
	/>
</LessonSection>

<LessonSection id="arithmetic-operators">
	<h3>Arithmetic Operators</h3>

	<p>
		For some code examples, let&#39;s start with the basic arithmetics. Python uses the following
		operators to do basic arithmetics,
	</p>

	<ul>
		<li><code>+</code> : addition,</li>
		<li><code>-</code> : subtraction,</li>
		<li><code>*</code> : multiplication,</li>
		<li><code>/</code> : division.</li>
	</ul>

	<PyCell
		code={String.raw`print(10 + 5)
print(21 * 2)
print(22 / 7)`}
	/>

	<blockquote>
		<p>
			Feel free to edit the code cells. If you need to reset code to the default state, just reload
			the page.
		</p>
	</blockquote>

	<p>
		When you run your code, Python interprets the code <em>sequentially line-by-line</em>. Try
		switching the sequence, deleting, and adding print statements to the above to see the effect.
	</p>
</LessonSection>

<LessonSection id="floor-division-and-modulo-operators">
	<h3>Floor Division and Modulo Operators</h3>

	<p>In addition to these, Python also has <em>integer division</em> and modulo operators.</p>

	<ul>
		<li>
			<code>//</code> : floor or integer division. <code>a // b</code> divides <code>a</code> by
			<code>b</code>
			then returns <em>an integer part of the quotient</em>. This operation rounds down the result
			to the nearest whole number.
		</li>
	</ul>

	<PyCell code={String.raw`print(22 // 7)`} />

	<blockquote>
		<p>
			Note the absence of decimal point <code>.</code> that you get when using <code>/</code>, e.g.,
			<code>3.14..</code>.
		</p>
	</blockquote>

	<ul>
		<li><code>%</code> : modulo, <code>a % b</code> returns the remainder of the division.</li>
	</ul>

	<PyCell code={String.raw`print(22 % 7)`} />
</LessonSection>

<LessonSection id="operator-precedence">
	<h3>Operator Precedence</h3>

	<p>The order of the arithmetic operations follows the usual <em>operator precedence</em>:</p>

	<ol>
		<li>parantheses <code>(...)</code></li>
		<li>multiplication and division (<code>/</code> or <code>//</code>)</li>
		<li>addition and subtraction.</li>
	</ol>

	<PyCell
		code={String.raw`print((1 + 2)* 3)
print( 1 + 2 * 3)`}
	/>
</LessonSection>

<LessonSection id="practice-with-python-shell">
	<h3>Practice with Python Shell</h3>

	<p>
		Try the examples below in the <a href={href('terminal/')} target="_blank" data-sveltekit-reload
			>Python shell</a
		>.
	</p>

	<Code
		lang="python"
		code={String.raw`'''
Multiline
comment
'''

print(42)
# What happens when you enter numbers directly into the shell?
42

# Let's try out some arithmetic operations
22 % 7
22 // 7

(1 + 2) * 3`}
	/>

	<ul>
		<li>
			The shell displays a default <em>representation</em> of the commands&#39; outputs if you
			don&#39;t use <code>print</code>. The representation of an object (e.g., text), is more
			informative. That&#39;s what you get when you enter commands into the shell.
		</li>
		<li>
			The output of <code>print</code> is meant to be human-readable and formatted. This may hide some
			of the information about the object.
		</li>
	</ul>

	<blockquote>
		<p>
			Keep the terminal open when reading through the pages of this site to quickly try out
			different variations of the commands in the shell.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="fix-a-syntax-error">
	<h3>Fix a Syntax Error</h3>

	<p>
		Note that, compared to other programming languages, <em>indentation</em> is important in Python.
	</p>

	<ul>
		<li>Fix the error in the code so that it is able to run by correcting the indentation.</li>
	</ul>

	<PyCell
		code={String.raw`print(1 + 2)
  print(3 + 4)`}
	/>

	<blockquote>
		<p>
			In your browser the above won&#39;t run and might not display any errors. In Python,
			indentation defines a code block. We will revisit indentation in the coming sections.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="floor-division-with-negative-numbers">
	<h3>Floor Division with Negative Numbers</h3>

	<PyCell
		code={String.raw`print( -13 // 7  )
print(-(13 // 7) )`}
	/>

	<p>Apply <code>//</code> to negative numbers. How does floor division behave in this case?</p>

	<blockquote>
		<p>
			Tip: compare the results of floor division with the ones you get from the regular division
			operations <code>/</code>.
		</p>
	</blockquote>
</LessonSection>
