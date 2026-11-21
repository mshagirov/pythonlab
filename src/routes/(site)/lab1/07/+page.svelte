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
		<li>prints each file path and the first twenty characters of its sequence to the terminal.</li>
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
        print(sequence[:20])

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
					<code>count_bases()</code> on one line.
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

<LessonSection id="melting-temperature">
	<h3>Melting Temperature</h3>

	<p>
		The melting temperature, <var>T</var><sub>m</sub>, is the temperature at which half of the
		double-stranded DNA has separated into single strands. It tells us, for example, at which
		annealing temperature a PCR primer will bind to its target. Because G–C pairs are more stable
		than A–T pairs, <var>T</var><sub>m</sub> depends on the base composition, and also on the length of
		the sequence.
	</p>

	<details open>
		<summary><code>melting_temperature()</code></summary>

		<p>
			Both formulas below, with a short explanation, are on
			<a
				href="https://www.thermofisher.com/us/en/home/life-science/cloning/cloning-learning-center/invitrogen-school-of-molecular-biology/pcr-education/pcr-reagents-enzymes/pcr-cycling-considerations.html"
				target="_blank"
				rel="noopener">Thermo Fisher's PCR cycling guide</a
			>
			(under <em>Primer annealing optimization</em>), so you can check them there.
		</p>

		<p>
			For short oligonucleotides, typically 14 base pairs or fewer, the Wallace rule gives a quick
			estimate in °C by adding 4 °C for every G–C pair and 2 °C for every A–T pair:
		</p>

		<p class="equation">
			<var>T</var><sub>m</sub> ≈ 4 × (<var>G</var> + <var>C</var>) + 2 × (<var>A</var> +
			<var>T</var>)
		</p>

		<p>
			For longer sequences, we use the salt-adjusted form of the classic bulk-DNA relationship of
			Marmur and Doty and of Schildkraut and Lifson, with a length correction:
		</p>

		<p class="equation">
			<var>T</var><sub>m</sub> ≈ 81.5 + 16.6 × log<sub>10</sub>[Na<sup>+</sup>] + 0.41 × GC% − 675 /
			<var>n</var>
		</p>

		<p>
			where [Na<sup>+</sup>] is the sodium concentration in mol/L, GC% is the GC percentage and
			<var>n</var> is the number of bases in the sequence. For other methods of estimating
			<var>T</var><sub>m</sub>, see
			<a
				href="https://biopython.org/docs/latest/api/Bio.SeqUtils.MeltingTemp.html"
				target="_blank"
				rel="noopener">Biopython's <code>MeltingTemp</code> module</a
			>.
		</p>

		<ol>
			<li>
				<p>
					In <code>dnatools.py</code>, define a function called
					<code>melting_temperature(base_count, na_molar=0.05)</code>. It takes the dictionary of
					base counts and the sodium concentration in mol/L, and returns the estimated
					<var>T</var><sub>m</sub> in °C: the Wallace rule if the sequence has 14 bases or fewer, otherwise
					the salt-adjusted equation.
				</p>

				<Code
					lang="python"
					code={String.raw`def melting_temperature(base_count, na_molar=0.05):
    # Return the estimated melting temperature in °C.
    # Use the Wallace rule for sequences of 14 bases or fewer,
    # otherwise the salt-adjusted Marmur-Doty / Schildkraut-Lifson equation.
    # Raise TypeError if base_count is not a dict.`}
				/>

				<blockquote>
					<p>
						<strong>Default arguments:</strong> <code>na_molar=0.05</code> gives the parameter a
						<a
							href="https://docs.python.org/3/tutorial/controlflow.html#default-argument-values"
							target="_blank"
							rel="noopener">default value</a
						>
						of 0.05 M (50 mM Na<sup>+</sup>), a typical PCR buffer concentration. If you call
						<code>melting_temperature(bases)</code>, Python uses
						<code>0.05</code>; to model a different buffer, pass your own value, e.g.
						<code>melting_temperature(bases, na_molar=0.1)</code>. The Wallace rule ignores the salt
						concentration, so <code>na_molar</code> only affects sequences longer than 14 bases.
					</p>
				</blockquote>

				<blockquote>
					<p>
						<strong>Tip:</strong> you already have a function for the GC percentage. Call
						<code>gc_percent(base_count)</code> from the same module instead of computing it again.
					</p>
					<p>
						<code>log<sub>10</sub></code> is
						<a
							href="https://docs.python.org/3/library/math.html#math.log10"
							target="_blank"
							rel="noopener"><code>math.log10()</code></a
						>; add <code>import math</code> at the top of <code>dnatools.py</code> to use it.
					</p>
				</blockquote>
			</li>
			<li>
				<p>
					Test it in the REPL with <code>uv run python</code>.
					<code>melting_temperature(count_bases('GATTACA'))</code> should return
					<code>18</code>, and <code>melting_temperature('GATTACA')</code> should raise a
					<code>TypeError</code>.
				</p>
			</li>
		</ol>
	</details>

	<details open>
		<summary>Use <code>melting_temperature()</code></summary>

		<p>Let's add the melting temperature to the table as a new <code>Tm °C</code> column.</p>

		<ol>
			<li>
				<p>
					In <code>main.py</code>, add <code>melting_temperature</code> to the import:
				</p>

				<Code
					lang="python"
					code={String.raw`from dnatools import (
    is_dna,
    count_bases,
    gc_percent,
    at_to_gc_ratio,
    ss_weight_daltons,
    melting_temperature,
)`}
				/>
			</li>
			<li>
				<p>
					In <code>main()</code>, add <code>Tm °C</code> to the column names, and for each DNA file print
					the melting temperature with two decimal places in the new column.
				</p>
			</li>
			<li>
				<p>
					Save both files and run <code>uv run main.py examples/*</code>. The output should look
					something like:
				</p>

				<Code
					lang="text"
					code={String.raw`   Sequence File        #bases  ssMW kDa       GC%     AT/GC     Tm °C
    example3.dna            47     14.61    14.89%      5.71     51.65
    example4.rna     NOT DNA ❌`}
				/>
			</li>
		</ol>
	</details>
</LessonSection>

<LessonSection id="summary">
	<h3>Summary</h3>

	<p>The DNA Analyser project now has three modules:</p>

	<ul>
		<li>
			<code>main.py</code> takes file paths as command-line arguments and prints a table with one row
			per file,
		</li>
		<li><code>reader.py</code> reads the batch of files and cleans their contents,</li>
		<li>
			<code>dnatools.py</code> checks whether a sequence is DNA and computes its base counts, GC content,
			AT to GC ratio, molecular weight and melting temperature.
		</li>
	</ul>

	<p>
		Compare your code with the example solutions below. Yours does not have to match them exactly,
		as long as it gives the same results.
	</p>

	<details>
		<summary><code>main.py</code></summary>

		<Code
			lang="python"
			code={String.raw`import sys
from pathlib import Path
from reader import read_batch
from dnatools import (
    is_dna,
    count_bases,
    gc_percent,
    at_to_gc_ratio,
    ss_weight_daltons,
    melting_temperature,
)


def main(*input_files):
    sequences = read_batch(input_files)

    print(f'{"Sequence File":^20}{"#bases":^8}{"ssMW kDa":^8}{"GC%":^8}{"AT/GC":^8}{"Tm °C":^8}')

    for file_path, sequence in sequences.items():
        file_name = Path(file_path).name
        print(f'{file_name:^20}', end='')

        if not is_dna(sequence):
            print('NOT DNA ❌')
            continue

        bases = count_bases(sequence)
        total = sum(bases.values())
        weight_kda = ss_weight_daltons(bases) / 1000
        gc = f'{gc_percent(bases):.2f}%'
        print(
            f'{total:^8}'
            f'{weight_kda:^8.2f}'
            f'{gc:^8}'
            f'{at_to_gc_ratio(bases):^8.2f}'
            f'{melting_temperature(bases):^8.2f}'
        )


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('DNA Analyser requires at least 1 input file')
        print(f'\t{sys.argv[0]} input_file1 [ input_file2 [ input_file3 ... ] ... ]\n')
        sys.exit(1)

    main(*sys.argv[1:])`}
		/>
	</details>

	<details>
		<summary><code>reader.py</code></summary>

		<Code
			lang="python"
			code={String.raw`def read_file(file_path):
    try:
        with open(file_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        print(f'⚠️ Error: "{file_path}" not found!')
        return ''


def clean_input(input_text):
    """Removes whitespace characters and converts to upper case letters"""
    lines = input_text.splitlines()
    no_comment = ''.join(filter(lambda l: l[:2] not in ['# ', '% ', '//'], lines))
    return no_comment.strip().upper().replace(' ', '')


def read_batch(file_paths):
    sequences = {}
    for file_path in file_paths:
        content = read_file(file_path)
        sequences[file_path] = clean_input(content)
    return sequences`}
		/>
	</details>

	<details>
		<summary><code>dnatools.py</code></summary>

		<Code
			lang="python"
			code={String.raw`import math

DNA_BASES = set('ATGC')


def is_dna(seq):
    return len(seq) > 0 and set(seq) <= DNA_BASES


def count_bases(seq):
    return {base: seq.count(base) for base in 'ATGC'}


def gc_percent(bases):
    if isinstance(bases, dict):
        gc_count = bases['G'] + bases['C']
        total = sum(bases.values())
    else:
        raise TypeError(f"Expected dict, but got {type(bases).__name__}")
    return 100 * gc_count / total


def at_to_gc_ratio(bases):
    if not isinstance(bases, dict):
        raise TypeError(f"Expected dict, but got {type(bases).__name__}")
    return (bases['A'] + bases['T']) / (bases['G'] + bases['C'])


def ss_weight_daltons(bases):
    if not isinstance(bases, dict):
        raise TypeError(f"Expected dict, but got {type(bases).__name__}")
    return (
        bases['A'] * 313.2
        + bases['T'] * 304.2
        + bases['G'] * 329.2
        + bases['C'] * 289.2
    )


def melting_temperature(base_count, na_molar=0.05):
    if not isinstance(base_count, dict):
        raise TypeError(f"Expected dict, but got {type(base_count).__name__}")
    n = sum(base_count.values())
    if n <= 14:
        return 4 * (base_count['G'] + base_count['C']) + 2 * (base_count['A'] + base_count['T'])
    return 81.5 + 16.6 * math.log10(na_molar) + 0.41 * gc_percent(base_count) - 675 / n`}
		/>
	</details>

	<p>Running <code>uv run main.py examples/*</code> with these files prints:</p>

	<Code
		lang="text"
		code={String.raw`   Sequence File     #bases ssMW kDa  GC%    AT/GC   Tm °C
     BGH-R.pri         18     5.66   55.56%   0.80   45.18
    example1.txt      6458  1998.87  34.42%   1.91   73.91
    example2.txt    NOT DNA ❌
    example3.dna       47    14.61   14.89%   5.71   51.65
    example4.rna    NOT DNA ❌
   MSCV-fwrd.pri       23     6.93   60.87%   0.64   55.51
   pBAD-fwrd.pri       20     6.10   35.00%   1.86   40.50
       T3.pri          21     6.45   42.86%   1.33   45.33`}
	/>
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
