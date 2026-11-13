<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
	import { href } from '#lib/href.ts';
</script>

<LessonSection id="strings">
	<h3>String Literals</h3>

	<p>
		In Python, <em>strings</em> represent text objects. Python uses single and double quotes,
		<code>&#39;...&#39;</code> or <code>&quot;...&quot;</code>, to define a string. We have already
		used strings when printing greeting text in the introduction page.
	</p>

	<ul>
		<li><code>&quot;...&quot;</code> or <code>&#39;...&#39;</code>: a string object (text)</li>
	</ul>

	<PyCell
		code={String.raw`print('special order')
print("special order")`}
	/>

	<p>Strings can contain quotes and other special characters.</p>

	<PyCell
		code={String.raw`print("single quotes '...'")
print('double quotes "..."')
print('or include quotes \" and \' by escaping with \\ character')`}
	/>

	<p>
		For example, use <code>\n</code> to include the <em>new line</em> character. As its name
		suggests,
		<code>\n</code> creates new lines in text files and in the printed output. These types of
		characters that start with the backslash <code>\</code> are called
		<em>escape sequences</em>.
	</p>

	<PyCell code={String.raw`print('Priority One\nInsure the return of organism\nfor analysis.')`} />

	<blockquote>
		<p>
			Learn more about special characters and <em>escape sequences</em> such as <code>\n</code>
			(new line) from
			<a
				href="https://docs.python.org/3/reference/lexical_analysis.html#escape-sequences"
				target="_blank"
				rel="noopener">the official documentation</a
			>.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="multiline-strings">
	<h3>Multiline Strings</h3>

	<p>
		You can define multi-line strings with <code>&#39;&#39;&#39;...&#39;&#39;&#39;</code> or
		<code>&quot;&quot;&quot;...&quot;&quot;&quot;</code>. Multi-line strings defined in this way
		will retain their indentations and lines.
	</p>

	<PyCell
		code={String.raw`print("""Priority One
Insure the return of organism
for analysis.""")`}
	/>
</LessonSection>

<LessonSection id="raw-strings">
	<h3>Raw Strings</h3>

	<p>
		Sometimes you want Python to <em>not</em> interpret an escape sequence. E.g., you may want to
		keep
		<code>\n</code>
		as regular characters <code>\</code> and <code>n</code>. For this, create a <em>raw</em> string
		by prefixing <code>r</code> to the string.
	</p>

	<PyCell
		code={String.raw`print(r"These characters \n are on the same line")
print(r'\t is a tab and \n is a newline sequence')`}
	/>

	<ul>
		<li>
			Raw strings produce regular strings without needing to escape the backslash <code>\</code>
			when defining a string
		</li>
		<li>
			Run the print commands with and without the
			<code>r</code> prefix to see the differences between raw and regular Python strings.
		</li>
	</ul>

	<PyCell
		code={String.raw`print(r"These are the same two strings\n")
print("These are the same two strings\\n")`}
	/>
</LessonSection>

<LessonSection id="string-concatenation-and-length">
	<h3>String Concatenation and Length</h3>

	<p>You can concatenate (join) multiple strings together using <code>+</code>.</p>

	<ul>
		<li>
			<code>string1 + string2 + ...</code> : produces a new string that is composed of the strings,
			<code>string1</code>, <code>string2</code>, etc. joined together
		</li>
	</ul>

	<PyCell code={String.raw`print("Weyland-" + "Yutani " + "Corporation")`} />

	<p>
		Use the <code>len</code> function to get the length of a string, the number of characters in it.
	</p>

	<ul>
		<li><code>len(string)</code>: returns the length of the input string</li>
	</ul>

	<PyCell code={String.raw`print(len("cargo"))`} />
</LessonSection>

<LessonSection id="f-strings">
	<h3>F-Strings</h3>

	<blockquote>
		<p>
			<a
				href="https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals"
				target="_blank"
				rel="noopener">Formatted string literals</a
			>
		</p>
	</blockquote>

	<p>
		Formatted strings, f-strings for short, allow you to include the value of a Python expression in
		a string and format it. To define an f-string, use <code>f</code> or <code>F</code> prefix and
		insert Python expressions as placeholders in curly braces
		<code>&#123;expression&#125;</code>.
	</p>

	<ul>
		<li>
			<code>f&#39;... &#123;expression&#125;&#39;</code>: f-string evaluates the expression inside
			<code>&#123;...&#125;</code> first. Then, the result is converted to its string representation.
		</li>
	</ul>

	<p>
		For instance, the following evaluates an addition and prints the result as a formatted string.
	</p>

	<PyCell code={String.raw`print(f"The new route takes {8 + 10} months to reach Earth.")`} />

	<p>
		You are not limited to simple expressions like the one above, and you can use any valid Python
		expression inside the placeholders. E.g., in the code below, we call the <code>len</code>
		function.
	</p>

	<PyCell code={String.raw`print(f"Word 'Alien' is {len("Alien")} characters long.")`} />
</LessonSection>

<LessonSection id="debug-a-syntax-error">
	<h3>Debug a Syntax Error</h3>

	<ul>
		<li>Oh no! I broke Python. Fix the following code so that it prints two lines.</li>
	</ul>

	<PyCell code={String.raw`print("Neo: 'I know kung-fu'\nMorpheus: 'Show me'')`} />
</LessonSection>

<LessonSection id="string-representation">
	<h3>String Representation</h3>

	<ul>
		<li>
			Run the following multiline string in the
			<a href={href('terminal/')} target="_blank" data-sveltekit-reload>Python shell</a>.
		</li>
		<li>
			How does the <em>representation</em> of this string differ from what you&#39;ve entered?
		</li>
	</ul>

	<Code
		lang="python"
		code={String.raw`"""Priority One
Insure the return of organism
for analysis."""`}
	/>

	<blockquote>
		<p>
			You can also use the built-in <code>repr</code> function with <code>print</code> to print the
			object&#39;s representation in Python. E.g., <code>print(repr(...))</code>.
		</p>
	</blockquote>

	<PyCell
		code={String.raw`print(repr("""Priority One
Insure the return of organism
for analysis."""))`}
	/>
</LessonSection>
