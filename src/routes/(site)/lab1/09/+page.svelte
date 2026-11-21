<script lang="ts">
	import { page } from '$app/state';
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import SnakeConfetti from '#lib/components/SnakeConfetti.svelte';
</script>

{#if page.url.hash === '#next-steps'}
	<SnakeConfetti />
{/if}

<LessonSection id="recap">
	<h3>Recap</h3>

	<p>
		Congratulations, you have built a command-line DNA Analyser! Your <code>dna-analyser</code>
		folder should now contain the files below. Compare them with your own code: yours does not have to
		match exactly, as long as it gives the same results.
	</p>

	<details>
		<summary><code>main.py</code></summary>

		<Code
			lang="python"
			code={String.raw`import sys
from pathlib import Path
from banner import display_banner
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
    display_banner()

    sequences = read_batch(input_files)
    skipped = []

    border = f'+{"-" * 20}+{"-" * 8}+{"-" * 8}+{"-" * 8}+{"-" * 8}+{"-" * 8}+'
    print(border)
    print(f'┊{"Sequence File":^20}┊{"#bases":^8}┊{"ssMW kDa":^8}┊{"GC%":^8}┊{"AT/GC":^8}┊{"Tm °C":^8}┊')
    print(border)

    for file_path, sequence in sequences.items():
        file_name = Path(file_path).name

        if not is_dna(sequence):
            skipped.append(file_name)
            continue

        bases = count_bases(sequence)
        total = sum(bases.values())
        weight_kda = ss_weight_daltons(bases) / 1000
        gc = f'{gc_percent(bases):.2f}%'
        print(
            f'┊{file_name:^20}'
            f'┊{total:^8}'
            f'┊{weight_kda:^8.2f}'
            f'┊{gc:^8}'
            f'┊{at_to_gc_ratio(bases):^8.2f}'
            f'┊{melting_temperature(bases):^8.2f}┊'
        )
        print(border)

    if skipped:
        print('\nSkipped:')
        for file_name in skipped:
            print(f'❌ {file_name:^20}  Not a DNA sequence')


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
    """Return the contents of a text file as a str, or '' if the file is not found."""
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
    """Read and clean a list of files; return a dict of {file path: sequence str}."""
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


def is_dna(seq: str) -> bool:
    """Check if sequence contains only A, T, G, C"""
    return len(seq) > 0 and set(seq) <= set('ATGC')


def count_bases(seq: str) -> dict[str, int]:
    """Count A, T, G and C in an uppercase DNA sequence str, e.g. {'A': 3, 'T': 2, 'G': 1, 'C': 1}."""
    return {base: seq.count(base) for base in 'ATGC'}


def gc_percent(seq_info: str | dict[str, int]) -> float:
    """GC content in % (float) of a DNA sequence str or a dict of base counts."""
    match seq_info:
        case dict():
            gc_count = seq_info['G'] + seq_info['C']
            total = sum(seq_info.values())
        case str():
            gc_count = seq_info.count('G') + seq_info.count('C')
            total = len(seq_info)
        case _:
            raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    return 100 * gc_count / total


def at_to_gc_ratio(seq_info: str | dict[str, int]) -> float:
    """Ratio (A + T) / (G + C) (float) of a DNA sequence str or a dict of base counts."""
    match seq_info:
        case dict():
            bases = seq_info
        case str():
            bases = count_bases(seq_info)
        case _:
            raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    return (bases['A'] + bases['T']) / (bases['G'] + bases['C'])


def ss_weight_daltons(seq_info: str | dict[str, int]) -> float:
    """Estimate single-stranded DNA weight in daltons (float)
    from a DNA sequence str or a dict of base counts."""
    match seq_info:
        case dict():
            bases = seq_info
        case str():
            bases = count_bases(seq_info)
        case _:
            raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    return (
        bases['A'] * 313.2
        + bases['T'] * 304.2
        + bases['G'] * 329.2
        + bases['C'] * 289.2
    )


def melting_temperature(seq_info: str | dict[str, int], na_molar: float = 0.05) -> float:
    """Estimate melting temperature in °C (float) from a DNA sequence str or a dict
    of base counts and the Na+ concentration na_molar in mol/L (default 0.05)."""
    match seq_info:
        case dict():
            bases = seq_info
        case str():
            bases = count_bases(seq_info)
        case _:
            raise TypeError(f"Expected str or dict, but got {type(seq_info).__name__}")
    n = sum(bases.values())
    if n <= 14:
        return 4 * (bases['G'] + bases['C']) + 2 * (bases['A'] + bases['T'])
    return 81.5 + 16.6 * math.log10(na_molar) + 0.41 * gc_percent(bases) - 675 / n`}
		/>
	</details>

	<details>
		<summary><code>banner.py</code></summary>

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
	</details>

	<blockquote>
		<p>
			<code>.git/</code>, <code>.venv/</code> and <code>__pycache__/</code> are created and managed by
			Git, uv and Python; you don't need to edit them.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="conclusion">
	<h3>Conclusion</h3>

	<p>In this lab you have:</p>

	<ul>
		<li>got familiar with the terminal and an IDE (Zed),</li>
		<li>used uv to set up and manage the project's Python environment,</li>
		<li>read files and command-line arguments, and handled missing or invalid input,</li>
		<li>split your code into modules,</li>
		<li>documented the code and used type hints.</li>
	</ul>

	<p>
		Keep experimenting: add your own sequence files, or add a new tool to
		<code>dnatools.py</code>, such as one that returns the complementary strand of a sequence.
	</p>

	<blockquote>
		<p>
			When you need more, libraries such as
			<a href="https://biopython.org/docs/latest/Tutorial/index.html" target="_blank" rel="noopener"
				>Biopython</a
			>
			provide many ready-made tools for working with biological sequences.
		</p>
	</blockquote>
</LessonSection>

<LessonSection id="next-steps">
	<h3>Next Steps</h3>

	<p>
		You can upload your code to platforms such as GitHub or GitLab and share it with others. Before
		you do:
	</p>

	<ul>
		<li>
			Fill in <code>README.md</code>. Briefly explain what the project does, how to install it and
			how to run it, e.g. <code>uv run main.py examples/*</code>.
		</li>
		<li>Commit your files with Git and push them to a new repository (see below).</li>
	</ul>

	<p>
		This was a simple, guided project. In real projects, you will do most of the steps yourself:
		break the problem down into manageable steps, find the right documentation and implement the
		code. AI can be a great help with planning, writing code and getting unstuck.
	</p>

	<blockquote>
		<p>
			<strong>Be careful</strong> not to rely on AI too heavily. AI agents can build a project like this
			in minutes, but letting them do the work can hold back your learning. Build a few projects by hand
			before you lean on AI more.
		</p>
	</blockquote>

	<details open>
		<summary>More Practice</summary>

		<p>
			The best way to improve is to practise building projects. If you don't feel confident yet,
			take more Python courses or work through the guided projects for free on
			<a href="https://www.boot.dev/paths/backend?tech=python-golang" target="_blank" rel="noopener"
				>Boot.dev's backend developer path</a
			>. For working with data in Python, try their
			<a href="https://www.boot.dev/courses/learn-pandas" target="_blank" rel="noopener"
				>pandas course</a
			>.
		</p>

		<blockquote>
			<p>
				This is just a recommendation. I have taken their Git, Python and Go courses and projects,
				really enjoyed them and learned a lot.
			</p>
		</blockquote>
	</details>

	<details>
		<summary>Using Git</summary>

		<blockquote>
			<p>
				<strong>Tip:</strong> <code>uv init</code> already made <code>dna-analyser</code> a
				<a
					href="https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control"
					target="_blank"
					rel="noopener">Git</a
				>
				repository, and its <code>.gitignore</code> keeps <code>.venv/</code> and
				<code>__pycache__/</code> out of it. Save a snapshot of your work by committing your files
				from the <code>dna-analyser</code> folder:
			</p>

			<Code
				lang="bash"
				code={String.raw`git add .
git commit -m "Add DNA Analyser"`}
			/>

			<p>
				To share it or back it up, create an empty repository on
				<a href="https://github.com/new" target="_blank" rel="noopener">GitHub</a> or
				<a href="https://gitlab.com/projects/new" target="_blank" rel="noopener">GitLab</a>, then
				push your commits to it, replacing the URL with your repository's URL:
			</p>

			<Code
				lang="bash"
				code={String.raw`git remote add origin https://github.com/<your-username>/dna-analyser.git
git branch -M main
git push -u origin main`}
			/>
		</blockquote>
	</details>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}
</style>
