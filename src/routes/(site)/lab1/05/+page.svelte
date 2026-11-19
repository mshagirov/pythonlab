<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="create-project">
	<h3>Create dna-analyser Project</h3>

	<ul>
		<li>
			<p>In Zed's terminal, switch to your lab folder:</p>
			<Code lang="bash" code={String.raw`cd ~/workspace/pythonlab/lab1`} />
		</li>
		<li>
			<p>
				Inside <code>~/workspace/pythonlab/lab1/</code>, use uv to create and set up the project
				folder automatically. Run these commands in Zed's terminal:
			</p>

			<Code
				lang="bash"
				code={String.raw`uv init --no-package dna-analyser
cd dna-analyser`}
			/>

			<blockquote>
				<p>
					You can create <code>dna-analyser</code> inside <code>~/workspace/pythonlab/lab1/</code>
					manually with <code>mkdir</code> and add <code>main.py</code> and
					<code>pyproject.toml</code> as before, or let uv set up the project for you.
				</p>
			</blockquote>
		</li>
		<li>
			Open <code>dna-analyser</code> as your project folder in Zed, then open
			<code>main.py</code> and run it in two ways: press <kbd>Cmd+Option+R</kbd> on macOS or
			<kbd>Ctrl+Shift+R</kbd> on Linux and Windows (including when connected to WSL), then run
			<code>uv run main.py</code> in the terminal. Verify that both run and print the same thing.
		</li>
	</ul>

	<details>
		<summary>More on uv init</summary>

		<p>
			Besides <code>main.py</code>, <code>uv init --no-package dna-analyser</code> sets up a few
			other useful things in the new <code>dna-analyser</code> folder:
		</p>

		<ul>
			<li>
				<code>pyproject.toml</code>: the project's settings, such as its name, version, required
				Python version and dependencies.
			</li>
			<li>
				<code>.python-version</code>: the Python version uv uses for this project.
			</li>
			<li>
				<code>.git/</code>: a new Git repository, so you can track changes to your code. uv skips
				this if the folder is already inside a Git repository.
			</li>
			<li>
				<code>.gitignore</code>: a list of files Git should ignore, such as the virtual environment.
			</li>
			<li>
				<code>README.md</code>: an empty file for describing your project.
			</li>
		</ul>

		<p>
			With the <code>--no-package</code> option, uv creates a simple project with a
			<code>main.py</code>
			file, which is what we use in this lab. Without it, uv sets the project up as an installable package
			and puts the code in
			<code>src/dna_analyser/__init__.py</code>
			instead of <code>main.py</code>.
			<a href="https://docs.astral.sh/uv/guides/projects/" target="_blank" rel="noopener"
				>This is the recommended setup for larger projects</a
			>, as the
			<code>src/</code> layout helps to catch packaging mistakes early.
		</p>
	</details>
</LessonSection>

<LessonSection id="main-function">
	<h3><code>main()</code> Function</h3>

	<p>
		When you ran <code>uv run main.py</code>, it printed
		<code>Hello from dna-analyser!</code>. This is the <code>main.py</code> that
		<code>uv init</code> created:
	</p>

	<Code
		lang="python"
		code={String.raw`def main():
    print("Hello from dna-analyser!")


if __name__ == "__main__":
    main()`}
	/>

	<p>
		The file defines a function called <code>main</code> and calls it at the bottom. Putting the
		program's top-level steps in one <code>main</code> function makes it easy to see where the program
		starts and what it does, while the details live in other functions.
	</p>

	<ul>
		<li>
			The <code>if __name__ == "__main__":</code> line decides whether <code>main()</code> runs.
		</li>
		<li>
			Python sets the special variable <code>__name__</code> to <code>"__main__"</code> in the file you
			run directly.
		</li>
		<li>
			When another file imports <code>main.py</code> with <code>import main</code>,
			<code>__name__</code> is <code>"main"</code> instead, so the functions are defined but
			<code>main()</code> does not run.
		</li>
	</ul>

	<p>
		<strong
			>Change the message in <code>main.py</code>, save the file and run
			<code>uv run main.py</code> again.</strong
		>
	</p>

	<blockquote>
		<p>
			To explore how <code>__name__</code> works, add the following line to <code>main.py</code> and compare
			its output when you run the file directly (and when you import it from another file in the coming
			sections):
		</p>

		<Code lang="python" code={String.raw`print(__name__)`} />
	</blockquote>
</LessonSection>

<LessonSection id="reading-files">
	<h3>Reading Files</h3>

	<details open>
		<summary>Example Text File</summary>

		<p>
			In Zed, create a folder called <code>examples</code> inside <code>dna-analyser</code>, and in
			it a file called <code>BGH-R.pri</code> with these contents:
		</p>

		<Code
			lang="text"
			code={String.raw`# Bovine growth hormone terminator; Reverse
TAGAAGGCACAGTCGAGG`}
		/>
	</details>

	<details open>
		<summary>Read examples/BGH-R.pri</summary>

		<ul>
			<li>
				Edit the <code>main</code> function in <code>main.py</code> to read and print the contents
				of <code>examples/BGH-R.pri</code>. Use Python's <code>open()</code>.
				<code>open('examples/BGH-R.pri')</code> returns a file object and it is good practice to use
				the <code>with</code> keyword when dealing with
				<a
					href="https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files"
					target="_blank"
					rel="noopener">file objects</a
				>. E.g. the following reads the entire contents of the file,

				<Code
					lang="python"
					code={String.raw`with open('examples/BGH-R.pri', 'r') as f:
    content = f.read()`}
				/>
			</li>
		</ul>

		<blockquote>
			<p>
				In <code>open('examples/BGH-R.pri', 'r')</code>, the first argument is the path to the file
				and the second is the mode, which says what you want to do with it:
			</p>
			<ul>
				<li><code>'r'</code>: read the file (the default if you leave out the mode).</li>
				<li>
					<code>'w'</code>: write to the file. It creates the file, or empties it first if it
					already exists.
				</li>
				<li>
					<code>'a'</code>: append, that is, write to the end of the file and keep what is there.
				</li>
				<li>
					<code>'b'</code>: binary, combined with one of the others, such as <code>'rb'</code>. Use
					it for files that are not text, such as images; you get bytes instead of strings.
					<code>'b'</code> on its own, without <code>'r'</code>, <code>'w'</code> or
					<code>'a'</code>, raises a <code>ValueError</code>, so write <code>'rb'</code> rather than
					just <code>'b'</code>.
				</li>
			</ul>
		</blockquote>

		<ul>
			<li>
				Modify <code>main()</code> in <code>main.py</code> to print the file contents after reading
				them. Save the file and run <code>uv run main.py</code> to check that it prints the contents
				of <code>examples/BGH-R.pri</code>.
			</li>
		</ul>
	</details>

	<details>
		<summary>Optional: Writing Files</summary>

		<p>
			In addition to <code>read()</code>, the file object also has a <code>write()</code> method.
			Open the file in <code>'w'</code> (or <code>'a'</code>) mode and pass it the text to write:
		</p>

		<Code
			lang="python"
			code={String.raw`with open('examples/T3.pri', 'w') as f:
    f.write('# T3 promoter; Forward\n')
    f.write('GCAATTAACCCTCACTAAAGG\n')`}
		/>

		<p>
			<code>write()</code> does not add a newline for you, so end each line with <code>\n</code>.
		</p>
	</details>

	<details>
		<summary>Optional: Closing Files</summary>

		<p>
			An open file should be closed with <code>f.close()</code> when you are done with it. Closing
			frees the file for other programs and makes sure everything you wrote is saved to disk.
			Without
			<code>with</code>, you have to call it yourself:
		</p>

		<Code
			lang="python"
			code={String.raw`f = open('examples/BGH-R.pri', 'r')
content = f.read()
f.close()`}
		/>

		<p>
			We did not need <code>f.close()</code> above because the <code>with</code> block closes the file
			automatically when the indented block ends, even if an error happens inside it.
		</p>
	</details>
</LessonSection>

<LessonSection id="importing-modules">
	<h3>Reader Module</h3>

	<p>
		Let's turn the file-reading code into a reusable function, then move it into its own module. A
		module is a Python file whose code you can import into another Python file.
	</p>

	<ol>
		<li>
			<p>
				In <code>main.py</code>, define a function called <code>read_file(file_path)</code> above
				<code>main()</code>. Move the <code>with open(...)</code> block from <code>main()</code>
				into this function, using <code>file_path</code> instead of the fixed file path:
			</p>

			<Code
				lang="python"
				code={String.raw`def read_file(file_path):
    # Return the file contents as a string.`}
			/>

			<p>
				Replace the comment with your code. Use <code>return</code> to send the contents back to the
				caller, rather than printing them inside <code>read_file</code>. Update
				<code>main()</code> to call your function and print the returned string:
			</p>

			<Code
				lang="python"
				code={String.raw`def main():
    content = read_file('examples/BGH-R.pri')
    print(content)`}
			/>

			<p>
				Keep the <code>if __name__ == "__main__":</code> block at the bottom of
				<code>main.py</code>. Save and run <code>uv run main.py</code> from the
				<code>dna-analyser</code> folder. Check that it still prints the file contents.
			</p>
		</li>
		<li>
			<p>
				Create a new file called <code>reader.py</code> in the same folder as
				<code>main.py</code>. Move the entire <code>read_file</code> function into
				<code>reader.py</code>, removing its definition from <code>main.py</code>. Leave
				<code>main()</code> and its call in <code>main.py</code>.
			</p>
		</li>
		<li>
			<p>
				At the top of <code>main.py</code>, import <code>read_file</code> from your new module:
			</p>

			<Code lang="python" code={String.raw`from reader import read_file`} />

			<p>
				Use <code>reader</code>, not <code>reader.py</code>, in the import. Save both files and run
				<code>uv run main.py</code> again. It should print the same text as before, but now the file-reading
				function lives in a separate module.
			</p>
		</li>
	</ol>
</LessonSection>

<LessonSection id="handling-exceptions">
	<h3>Handling Exceptions</h3>

	<ul>
		<li>
			<p>
				If the file does not exist, <code>open()</code> in the <code>with</code> block raises a
				<code>FileNotFoundError</code>. Modify <code>read_file</code> in <code>reader.py</code> so
				that it returns an empty string <code>''</code> and prints a warning when the file is missing,
				for example:
			</p>

			<Code lang="python" code={String.raw`print(f'⚠️ Error: "{file_path}" not found!')`} />

			<blockquote>
				<p>
					<strong>Tip:</strong> Put the <code>with</code> block inside a <code>try</code> block. Use
					<code>except FileNotFoundError:</code>
					to print the warning and return
					<code>''</code>.
				</p>
			</blockquote>
		</li>
		<li>
			<p>
				Test this by calling <code>read_file</code> with a path to a file that does not exist in
				<code>main()</code>, then run <code>uv run main.py</code>. Check that it prints the warning
				instead of a traceback. Switch back to <code>examples/BGH-R.pri</code> and check that existing
				files still work.
			</p>
		</li>
	</ul>

	<details open>
		<summary>Why not fail silently?</summary>

		<p>
			Here we warn the user when the file does not exist rather than failing silently, which we
			should never do. In most cases, raising an exception is preferable to returning an empty
			string, because it lets the caller distinguish a missing file from an empty one and decide how
			to handle the problem.
		</p>
	</details>
</LessonSection>

<LessonSection id="cleaning-input">
	<h3>Cleaning Input</h3>

	<p>
		We should not assume that input files will be perfect and clean: they may contain comments,
		spaces, line breaks and lowercase letters. Our app will analyse only DNA, so let's start
		preparing the input by removing comments and formatting before we check the sequence itself.
	</p>

	<ol>
		<li>
			<p>
				In <code>reader.py</code>, define a new function called
				<code>clean_input(input_text)</code>. It should take the text returned by
				<code>read_file</code> and return a cleaned string:
			</p>

			<Code
				lang="python"
				code={String.raw`def clean_input(input_text):
    """Removes whitespace characters and converts to upper case letters"""
    # Return the cleaned input as a string.`}
			/>
		</li>
		<li>
			<p>
				Replace the comment with your code. First, use <code>input_text.splitlines()</code> to
				create a list of lines and store it in <code>lines</code>.
			</p>
		</li>
		<li>
			<p>
				Remove comment lines that start with <code>'# '</code>, <code>'% '</code> or
				<code>'//'</code>, then join the remaining lines into one string called
				<code>no_comment</code>.
			</p>

			<blockquote>
				<p>
					<strong>Tip:</strong> <code>l[:2]</code> gives the first two characters of a line.
					<code>filter</code> keeps items for which a function returns <code>True</code>, and
					<code>''.join(...)</code> joins them without adding a separator:
				</p>

				<Code
					lang="python"
					code={String.raw`no_comment = ''.join(filter(lambda l: l[:2] not in ['# ', '% ', '//'], lines))`}
				/>
			</blockquote>
		</li>
		<li>
			<p>
				Clean <code>no_comment</code> by removing leading and trailing whitespace, converting
				letters to uppercase and removing spaces, then return the result. Read the Python
				documentation for
				<a
					href="https://docs.python.org/3/library/stdtypes.html#str.strip"
					target="_blank"
					rel="noopener"><code>str.strip()</code></a
				>,
				<a
					href="https://docs.python.org/3/library/stdtypes.html#str.upper"
					target="_blank"
					rel="noopener"><code>str.upper()</code></a
				>
				and
				<a
					href="https://docs.python.org/3/library/stdtypes.html#str.replace"
					target="_blank"
					rel="noopener"><code>str.replace()</code></a
				>
				and work out how to combine these methods yourself.
			</p>
		</li>
		<li>
			<p>
				In <code>main.py</code>, update your import to include <code>clean_input</code>:
			</p>

			<Code lang="python" code={String.raw`from reader import read_file, clean_input`} />

			<p>
				In <code>main()</code>, pass the file contents to <code>clean_input</code> and print its returned
				string:
			</p>

			<Code
				lang="python"
				code={String.raw`content = read_file('examples/BGH-R.pri')
sequence = clean_input(content)
print(sequence)`}
			/>

			<p>
				Save both files and run <code>uv run main.py</code>. The output should be
				<code>TAGAAGGCACAGTCGAGG</code>, without the comment line. Try adding spaces, line breaks
				and lowercase letters to the sequence in the input file, then check that the cleaned output
				stays the same.
			</p>
		</li>
	</ol>

	<blockquote>
		<p>
			This function cleans formatting; it does not yet ensure that the result contains only DNA
			letters. Other characters, including RNA's <code>U</code> and tabs inside a sequence, can still
			remain, so cleaning is not a substitute for validation.
		</p>
	</blockquote>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}
</style>
