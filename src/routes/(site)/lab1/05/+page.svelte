<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
	import PyCell from '#lib/components/PyCell.svelte';
</script>

<LessonSection id="create-project">
	<h3>Create Project</h3>

	<ul>
		<li>
			<p>
				You can create <code>dna-analyser</code> inside <code>~/workspace/pythonlab/lab1/</code>
				manually with <code>mkdir</code> and add <code>main.py</code> and
				<code>pyproject.toml</code> as before, or let uv set up the project for you. Let's use uv to create
				and set up the project folder automatically. Run these commands in Zed's terminal:
			</p>

			<Code
				lang="bash"
				code={String.raw`cd ~/workspace/pythonlab/lab1
uv init --no-package dna-analyser
cd dna-analyser`}
			/>
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
	<h3>Main Function</h3>

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

	<p>
		The <code>if __name__ == "__main__":</code> line decides whether <code>main()</code> runs.
		Python sets the special variable <code>__name__</code> to <code>"__main__"</code> in the file
		you run directly. When another file imports <code>main.py</code> with <code>import main</code>,
		<code>__name__</code> is <code>"main"</code> instead, so the functions are defined but
		<code>main()</code> does not run. Check the value of <code>__name__</code> in the cell below:
	</p>

	<PyCell code={String.raw`print(__name__)`} />

	<p>
		<strong
			>Change the message in <code>main.py</code>, save the file and run
			<code>uv run main.py</code> again.</strong
		>
	</p>
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

		<ul>
			<li>
				In <code>open('examples/BGH-R.pri', 'r')</code>, the first argument is the path to the file
				and the second is the mode, which says what you want to do with it:
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
						<code>'b'</code>: binary, combined with one of the others, such as <code>'rb'</code>.
						Use it for files that are not text, such as images; you get bytes instead of strings.
						<code>'b'</code> on its own, without <code>'r'</code>, <code>'w'</code> or
						<code>'a'</code>, raises a <code>ValueError</code>, so write <code>'rb'</code> rather
						than just <code>'b'</code>.
					</li>
				</ul>
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

<LessonSection id="more-examples">
	<h3>More Examples</h3>

	<p>
		Create the following files inside the <code>examples/</code> folder. Make sure to preserve
		spaces and all other characters. <code>example2.txt</code> must be an empty file (no contents).
	</p>

	<details>
		<summary>example1.txt</summary>

		<Code
			lang="text"
			code={String.raw`# E.coli Plasmid pMccC7 mccA,B,C,D,E,F genes
% GenBank: X57583.1
// Source: https://www.ncbi.nlm.nih.gov/nuccore/X57583.1?report=fasta

GATGATTATATTCTGTATGGTTATTTATGTCTAAATATATAAATTAATAAATTTTAGAATAAAAATGTAG
AATCGCAAATAATATGATTGTGCTGTTCTTTTTTTGTGAAATAAATCTATGTTTGTATATTTTTATAAGG
AATATTGTTTTTTATAGTGATAAAAACACTTGTGAATTAATCACAGTAATAGGAGGCGTAAAATGCGTAC
TGGTAATGCAAACTAATGGAAAAATATAAATGTCCATTAAATGCCACCCTGTACAGGGTGGCATACAAAA
GTTATCTGCGAGGTTTATTTATGGATTATATATTGGGTCGCTATGTCAAAATTGCTCGATACGGGAGCGG
TGGATTAGTTGGTGGAGGCGGAAAGGAGCAATATGTTGAGAATTTAGTGCTTTGGGAAAATATTATAAAA
ACCGCATATTGTTTCATAACCCCATCGAGTTATACTGCAGCGTTGGAAACGGCCAATATACCTGAAAAAG
ATTTCTCTAATTGCTTTAGGTTCCTTAAGGAAAATTTCTTTATTATACCTGGCGAGTATAATAACTCTAC
TGAGAATAATCGTTACTCTCGTAACTTTTTACATTATCAAAGTTATGGTGCTAATCCTGTTCTTGTGCAA
GATAAACTAAAAAATGCTAAGGTAGTAATTCTTGGTTGTGGGGGTATAGGAAATCATGTGTCTGTTATAC
TCGCAACGTCTGGTATTGGCGAAATTATACTAATTGATAATGATCAAATAGAAAATACAAATTTGACAAG
GCAGGTTTTATTTTCAGAGGATGATGTCGGTAAAAATAAAACAGAAGTTATAAAACGCGAGTTATTAAAA
AGAAACTCTGAAATTTCGGTGTCTGAAATCGCTTTGAATATAAACGATTACACTGATCTTCATAAGGTAC
CAGAAGCTGATATATGGGTTGTTTCTGCAGATCATCCATTTAATCTGATTAACTGGGTTAATAAATATTG
CGTTAGAGCAAATCAGCCCTATATAAATGCTGGGTATGTTAATGATATTGCAGTCTTTGGTCCATTATAT
GTTCCTGGTAAAACAGGATGTTATGAGTGCCAAAAAGTCGTGGCAGATCTATATGGTTCAGAAAAGGAAA
ACATTGATCATAAGATTAAGCTAATCAATAGCAGATTTAAACCGGCAACATTTGCACCTGTGAATAATGT
TGCCGCTGCATTATGTGCGGCAGACGTAATTAAGTTCATTGGAAAATACTCCGAGCCATTATCACTTAAT
AAAAGAATAGGCATCTGGTCAGATGAAATAAAAATACATTCCCAAAATATGGGCCGTTCGCCTGTTTGCT
CTGTGTGTGGAAATAGAATGTGAATACTGCAAATATTTTATCTGTGAACTATGGAGCTTATAATGCTATA
CGTATGTTAATTGGTGTCTACCATGCAGCATTTCTTATATCTACAGGTGTCACTATATCTCAACTTGCTG
TTTTACAGATCGTTTTTTCTGTGACAGTGCTGATTCTTGATTTTCCTTTATCTGTCATTGCAGACAGATT
TTACAGGAAACAGGTTGTAGTTAGTGGCGTATTTTTTACTATATTATTTTACCCTCTTTGTATTCAGTCT
CCTGATATGCTGGCATTGGTTTTTTCTGAAATATTTTATGCCATTGGTATTTGTTGTATATCTGGGGCTA
TAGAGGGATGGGTGTTAAGTGCTCTGGATGGTAGAAATGAAAAGTTTACCTTATGTGCTCATTTATGCGA
AAGGGTATCTTCCTTTGGGAGTGTGATAACTGGTGCTGTTGGAATATTAGTTGTCTACTTCTATGATTCT
TATAAATCTGGCTATATAGTATCGTTCTTCTTGATGTTTGTTGTCTTTATCGTTTTTTTATGTGTGAAAA
CTAATGGCAGTGGAGGTGAAAAAGAAGCACGAGATAGTATTATTAAACAGGCAAAAGAGAGTATTGGATT
GATAACAGGAAGTTATAATGGGACATATTTTTTATCTATAACATGTATGTTTACAATTGGTATACAGGTA
ATTTATCATTTTTGGCAGCCAATTATGCTATCTGGGGAAAGTATTGGCTCATTATCAAAAAGAGAGCTTA
TAACTTTACTGATGTGTCATATTGGTGCATTTTCAATGCAATATATAGCAAACTATCTTATGCCAAAGAT
AGATGTAAGGTGTAAACTTTATATACTTGTTTGTACATTATGTTCATTTCTTAGTTCAATCGCCTGTATT
TTACTATTTATGTTAATAACAGATAATAAGGTTGTTCTCGGCGTAGCTATTTTCTCTATAATCCATGGGA
TGATTTCAACAATACCTGTTGGAGCACAGAATATATTCATAAGCAGACTTAATGGCAATTATAAGAATAT
TATTTCGGGAGCTCTTGGTCTTGTTTCTCTTTCATGTCGTGTTGCTTCCATTTCTGTGTTGGGAGTTATA
TCTGTATTACCAGGTAATATGCCTGTCACCACTTATATATTTATCTCTGCAATTGCATGTGTACTGTGCG
GTTGTTTGTTCTTAATGTGGTCCTTTAAAAAGGAGATGGTATGACGATTAAACATGCTGAAGAATTGACG
GAAGAAGTTATTTTAAATATGAATTACCCTGATTTTGTTGCTCTGATGCAACAGGATAACACTCCTCCTG
GAGCAGAGTACACCATAGACTACTGGATCAAGCATGGATGTATTAACAAAAAGTCTCACCTATTAGATTT
AGCATGTTCCACGGGTTTTAGTTCACGTGAATGCTTCAAAAAAGAAGGTGCATCTGCAGAGGGTATTGAT
ATATCTGAATCAGCTGTAATGGTCGCAAATGAAAAGGCAAAAAAGCTTAAGGCTAATAATTTATTGAAAT
ATTATGTAGCTGATGCTTGTGATTTACCATTTGAAGATAACTCTTTTACACATGTTCTCGGTGGATGTAA
TTTTGCATTTATACAAAATCGGTTAATAGCTTTGAATGAAACTCATCGATGTTTAAACCACATGGGAAGC
ATGTGCATTTCAAATTTTTATTACAGGCGTAAAATATCAGATAAACTTATCAATGATGTATATAATGCAA
TAAATTTCAGACCCAATCCTTTGTGGACTTTGGAATACTGGCATCAGTTTTTTTCTGAAAGATTTACTCT
TGTTTCAGAAGAAAACCATGAGATGGAATCTCAAAGTGAAGATGAGTTAAAAGCCGATATTTATGATTAC
ATTTTCAATAGAAATGAGTTTACAAAAGGTTTGAATGGTTCACTTCAGAATGTATTTTTTGAAAGATTTT
TAAAAATACGCAGACCATTAAATATCCAAAGAGATTATCAGGGAGTTACATTGCAAATATGGCGCAAAAA
ATAACACCATCTAAAATTGTTAAACATGCCCGGGAGTTAATTATTAAGGGGATTGAATCGGGCGAAAACT
CATTTGTCATTTTTGATGTAGATGGAGCTCTGGAGCGTCTGGATCATTACAGGTGTCAACTTAAGAGTTT
TTTCCCCAACAGTAGTATCGCATATTCATATAAGTCAAATAATCTGGCACAATGGTGCAGATTATCTCAG
GTAAAGGTTTGTATGCAGAGGTGTGCTCTGTTGATGAAATGAACCTCGCCAAAAGAGACGGTTTTAAGCG
GATTGTTTTTGATGGCCCTTTAAAAAAAACGAGTGAACTATTAAAGGCAATAGAGATTGGGGCATTAATT
GAAGTTGACAATATTGATGAATGTAAAAGACTTAATGAACTATGTAAGTTGCATAAGCTGACATGTAGAA
TTCATTTGAGATTATCGCATTACTATGATGATAATTTATCAAGATTTGGCTTATCTGAAAGTGAGGCTAT
TAATTTACTGGAGATGTTGATCAGTAAGTCAGAGTATCTCATTTTAGACGGGTTCCATTTACATGTTGGC
TCTAATCTACCCAATGCGGAAAAAATATGTAAAGCTATTATACAGTATCATGAGTTGATTCTTAGGTATA
TGCCAGATGATGGCACTCTTAATCTTGGTAGTGGGATACCTGCAGATTCTTTCTCAGCATCCAGTGATAA
CCCAACTCCATGTCCGGAGGTATTTTTCTCATCGATATATGATACAATAAAAAATTGCTTCGGTACTGTA
TGTGATAAATGGAACTATATTTTTGAACCAGGGAGACATCTGGTCGAAGACTTTGGCTACTTTATAGGGA
AAGTTATTAGTACTAAAAACAGGTATGGTGTTAAAGTTGCTCAAACTAACATTGGTATAAACTGGATACC
TTCGATCAGAAATTGGGACCATTCATTTACATTGTTTCATAATCATAACCATATTTCAGATGATAAATCT
GATGAGTATATTATTGCTGGATTCAATTGCTTTGAATGTGATTGCTTGTTTCCTTCAGTTATTCTTCCCA
GTAACTTATCTGATTATTTATTTTCTGTTCGAGGGTGTGGTGCTTATGATATGCAAACAGGAAACCAGTG
GACGCGTAATCTTTATGCTGTATATACCATAACAAATGATGTTGTTAATATATCAAGGATTCACAGAAGA
GAACTTGATTTCCGGAAGTATGATGTATCTCTTACGCCATCAGGAATAAAAGTAAATGATGAAATTACAT
TATTGTATCCAGCGTTAAAATACGCTGAAGAGTTATATTTGCTCATTAATCAAAACAAAATAAATTTCAT
TAAAAGCATGGCATGGCCAGCGTTTGTTAATAACATTTCTGATTCTGTTTCTTTCATTGAGCAATCAATG
ATTGATAACCAGAATGAAAAAGCATTAATCCTCTTTATTAAATACAAAACTAAGATAGCTGGCGTTGTAT
CGTTTAATATTATTGACCATGCCAATAAAACAGCATATATTGGCTATTGGTTAGGTGCTAACTTTCAGGG
GAAGGGGATTGTAACCAATGCTATAAATAAACTGATACAGGAGTATGGGGATTCGGGCGTTATAAAAAGA
TTTGTTATAAAATGTATTGTTGATAATAAAAAAAGTAATGCCACGGCATTGAGGTGTGGCTTCACCTTAG
AAGGTGTTCTGCAAAAAGCAGAAATACTCAACGGTGTATCATACGATCAAAATATTTATTCAAAAGTAAT
TGGTTAATACTGTATGGCGTAGTATTCTACGCATTTTGTTTATGTCTGTGAGATGATAATATTTATTTCT
CGGTAGATAGATATTGTTCTGTTATAGATATATTTTTGTTGTCAAAGTCAATAGCTAATTTTACACCAAG
TGGAAGAGTTAGCATTGGATGTGTATGTGAACAATCAAATCCATCCAGTACAGGAATCTGTTTCCCATCT
AATACCTCTGTTAATACTTCATATGGTCTGCGTTTACTTCCTGCACAATCAAAAAGCTCATGTTTCCCGA
GTATTATTGCACTAACTTTATCAAACACGCGATTAAGCTTTAGCATAGAGAATAATCGTTCAATTGTTGC
AATGCTTTTCCGACTGTCCTCAATAAACAATATATCTCCATTAAGAATTTCAGGCATCCATTCACTCCCC
CATATACCTGTCAAAGTATTTAGATTTCCTCCAATTACACGCCCCTCAACTTTTCCGGAACCATAAAAGG
CACAGTTGTTTTTATATAGCTTCTTAGGCCTTAATATCTTGTTTTCATTCCAGTTTATGCTCTCATCACT
CCACTTTTCAGGTAATGTGTAGGTATATATTCCTGATTGTTTTCTTGTTAGTATTTTAATAAATGATTCA
TATGTTATATCCACAAGAGGTGGATGTTCACCAAACGAAGGAATAAGAGCTGGTCCATAGAATGTTATTA
ACCCTGTTTTTGCATATATTCCTGCTAATAAAGCAGTTGTATCTGAGTAACCTATGATAATTTTGGGGTT
TGCAATGATAGCATCATAGTCCAGAAACGGTAGTAGTGAATTACTGTTATCTCCACCGATCGTTGACATT
ATACAGGTAATATCAGGATTGTAGACTAACTCATTAAATTCTTGAGCTCTTTCTTTAATAGTACCTGAAC
GATAAAAATCTGTTTTACCGGTAAGCTTCCCTGATACCAGCTTAAATCCCTTTCTCTGAAGAAACTCAAC
TCCCCGAAAAAAACGATTTTTTGCAGTAACTGTTGCCGGAGCAGATGATGAAAAGAAACCAATTGTATCT
CCTACTGCCAGGGGAGCGGCCAGTAGTGGATGAGATTGTATCATCATGAGGATTTTTCCTTTCCATTTAG
TGTCAAAATGAACCCGTTTTGAGATATGTCAGTAGCACTTTCAGTTTATGGGCTTTTTTTGAAAATCGCA
GTGTTCTCTCGTAAATTTTCTCGTCCAATCCCCCCCGAAAAGCCTCAGATTTCACGTAGCGCACCGCCAC
TACTGTATCCATCAAAAAAACTGATAGCTTTTTTAATCATCTGTTGTGCTGCAACTTACTGAAAAAAATG
GATTCATGAAAACGCCGA`}
		/>
	</details>

	<details>
		<summary>example2.txt</summary>

		<p>Create an empty file.</p>
	</details>

	<details>
		<summary>example3.dna</summary>

		<Code lang="text" code={String.raw`ATTAATAAATTTTAGAATAAAAATGTAGAATCGCAAATAATATGATT`} />
	</details>

	<details>
		<summary>example4.rna</summary>

		<Code
			lang="text"
			code={String.raw`% Example RNA sequence

UGAGGUAGUAGGUUGUAUAGUU`}
		/>
	</details>

	<details>
		<summary>MSCV-fwrd.pri</summary>

		<Code
			lang="text"
			code={String.raw`# Murine stem cell virus; Forward

CCCTTGAACCTCCTCGTTCGACC`}
		/>
	</details>

	<details>
		<summary>pBAD-fwrd.pri</summary>

		<Code
			lang="text"
			code={String.raw`# For vectors with E. coli araBAD promoter; Forward
ATGCCATAGCATTTTTATCC`}
		/>
	</details>

	<details>
		<summary>T3.pri</summary>

		<Code
			lang="text"
			code={String.raw`# T3 promoter; Forward

GCAATTAACCCTCACTAAAGG`}
		/>
	</details>
</LessonSection>

<LessonSection id="importing-modules">
	<h3>Importing Modules</h3>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}
</style>
