<script lang="ts">
	import { page } from '$app/state';
	import PyCell from '#lib/components/PyCell.svelte';
	import { introductionSteps as steps } from '#lib/nav.ts';

	const active = $derived(
		Math.max(
			0,
			steps.findIndex((step) => `#${step.id}` === page.url.hash),
		),
	);
</script>

<!-- Keep sections mounted so code edits and output survive navigation between steps. -->
<section id="python" hidden={active !== 0} aria-label="Python">
	<p>
		Python is a general-purpose programming language designed for readability, flexibility, and fast
		development. Its wide range of applications, robust community support, and simplicity make it
		popular among both beginners and experienced programmers.
	</p>

	<p>
		Python boasts a vast ecosystem of libraries, frameworks, and packages that expand its
		capabilities for diverse tasks. These domains include, but are not limited to:
	</p>

	<ul>
		<li>
			<strong>Web development</strong>: With tools like Flask and Django, Python powers websites and
			web applications.
		</li>
		<li>
			<strong>Automation and scripting</strong>: Python automates repetitive tasks, such as renaming
			files, sending emails, data entry, and more.
		</li>
		<li>
			<strong>Deep learning and artificial intelligence</strong>: Deep learning frameworks like
			PyTorch and TensorFlow are used to create and train models that learn to identify objects in
			images, to predict trends, or for building intelligent chatbots.
		</li>
		<li>
			<strong>Data analysis</strong>: Using libraries like pandas, Python helps analyse data to
			uncover insights.
		</li>
		<li>
			<strong>Scientific computing</strong>: Python was created to support scientific and
			mathematical computations. With tools like NumPy, you can simulate physical systems, or
			analyse experimental data.
		</li>
	</ul>

	<blockquote>
		<p>
			You can find out more about Python from
			<a href="https://www.python.org/" target="_blank" rel="noopener">www.python.org</a>.
		</p>
	</blockquote>
</section>

<section id="workshop" hidden={active !== 1} aria-labelledby="workshop-title">
	<h2 id="workshop-title">About This Workshop</h2>

	<p>
		This workshop session will mainly focus on the Python language and its built-in features. We
		will not cover any external modules such as scientific packages and leave it to the future
		workshops.
	</p>

	<p>
		The workshop aims to provide participants with a solid foundation in Python programming and
		achieve the following:
	</p>

	<ul>
		<li><strong>Have Fun Coding</strong>: Roll up our sleeves and have fun writing Python code.</li>
		<li>
			<strong>Understand Core Python Concepts</strong>: Learn fundamental programming concepts, such
			as, variables, data types, etc., and operations on these types which will enable us to write
			simple Python programs.
		</li>
		<li>
			<strong>Explore Functions</strong>: Learn to define and use functions to organise our code
			effectively and learn reusable and <em>modular</em> programs.
		</li>
		<li>
			<strong>Master Control Structures</strong>: Learn the use of loops and conditionals which will
			allow us to control the logical flow of our programs.
		</li>
		<li>
			<strong>Build Confidence in Programming</strong>: Focus on writing and reading the code. We
			will not install any tools on our laptops and instead use our browsers (e.g., Google Chrome,
			Edge, Firefox etc.) to experiment with and explore Python.
		</li>
	</ul>

	<p>
		Another important goal of this workshop is to foster a beginner-friendly community and an
		environment that encourages curiosity and experimentation, empowering participants to continue
		exploring Python independently.
	</p>
</section>

<section id="code-example" hidden={active !== 2} aria-labelledby="code-example-title">
	<h2 id="code-example-title">A Code Example</h2>

	<p>
		As an example, let&#39;s use Python&#39;s <code>print</code> function. It takes an input which
		is everything inside its enclosing parentheses <code>(...)</code>, and prints this out to the
		<em>console</em>.
	</p>

	<ul>
		<li><code>print(input)</code> : prints the text representation of the input to the console.</li>
	</ul>

	<blockquote>
		<p>
			Console in programming refers to an interface for interacting with a computer program. E.g.,
			the code cell below.
		</p>
	</blockquote>

	<p>
		Generally, it is used to display output of a program. We will use <code>print</code>
		throughout this workshop to examine and debug our code.
	</p>

	<ul>
		<li>Run the following code to print a text with <code>Hello there!</code> to the console.</li>
	</ul>

	<PyCell code={String.raw`print("Hello there!")`} />

	<blockquote>
		<p>Hover over the code and click the run button.</p>
	</blockquote>
</section>

<section id="exercise" hidden={active !== 3} aria-labelledby="exercise-title">
	<h2 id="exercise-title">Exercises</h2>

	<p>
		<strong>E1:</strong> Edit the following code to print a greeting by replacing the question mark
		<code>?</code> with your name. The code should greet you when you run it.
	</p>

	<PyCell code={String.raw`print("Hello, ?")`} />

	<blockquote>
		<p>
			Feel free to modify the code. If you make a mistake, click the reset button to reload the
			original code.
		</p>
	</blockquote>
</section>

<section id="standard-library" hidden={active !== 4} aria-labelledby="standard-library-title">
	<h2 id="standard-library-title">The Python Standard Library</h2>
	<p>
		Python comes with an assortment of built-in features and tools in the form of its standard
		library. In this workshop session, we will discuss some of the most frequently used features and
		functions of <em>the Python Standard Library</em>.
	</p>
	<p>
		Keep <a href="https://docs.python.org/3/library/index.html" target="_blank" rel="noopener"
			>docs.python.org</a
		>, the official Python Standard Library documentation handy when getting started on your Python
		journey. This resource offers explanations and usage examples of the built-in functions and
		tools. Referring to the documentation may help you understand and use Python more effectively.
	</p>
</section>
