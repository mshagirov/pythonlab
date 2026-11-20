<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="function-help">
	<h3>Function Help</h3>

	<p>
		Our DNA Analyser works, but now is a good time to tidy up the code. Refactoring means changing
		how code is written without changing what it does. Suppose you shared
		<code>dna-analyser</code> with your colleagues, and they told you they don't understand how to use
		it. Let's start by documenting our functions, so that anyone using them, including future you, knows
		what they expect and what they return.
	</p>

	<details open>
		<summary>Docstrings</summary>

		<p>
			A
			<a href="https://peps.python.org/pep-0257/" target="_blank" rel="noopener">docstring</a> is a string
			placed on the first line of a function's body. Python stores it as the function's help message,
			and editors such as Zed show it when you use the function.
		</p>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, add a docstring to <code>is_dna()</code>. Use triple quotes
					<code>"""</code> so the help can span several lines if needed:
				</p>

				<Code
					lang="python"
					code={String.raw`def is_dna(seq):
    """Check if sequence contains only A, T, G, C"""
    return len(seq) > 0 and set(seq) <= set('ATGC')`}
				/>
			</li>
			<li>
				<p>
					Save the file, open <code>main.py</code> and hover the mouse pointer over
					<code>is_dna</code>. Zed shows the function's signature with your docstring below it. The
					same help appears in the completion menu when you start typing
					<code>is_dna</code>.
				</p>
			</li>
			<li>
				<p>
					The REPL shows the same help. Start it with <code>uv run python</code> and try:
				</p>

				<Code
					lang="python"
					code={String.raw`>>> from dnatools import is_dna
>>> help(is_dna)`}
				/>

				<p>
					Press <kbd>q</kbd> to close the help page, then <code>exit()</code> to leave the REPL.
				</p>
			</li>
		</ol>
	</details>

	<details>
		<summary>Document the other tools (recommended)</summary>

		<p>
			Write a docstring for each of the remaining functions in <code>dnatools.py</code>:
		</p>

		<ul>
			<li><code>count_bases()</code></li>
			<li><code>gc_percent()</code></li>
			<li><code>at_to_gc_ratio()</code></li>
			<li><code>ss_weight_daltons()</code></li>
			<li><code>melting_temperature()</code></li>
		</ul>

		<p>
			At the very least, write down your key assumptions about each function: what it does, the
			types of its inputs and outputs, and their units, if any. For example:
		</p>

		<Code
			lang="python"
			code={String.raw`def ss_weight_daltons(bases):
    """Estimate single-stranded DNA weight in daltons (float)
    from a dict of base counts, e.g. {'A': 3, 'T': 2, 'G': 1, 'C': 1}."""
    ...


def melting_temperature(base_count, na_molar=0.05):
    """Estimate melting temperature in °C (float) from a dict of base counts
    and the Na+ concentration na_molar in mol/L (default 0.05)."""
    ...`}
		/>

		<blockquote>
			<p>
				<strong>Tip:</strong> state what a caller cannot guess from the name. Is the GC content a
				fraction or a percentage? Is the weight in daltons or kilodaltons? Does
				<code>count_bases()</code> expect uppercase letters? Hover over each function in
				<code>main.py</code> to check that the help reads well.
			</p>
		</blockquote>
	</details>
</LessonSection>

<LessonSection id="handling-multiple-types">
	<h3>Handling Multiple Types</h3>

	<p>
		Your colleagues have more feedback: they want to import your functions from
		<code>dnatools</code> into their own scripts, where sequences are often plain strings. But
		<code>gc_percent('GATTACA')</code> raises a <code>TypeError</code>, because most of our tools
		accept only a dictionary of base counts. Calling <code>count_bases()</code> first every time is easy
		to forget. Let's make our tools accept either a sequence string or a dictionary of base counts.
	</p>

	<details open>
		<summary><code>match</code></summary>

		<p>
			The <code>match</code> statement compares a value against a series of patterns and runs the
			block of the first <code>case</code> that matches. See the
			<a
				href="https://docs.python.org/3/tutorial/controlflow.html#match-statements"
				target="_blank"
				rel="noopener">Python tutorial</a
			>
			and the
			<a href="https://peps.python.org/pep-0636/" target="_blank" rel="noopener"
				>pattern matching tutorial (PEP 636)</a
			> for the many kinds of patterns it supports and where they are useful.
		</p>

		<ol>
			<li>
				<p>
					With <code>if</code>/<code>elif</code>, a <code>gc_percent()</code> that accepts both types
					could look like this:
				</p>

				<Code
					lang="python"
					code={String.raw`def gc_percent(seq_info):
    """seq_info can be base count or a DNA sequence str"""
    if isinstance(seq_info, dict):
        gc_count = seq_info['G'] + seq_info['C']
        total = seq_info['A'] + seq_info['T'] + seq_info['G'] + seq_info['C']
    elif isinstance(seq_info, str):
        gc_count = seq_info.count('G') + seq_info.count('C')
        total = len(seq_info)
    else:
        raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    return 100 * gc_count / total`}
				/>
			</li>
			<li>
				<p>
					In <code>dnatools.py</code>, rewrite <code>gc_percent()</code> so that it does the same
					with <code>match</code> instead of <code>if</code>/<code>elif</code>/<code>else</code>.
					Fill in the patterns and the blocks:
				</p>

				<Code
					lang="python"
					code={String.raw`def gc_percent(seq_info):
    """..."""
    match seq_info:
        case ...:
            ...
        case ...:
            ...
        case _:
            raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    return 100 * gc_count / total`}
				/>

				<blockquote>
					<p>
						<strong>Tip:</strong> <code>case _:</code> matches anything, so it catches every type
						not matched above. To match a value by its type, look up <em>class patterns</em> in the documentation
						linked above.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Update the docstring, then test the function in the REPL with
					<code>uv run python</code>. It should accept a string and a dictionary of base counts, and
					raise a <code>TypeError</code> for any other type:
				</p>

				<Code
					lang="python"
					code={String.raw`>>> from dnatools import count_bases, gc_percent
>>> gc_percent('GATTACA')
28.571428571428573
>>> gc_percent(count_bases('GATTACA'))
28.571428571428573
>>> gc_percent(['G', 'A', 'T'])
Traceback (most recent call last):
  ...
TypeError: Expected str or dict, but got list`}
				/>
			</li>
			<li>
				<p>
					Run <code>uv run main.py examples/*</code> and check that the table has not changed.
				</p>
			</li>
		</ol>
	</details>
</LessonSection>

<LessonSection id="continue-refactoring">
	<h3>Continue Refactoring</h3>

	<p>
		Apply the same approach to the remaining tools in <code>dnatools.py</code>. Change each of these
		functions so that its first parameter is <code>seq_info</code>, which can be a DNA sequence
		string or a dictionary of base counts, and raise a <code>TypeError</code> for any other type:
	</p>

	<ul>
		<li><code>at_to_gc_ratio(bases)</code> → <code>at_to_gc_ratio(seq_info)</code></li>
		<li><code>ss_weight_daltons(bases)</code> → <code>ss_weight_daltons(seq_info)</code></li>
		<li>
			<code>melting_temperature(base_count, na_molar=0.05)</code> →
			<code>melting_temperature(seq_info, na_molar=0.05)</code>
		</li>
	</ul>

	<p>Update their docstrings too, so your colleagues can see that both types are accepted.</p>

	<blockquote>
		<p>
			<strong>Tip:</strong> you don't have to write every formula twice. In the
			<code>str</code> case, you can turn the sequence into a dictionary with
			<code>count_bases()</code> and reuse the code for the <code>dict</code> case.
		</p>
	</blockquote>

	<p>
		Run <code>uv run main.py examples/*</code> and check that the table has not changed.
	</p>
</LessonSection>

<LessonSection id="type-hints">
	<h3>Type Hints</h3>

	<p>
		This step is optional. Type hints write down the expected types of a function's parameters and
		return value in the code itself. They are extra help for future users of your package.
	</p>

	<ol>
		<li>
			<p>Add type hints to <code>melting_temperature()</code>:</p>

			<Code
				lang="python"
				code={String.raw`def melting_temperature(seq_info: str | dict[str, int], na_molar: float = 0.05) -> float:
    ...`}
			/>

			<p>
				<code>seq_info: str | dict[str, int]</code> means a string or a dictionary with string keys
				and integer values. <code>-&gt; float</code> means the function returns a float.
			</p>
		</li>
		<li>
			<p>
				In <code>main.py</code>, hover over <code>melting_temperature</code>. Zed now shows the
				types in the signature, next to your docstring. Type <code>melting_temperature(</code> to see
				them as you fill in the arguments.
			</p>
		</li>
		<li>
			<p>
				Try a wrong type, e.g. <code>melting_temperature(42)</code>. Zed underlines it before you
				run the code. Hover over the underline to read the message, then remove the line.
			</p>
		</li>
	</ol>

	<p>
		If you like them, add type hints to the other functions in <code>dnatools.py</code> too. See the
		<a href="https://docs.python.org/3/library/typing.html" target="_blank" rel="noopener"
			><code>typing</code> documentation</a
		> for more.
	</p>

	<blockquote>
		<p>
			<strong>Note:</strong> the Python interpreter ignores type hints. Python still calls
			<code>melting_temperature(42)</code>, and the error only appears at runtime, when our
			<code>case _:</code> raises a <code>TypeError</code>.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="bringing-joy">
	<h3>Bringing Joy</h3>

	<p>
		Our analyser works, so let's make its output a joy to read: a colourful banner at the top and a
		neat table with borders.
	</p>

	<details open>
		<summary>Banner</summary>

		<ol>
			<li>
				<p>
					Create a new file called <code>banner.py</code> next to <code>main.py</code> and copy this code
					into it:
				</p>

				<Code
					lang="python"
					code={String.raw`import shutil

# Python ANSI Art generated with Bit: https://github.com/superstarryeyes/bit
BLUE = '\033[38;2;0;150;255m'
RESET = '\033[0m'

art_lines = [
    '                                      ▄                        ',
    '█▀▀▄  █▀▀▄  ▄▀▀▄     ▄▀▀▄ ▄▄▄    ▄▄▄  █  ▄  ▄   ▄▄▄   ▄▄   ▄ ▄▄',
    '█  █  █  █  █▄▄█     █▄▄█ █  █  █  █  █  █  █  ▀▄▄   █▄▄█  █▀  ',
    '█▄▄▀  █  █  █  █     █  █ █  █  ▀▄▀█  █  ▀▄▄█  ▄▄▄▀  ▀▄▄▄  █   ',
    '                                          ▄▄▀                  ',
]

# some decorative padding
TERM_WIDTH = max(0, shutil.get_terminal_size().columns - 63)
repeats = min(TERM_WIDTH // 10, 5)

template1 = '⬭       o '
template2 = '| ⬭   o | '
template3 = '| | ⬭ | | '
template4 = '| o   ⬭ | '
template5 = 'o       ⬭ '

banner_lines = [
    template1 * repeats,
    template2 * repeats,
    template3 * repeats,
    template4 * repeats,
    template5 * repeats,
]


def display_banner():
    for art_line, dna_line in zip(art_lines, banner_lines):
        print(f'{BLUE}{art_line}{RESET}', dna_line)`}
				/>

				<p>
					<code>'\033[38;2;0;150;255m'</code> is an
					<a href="https://en.wikipedia.org/wiki/ANSI_escape_code" target="_blank" rel="noopener"
						>ANSI escape code</a
					>
					that tells the terminal to print the following text in blue, and
					<code>'\033[0m'</code> resets the colour. The DNA pattern on the right repeats up to five times,
					depending on the width of your terminal.
				</p>
			</li>
			<li>
				<p>In <code>main.py</code>, import the function:</p>

				<Code lang="python" code={String.raw`from banner import display_banner`} />
			</li>
			<li>
				<p>
					Call <code>display_banner()</code> on the first line of <code>main()</code>, then run
					<code>uv run main.py examples/*</code> to see the banner above your table.
				</p>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Skipped files (optional)</summary>

		<p>
			The <code>NOT DNA ❌</code> lines break up the table. Let's list them after it instead.
		</p>

		<ol>
			<li>
				<p>
					In <code>main()</code>, create an empty list called <code>skipped</code> before the loop.
				</p>
			</li>
			<li>
				<p>
					In the loop, instead of printing <code>NOT DNA ❌</code>, append the file name to
					<code>skipped</code> and <code>continue</code> to the next file.
				</p>
			</li>
			<li>
				<p>
					After the loop, if <code>skipped</code> is not empty, print <code>Skipped:</code> and one line
					for each skipped file:
				</p>

				<Code
					lang="text"
					code={String.raw`Skipped:
❌     example2.txt      Not a DNA sequence
❌     example4.rna      Not a DNA sequence`}
				/>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Cell borders (optional)</summary>

		<ol>
			<li>
				<p>
					In <code>main()</code>, create a border line that matches the column widths:
				</p>

				<Code
					lang="python"
					code={String.raw`border = f'+{"-" * 20}+{"-" * 8}+{"-" * 8}+{"-" * 8}+{"-" * 8}+{"-" * 8}+'`}
				/>
			</li>
			<li>
				<p>
					Print <code>border</code> above and below the column names, and after each row.
				</p>
			</li>
			<li>
				<p>
					Put a <code>┊</code> before every cell and one at the end of the line, e.g.
					<code>f'┊{'{file_name:^20}'}'</code>. Keep the widths the same, so the cells line up with
					the border.
				</p>
			</li>
		</ol>
	</details>

	<p>Run <code>uv run main.py examples/*</code>. The output should look like this:</p>

	<pre class="terminal-output"><code
			><span class="ansi-art"
				>{String.raw`                                      ▄                        `}</span
			>{String.raw` ⬭       o
`}<span class="ansi-art"
				>{String.raw`█▀▀▄  █▀▀▄  ▄▀▀▄     ▄▀▀▄ ▄▄▄    ▄▄▄  █  ▄  ▄   ▄▄▄   ▄▄   ▄ ▄▄`}</span
			>{String.raw` | ⬭   o |
`}<span class="ansi-art"
				>{String.raw`█  █  █  █  █▄▄█     █▄▄█ █  █  █  █  █  █  █  ▀▄▄   █▄▄█  █▀  `}</span
			>{String.raw` | | ⬭ | |
`}<span class="ansi-art"
				>{String.raw`█▄▄▀  █  █  █  █     █  █ █  █  ▀▄▀█  █  ▀▄▄█  ▄▄▄▀  ▀▄▄▄  █   `}</span
			>{String.raw` | o   ⬭ |
`}<span class="ansi-art"
				>{String.raw`                                          ▄▄▀                  `}</span
			>{String.raw` o       ⬭
`}{String.raw`+--------------------+--------+--------+--------+--------+--------+
┊   Sequence File    ┊ #bases ┊ssMW kDa┊  GC%   ┊ AT/GC  ┊ Tm °C  ┊
+--------------------+--------+--------+--------+--------+--------+
┊     BGH-R.pri      ┊   18   ┊  5.66  ┊ 55.56% ┊  0.80  ┊ 45.18  ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example1.txt    ┊  6458  ┊1998.87 ┊ 34.42% ┊  1.91  ┊ 73.91  ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example3.dna    ┊   47   ┊ 14.61  ┊ 14.89% ┊  5.71  ┊ 51.65  ┊
+--------------------+--------+--------+--------+--------+--------+
┊   MSCV-fwrd.pri    ┊   23   ┊  6.93  ┊ 60.87% ┊  0.64  ┊ 55.51  ┊
+--------------------+--------+--------+--------+--------+--------+
┊   pBAD-fwrd.pri    ┊   20   ┊  6.10  ┊ 35.00% ┊  1.86  ┊ 40.50  ┊
+--------------------+--------+--------+--------+--------+--------+
┊       T3.pri       ┊   21   ┊  6.45  ┊ 42.86% ┊  1.33  ┊ 45.33  ┊
+--------------------+--------+--------+--------+--------+--------+

Skipped:
❌     example2.txt      Not a DNA sequence
❌     example4.rna      Not a DNA sequence`}</code
		></pre>
</LessonSection>

<style>
	.terminal-output {
		background: var(--code-bg);
		color: var(--fg);
	}

	.ansi-art {
		color: #0096ff;
	}

	details {
		border-color: transparent;
	}
</style>
