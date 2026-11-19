<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="current-main">
	<h3>Current state of <code>main.py</code></h3>

	<p>So far, <code>main.py</code>:</p>

	<ul>
		<li>takes file paths as command-line arguments,</li>
		<li>reads the batch of files and cleans them,</li>
		<li>prints the file paths and contents to the terminal.</li>
	</ul>

	<details>
		<summary>Current <code>main.py</code></summary>

		<Code
			lang="python"
			code={String.raw`import sys
from reader import read_batch

def main(*input_files):
    sequences = read_batch(input_files)

    for file_path, sequence in sequences.items():
        print(file_path)
        print(sequence)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('DNA Analyser requires at least 1 input file')
        print(f'\t{sys.argv[0]} input_file1 [ input_file2 [ input_file3 ... ] ... ]\n')
        sys.exit(1)

    main(*sys.argv[1:])`}
		/>
	</details>
</LessonSection>

<LessonSection id="is-it-dna">
	<h3>Is it DNA?</h3>
	<p>
		So far, we have read every sequence file passed on the command line. But, as you may have
		noticed, some files are empty or contain sequences that are not DNA. A user could also pass a
		file of random letters that is not a DNA sequence or any other kind of sequence. How do we check
		this? We need some tools. Let's build a new module for working with DNA sequences called
		<code>dnatools</code>.
	</p>

	<details open>
		<summary><code>dnatools.py</code></summary>

		<ol>
			<li>
				<p>
					In Zed, create a new file called <code>dnatools.py</code> in the
					<code>dna-analyser</code> project folder, next to <code>main.py</code> and
					<code>reader.py</code>.
				</p>
			</li>
			<li>
				<p>
					Inside <code>dnatools.py</code>, define a function called <code>is_dna(seq)</code>. It
					takes a cleaned candidate sequence <code>seq</code>, a string of uppercase letters, and
					returns a single Boolean: <code>True</code> if <code>seq</code> is DNA, otherwise
					<code>False</code>.
				</p>

				<Code
					lang="python"
					code={String.raw`def is_dna(seq):
    # Return True if seq is DNA, otherwise return False.`}
				/>

				<blockquote>
					<p>
						<strong>Tip:</strong> Python's
						<a
							href="https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset"
							target="_blank"
							rel="noopener"><code>set</code></a
						>
						may help here. A set is an unordered collection of unique items:
						<code>set()</code> turns any iterable, such as a string, into a set of its distinct
						elements, dropping duplicates and ignoring order. Two sets can be compared with
						operators like <code>==</code>, and you can check which items they share or differ by.
						Try
						<code>set('GATTACA')</code> in the Python REPL to see what you get.
					</p>
				</blockquote>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Use <code>is_dna()</code></summary>

		<p>
			Now let's use <code>is_dna()</code> in <code>main.py</code> to label each file. Instead of
			printing the full path and the sequence, <code>main()</code> will print one line per file: the
			file name followed by <code>DNA ✅</code> or <code>NOT DNA ❌</code>.
		</p>

		<ol>
			<li>
				<p>
					At the top of <code>main.py</code>, import <code>Path</code> from Python's
					<a href="https://docs.python.org/3/library/pathlib.html" target="_blank" rel="noopener"
						><code>pathlib</code></a
					> module:
				</p>

				<Code lang="python" code={String.raw`from pathlib import Path`} />

				<p>
					<code>Path</code> represents a file system path. Its <code>name</code> attribute is the
					final part of the path, so <code>Path('examples/T3.pri').name</code> is
					<code>'T3.pri'</code>.
				</p>
			</li>
			<li>
				<p>Below the <code>read_batch</code> import, import your new function:</p>

				<Code lang="python" code={String.raw`from dnatools import is_dna`} />
			</li>
			<li>
				<p>
					In the loop in <code>main()</code>, replace the two <code>print</code> calls. For each
					<code>file_path</code>, get the file name with <code>Path</code> and check the
					<code>sequence</code> with <code>is_dna()</code>.
				</p>
			</li>
			<li>
				<p>
					Print the file name and <code>DNA ✅</code> if <code>is_dna()</code> returns
					<code>True</code>, otherwise print the file name and <code>NOT DNA ❌</code>. Print one
					file per line and don't print the sequence.
				</p>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. Each line should show a
					file name and its label, for example:
				</p>

				<Code
					lang="text"
					code={String.raw`example3.dna DNA ✅
example4.rna NOT DNA ❌`}
				/>
			</li>
		</ol>
	</details>
</LessonSection>

<LessonSection id="counting-bases">
	<h3>Counting Bases</h3>

	<p>
		Knowing that a sequence is DNA is only the first step. To do anything interesting with it, such
		as computing its molecular weight or estimating its melting temperature, we first need to know
		how many of each base, <code>A</code>, <code>T</code>, <code>G</code> and <code>C</code>, it
		contains. Let's add a tool to <code>dnatools.py</code> that counts them.
	</p>

	<details open>
		<summary><code>count_bases()</code></summary>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, below <code>is_dna()</code>, define a function called
					<code>count_bases(seq)</code>. It takes a DNA sequence <code>seq</code>, a string of
					uppercase letters, and returns a dictionary with the number of times each base appears in
					it, using the bases as keys.
				</p>

				<Code
					lang="python"
					code={String.raw`def count_bases(seq):
    # Return a dictionary of base counts, e.g. {'A': 3, 'T': 2, 'G': 1, 'C': 1}.`}
				/>

				<blockquote>
					<p>
						<strong>Tip:</strong> Strings have a
						<a
							href="https://docs.python.org/3/library/stdtypes.html#str.count"
							target="_blank"
							rel="noopener"><code>count()</code></a
						>
						method that returns how many times a substring appears in them. Try
						<code>'GATTACA'.count('A')</code> in the Python REPL.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Include all four bases in the dictionary, even when a base does not appear in the
					sequence: <code>count_bases('AAT')</code> should return
					<code>{"{'A': 2, 'T': 1, 'G': 0, 'C': 0}"}</code>.
				</p>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Use <code>count_bases()</code></summary>

		<p>
			Let's report the base counts from <code>main.py</code>. For each DNA file,
			<code>main()</code> will print the file name, the total number of bases and the counts of each
			base. Non-DNA files keep their <code>NOT DNA ❌</code> label.
		</p>

		<ol>
			<li>
				<p>
					In <code>main.py</code>, add <code>count_bases</code> to the <code>dnatools</code> import:
				</p>

				<Code lang="python" code={String.raw`from dnatools import is_dna, count_bases`} />
			</li>
			<li>
				<p>
					In the loop in <code>main()</code>, when <code>is_dna()</code> returns <code>True</code>,
					call <code>count_bases()</code> on the sequence instead of printing
					<code>DNA ✅</code>.
				</p>
			</li>
			<li>
				<p>
					Print the file name, the total number of bases and the dictionary returned by
					<code>count_bases()</code> on one line. Printing the dictionary as it is is fine.
				</p>

				<blockquote>
					<p>
						<strong>Tip:</strong> the total is the length of the sequence, or the sum of the counts.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. The output should look
					something like:
				</p>

				<Code
					lang="text"
					code={String.raw`    example3.dna        47  {'A': 24, 'T': 16, 'G': 5, 'C': 2}
    example4.rna      NOT DNA ❌`}
				/>
			</li>
		</ol>

		<blockquote>
			<p>
				<strong>Formatting tips:</strong>
				<a
					href="https://docs.python.org/3/library/string.html#format-specification-mini-language"
					target="_blank"
					rel="noopener">Format specifications</a
				>
				in f-strings line up columns. <code>f'{'{file_name:^20}'}'</code> centres
				<code>file_name</code> in a column 20 characters wide; <code>&lt;</code> aligns it to the
				left and <code>&gt;</code> to the right, e.g. <code>f'{'{total:>6}'}'</code>.
			</p>
			<p>
				<code>print()</code> ends with a new line by default. Pass <code>end=''</code> to stay on
				the same line, so the next <code>print()</code> continues it:
				<code>print(f'{'{file_name:^20}'}', end='')</code>.
			</p>
		</blockquote>
	</details>
</LessonSection>

<LessonSection id="gc-content">
	<h3>GC Content</h3>

	<p>
		The GC content of a DNA sequence is the percentage of its bases that are <code>G</code> or
		<code>C</code>. G–C pairs are held together by three hydrogen bonds rather than the two of A–T
		pairs, so sequences with higher GC content are more stable and melt at higher temperatures. With
		<code>count_bases()</code> in place, we already have everything we need to compute it.
	</p>

	<details open>
		<summary><code>gc_percent()</code></summary>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, define a function called <code>gc_percent(bases)</code>. It
					takes the dictionary of base counts returned by <code>count_bases()</code> and returns the
					percentage of bases that are <code>G</code> or <code>C</code>. Fill in the
					<code>...</code>:
				</p>

				<Code
					lang="python"
					code={String.raw`def gc_percent(bases):
    if isinstance(bases, dict):
        gc_count = ...
        total = ...
    else:
        raise TypeError(f"Expected dict, but got {type(bases).__name__}")
    return 100 * gc_count / total`}
				/>

				<blockquote>
					<p>
						<strong>Don't trust your input.</strong> A function cannot know who will call it or what
						they will pass. Before using <code>bases</code> as a dictionary,
						<code>gc_percent</code> checks that it really is one with
						<a
							href="https://docs.python.org/3/library/functions.html#isinstance"
							target="_blank"
							rel="noopener"><code>isinstance()</code></a
						>. If it is not, the function stops with a
						<a
							href="https://docs.python.org/3/library/exceptions.html#TypeError"
							target="_blank"
							rel="noopener"><code>TypeError</code></a
						>
						that says what went wrong, instead of failing later with a confusing error or returning a
						wrong answer.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Test it in the Python REPL. In Zed's terminal, make sure you are in the
					<code>dna-analyser</code> folder, then start the project's Python with uv:
				</p>

				<Code lang="bash" code={String.raw`uv run python`} />

				<p>
					<code>uv run</code> uses the project's <code>.venv</code>, so the REPL runs the same
					Python as <code>uv run main.py</code> and can import your modules from the current folder.
					At the <code>&gt;&gt;&gt;</code> prompt, import your functions and try them:
				</p>

				<Code
					lang="python"
					code={String.raw`>>> from dnatools import count_bases, gc_percent
>>> gc_percent(count_bases('GATTACA'))
28.571428571428573
>>> gc_percent('GATTACA')
Traceback (most recent call last):
  ...
TypeError: Expected dict, but got str`}
				/>

				<p>
					Type <code>exit()</code> or press <kbd>Ctrl+D</kbd> to leave the REPL. If you change
					<code>dnatools.py</code>, restart the REPL to load the new version.
				</p>
			</li>
			<li>
				<p>
					In <code>main.py</code>, add <code>gc_percent</code> to the <code>dnatools</code> import:
				</p>

				<Code
					lang="python"
					code={String.raw`from dnatools import is_dna, count_bases, gc_percent`}
				/>
			</li>
			<li>
				<p>
					In <code>main()</code>, pass the dictionary from <code>count_bases()</code> to
					<code>gc_percent()</code> and print the GC percentage, followed by a <code>%</code> sign
					(e.g.
					<code>45.47%</code>), after the file name, instead of the base counts.
				</p>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. Check that each DNA file
					shows its GC percentage, and that non-DNA files are still labelled
					<code>NOT DNA ❌</code>.
				</p>
			</li>
		</ol>
	</details>

	<details open>
		<summary>AT to GC Ratio</summary>

		<p>
			Another way to describe the base composition is the ratio of A–T to G–C bases,
			<code>(A + T) / (G + C)</code>.
		</p>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, define a function called <code>at_to_gc_ratio(bases)</code>.
					Like <code>gc_percent()</code>, it takes the dictionary of base counts and checks its
					input:
				</p>

				<Code
					lang="python"
					code={String.raw`def at_to_gc_ratio(bases):
    # Return the ratio (A + T) / (G + C).
    # Raise TypeError if bases is not a dict.`}
				/>
			</li>
			<li>
				<p>In <code>main.py</code>, add <code>at_to_gc_ratio</code> to the import:</p>

				<Code
					lang="python"
					code={String.raw`from dnatools import is_dna, count_bases, gc_percent, at_to_gc_ratio`}
				/>
			</li>
			<li>
				<p>
					Update <code>main()</code> to print the file name, the GC percentage and the AT to GC ratio
					for each DNA file.
				</p>

				<blockquote>
					<p>
						<strong>Tip:</strong> <code>.2f</code> in a format specification prints a number with
						two decimal places, and any text after the braces is printed as it is:
						<code>f'{'{gc_percent:.2f}'}%'</code> prints <code>45.47%</code>. It can be combined
						with a width, e.g. <code>f'{'{gc_percent:>8.2f}'}%'</code>.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. The output should look
					something like:
				</p>

				<Code
					lang="text"
					code={String.raw`    example3.dna       14.89%    5.71
    example4.rna      NOT DNA ❌`}
				/>
			</li>
		</ol>
	</details>
</LessonSection>

<LessonSection id="molecular-weight">
	<h3>Molecular Weight</h3>

	<p>
		The molecular weight of a DNA strand is needed whenever we convert between the mass and the
		amount of DNA, for example when preparing a primer solution of a given concentration. Each base
		adds a slightly different mass to the strand, so we can estimate the weight of a single-stranded
		sequence from its base counts.
	</p>

	<details open>
		<summary><code>ss_weight_daltons()</code></summary>

		<p>
			Each base adds a different average mass to a single-stranded DNA chain. Using the masses from
			<a
				href="https://www.thermofisher.com/sg/en/home/references/ambion-tech-support/rna-tools-and-calculators/dna-and-rna-molecular-weights-and-conversions.html"
				target="_blank"
				rel="noopener">Thermo Fisher's DNA and RNA molecular weight reference</a
			>, the weight in daltons (Da, or g/mol) is:
		</p>

		<p class="equation">
			Weight<sub>single strand</sub> = <var>A</var> × 313.2 + <var>T</var> × 304.2 +
			<var>G</var> × 329.2 + <var>C</var> × 289.2
		</p>

		<p>
			where <var>A</var>, <var>T</var>, <var>G</var> and <var>C</var> are the numbers of each base in
			the sequence.
		</p>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, define a function called
					<code>ss_weight_daltons(bases)</code>. It takes the dictionary of base counts and returns
					the estimated weight: each base count multiplied by its mass, all added together.
				</p>

				<Code
					lang="python"
					code={String.raw`def ss_weight_daltons(bases):
    # Return the single-stranded DNA weight in daltons.
    # Raise TypeError if bases is not a dict.`}
				/>

				<blockquote>
					<p>
						<strong>Tip:</strong> like <code>gc_percent()</code>, check the input with
						<code>isinstance()</code> before using it. A long expression can be split over several lines
						by wrapping it in parentheses.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Test it in the REPL with <code>uv run python</code>.
					<code>ss_weight_daltons(count_bases('GATTACA'))</code> should return about
					<code>2166.4</code>, and <code>ss_weight_daltons('GATTACA')</code> should raise a
					<code>TypeError</code>.
				</p>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Use <code>ss_weight_daltons()</code></summary>

		<p>
			Let's put everything together. <code>main.py</code> will print a table with one row per file and
			these columns:
		</p>

		<ul>
			<li><code>Sequence File</code>: the file name,</li>
			<li><code>#bases</code>: the total number of bases,</li>
			<li><code>ssMW kDa</code>: the single-stranded molecular weight in kilodaltons,</li>
			<li><code>GC%</code>: the GC percentage,</li>
			<li><code>AT/GC</code>: the AT to GC ratio.</li>
		</ul>

		<ol>
			<li>
				<p>In <code>main.py</code>, add <code>ss_weight_daltons</code> to the import:</p>

				<Code
					lang="python"
					code={String.raw`from dnatools import (
    is_dna,
    count_bases,
    gc_percent,
    at_to_gc_ratio,
    ss_weight_daltons,
)`}
				/>

				<p>Wrapping the names in parentheses lets a long import span several lines.</p>
			</li>
			<li>
				<p>
					In <code>main()</code>, before the loop, print the column names
					<code>Sequence File</code>, <code>#bases</code>, <code>ssMW kDa</code>,
					<code>GC%</code> and <code>AT/GC</code> on one line.
				</p>
			</li>
			<li>
				<p>
					In the loop, call <code>ss_weight_daltons()</code> with the base counts.
					<code>ss_weight_daltons()</code> returns daltons, but the column is in kilodaltons, so
					divide the result by <code>1000</code>.
				</p>
			</li>
			<li>
				<p>
					For each DNA file, print the file name, the number of bases, the weight in kDa, the GC
					percentage and the AT to GC ratio on one line, under their column names. Non-DNA files
					keep their <code>NOT DNA ❌</code> label.
				</p>

				<blockquote>
					<p>
						<strong>Tip:</strong> use the same width for a column name and its values so the columns
						line up, e.g. <code>f'{'{"Sequence File":^20}'}'</code> for the header and
						<code>f'{'{file_name:^20}'}'</code> for each row.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. The output should look
					something like:
				</p>

				<Code
					lang="text"
					code={String.raw`   Sequence File        #bases  ssMW kDa       GC%     AT/GC
    example3.dna            47     14.61    14.89%      5.71
    example4.rna     NOT DNA ❌`}
				/>
			</li>
		</ol>
	</details>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}

	.equation {
		text-align: center;
		font-family: serif;
		font-size: 1.1em;
	}
</style>
