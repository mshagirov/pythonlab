<script lang="ts">
	import Code from '#lib/components/Code.svelte';
</script>

<h3>Project Folder Organisation</h3>

<blockquote>
	<p>
		Please create <code>~/workplace/pythonlab/lab1/dna-analyser</code> if you haven&#39;t already done
		so.
	</p>
</blockquote>

<p>
	<code>workspace/pythonlab/</code> will house all the projects that you will write in this and
	future labs. Inside it, we will create directories for each lab, and each lab folder will contain
	all the projects for that given lab. You are welcome to continue using <code>workspace</code> for your
	future projects.
</p>

<blockquote>
	<p>
		I saw this structure from <a
			href="https://blog.boot.dev/misc/how-i-organize-my-local-development-environment/"
			target="_blank"
			rel="noopener">Lane Wagner (boot.dev)</a
		>
		and have adopted it in my own workflow.
	</p>
</blockquote>

<h3>Entry Point for Your Program : <code>main.py</code></h3>

<ol>
	<li>Open <code>~/workplace/pythonlab/lab1/dna-analyser</code> as a folder in VS Code.</li>
	<li>
		Create and open a new python file in the <code>dna-analyser</code>. Name the file
		<code>main.py</code>. A Python file is just a text file with a name ending with
		<code>.py</code>.
	</li>
	<li>Open <code>main.py</code> in VS Code.</li>
</ol>

<blockquote>
	<p>
		<code>main.py</code> will be an <em>entry point</em> for our program. The name
		<code>main.py</code>
		is a conventional name given to the &quot;main&quot; file in your program that you run to use your
		program. Naming your main file <code>main.py</code> is not a requirement. Nevertheless, it is more
		convenient for organising our code by giving us a clear place to start reading our code in the future.
	</p>
</blockquote>

<p>Copy the following into <code>main.py</code>:</p>

<Code lang="python" code={String.raw`print("Hello from DNA Analyser!")`} />

<p>
	Then run the following from the VS Code terminal (make sure your current working directory is the
	same as the location of the <code>main.py</code>, i.e.<code
		>~/workspace/pythonlab/lab1/dna-analyser</code
	>.
</p>

<Code lang="bash" code={String.raw`python3 main.py`} />

<blockquote>
	<p>
		In the above we are &quot;telling&quot; Python interpreter to run our <code>main.py</code> code.
	</p>
</blockquote>

<p>Congratulations, you have written your first Python program on your machine!🐍</p>

<h3>Shebang Line</h3>

<p>
	Another convenient way to run Python programs in Unix-like systems (Linux, MacOS) is by adding a <em
		>shebang</em
	>
	(<code>#!</code>) line on top of the file as shown below.
</p>

<Code
	lang="python"
	code={String.raw`#!/usr/bin/env python3

print("Hello from DNA Analyser!")`}
/>

<ul>
	<li><p>Add the Python shebang as the very first line to <code>main.py</code>.</p></li>
	<li>
		<p>
			Change <code>main.py</code> to be executable using <code>chmod +x</code> (this modifies file permissions
			to executable or &quot;runnable&quot; file):
		</p>
		<Code lang="bash" code={String.raw`chmod +x main.py`} />
	</li>
	<li>
		<p>Then run the following in the terminal:</p>
		<Code lang="bash" code={String.raw`./main.py`} />
	</li>
</ul>

<p>
	You should see your program run as usual. This time we did it without explicitly calling the
	Python interpreter. The line with <code>#!</code> takes care of calling the interpreter when we run
	the program.
</p>

<p>
	Note the <code>./</code> in front of the file name. Here, we need to specify that the
	<em>command</em> <code>main.py</code> is in the current directory as our system is not aware of its
	location.
</p>

<blockquote>
	<p>
		To run commands without specifying their path, you need to add its directory (location) to the <a
			href="https://en.wikipedia.org/wiki/PATH_(variable)"
			target="_blank"
			rel="noopener"><code>PATH</code> environment variable</a
		>.
	</p>
</blockquote>

<p>
	Going forward you may run <code>main.py</code> either by directly <em>calling</em> it or using
	<code>python3 main.py</code>.
</p>
