<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="command-line-arguments">
	<h3>Passing command-line arguments</h3>

	<p>
		So far, the file path has been written directly in <code>main()</code>. Let's accept file paths
		from the command line instead, so we can read multiple files without editing the program.
	</p>

	<ol>
		<li>
			<p>
				At the top of <code>main.py</code>, import Python's <code>sys</code> module.
			</p>

			<Code lang="python" code={String.raw`import sys`} />
		</li>
		<li>
			<p>
				Change your function definition to <code>def main(*input_files):</code>. The
				<code>*</code> collects positional arguments into a tuple called <code>input_files</code>,
				so <code>main</code> can accept any number of file paths:
			</p>

			<Code
				lang="python"
				code={String.raw`def main(*input_files):
    # Read, clean and print each file's contents.`}
			/>

			<p>
				Write a loop to read <code>input_files</code> one-by-one and print them to the CLI. For each
				path, call <code>read_file</code>, pass the returned text to <code>clean_input</code>, then
				print the cleaned sequence. Remove the fixed <code>'examples/BGH-R.pri'</code> path from the function.
			</p>
		</li>
		<li>
			<p>
				<code>sys.argv</code> is a list of command-line arguments. The first item,
				<code>sys.argv[0]</code>, is the script's name;
				<code>sys.argv[1:]</code> contains the arguments that follow it. For example:
			</p>

			<Code lang="bash" code={String.raw`uv run main.py examples/BGH-R.pri examples/BGH-R.pri`} />

			<p>
				Here, <code>sys.argv[0]</code> is <code>'main.py'</code> and <code>sys.argv[1:]</code>
				contains the same file path twice, so the program will read
				<code>examples/BGH-R.pri</code> twice. Try temporarily printing the
				<code>sys.argv</code> variable itself to see the list.
			</p>
		</li>
		<li>
			<p>
				Update the call at the bottom of <code>main.py</code> to pass the command-line file paths to
				<code>main</code>, e.g. <code>main(*sys.argv[1:])</code>.
			</p>

			<blockquote>
				<p>
					Here, <code>*</code> unpacks the list into separate arguments. Without it,
					<code>main</code> would receive one list rather than individual file paths. For a single
					input file, we could use <code>main(sys.argv[1])</code>, but we use
					<code>sys.argv[1:]</code> because we plan to expand this tool to read multiple files.
				</p>
			</blockquote>
		</li>
		<li>
			<p>
				Add an input check before calling <code>main</code>. The <code>main.py</code> should print a
				usage message <code>DNA Analyser requires at least 1 input file</code> and exit with code
				<code>1</code>
				using
				<a href="https://docs.python.org/3/library/sys.html#sys.exit" target="_blank" rel="noopener"
					><code>sys.exit</code></a
				>.
			</p>

			<blockquote>
				<p>
					<strong>Tip:</strong> <code>len(sys.argv)</code> may be of help. For the usage message,
					you may use <code>sys.argv[0]</code> to print the script's name, for example:
					<code
						>{String.raw`f'\t{sys.argv[0]} input_file1 [ input_file2 [ input_file3 ... ] ... ]\n'`}</code
					>
				</p>
			</blockquote>
		</li>
		<li>
			<p>
				Save and run <code>main.py</code> from the Zed's terminal using the command above. The clean
				sequence should print twice. A missing file should trigger a warning and missing argument to
				<code>main.py</code>
				should print the usage and exit the program.
			</p>
		</li>
	</ol>
</LessonSection>

<LessonSection id="more-examples">
	<h3>Test Sequences</h3>

	<p>Create the following files and read them all at once. E.g.:</p>

	<Code lang="bash" code={String.raw`uv run main.py examples/*`} />

	<h4>More Examples</h4>

	<p>
		Create the following files inside the <code>examples/</code> folder. Make sure to preserve the
		characters including spaces. <code>example2.txt</code> must be an empty file (no contents).
	</p>

	<details>
		<summary><code>example1.txt</code></summary>

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
		<summary><code>example2.txt</code></summary>

		<p>Create an empty file.</p>
	</details>

	<details>
		<summary><code>example3.dna</code></summary>

		<Code lang="text" code={String.raw`ATTAATAAATTTTAGAATAAAAATGTAGAATCGCAAATAATATGATT`} />
	</details>

	<details>
		<summary><code>example4.rna</code></summary>

		<Code
			lang="text"
			code={String.raw`% Example RNA sequence

UGAGGUAGUAGGUUGUAUAGUU`}
		/>
	</details>

	<details>
		<summary><code>MSCV-fwrd.pri</code></summary>

		<Code
			lang="text"
			code={String.raw`# Murine stem cell virus; Forward

CCCTTGAACCTCCTCGTTCGACC`}
		/>
	</details>

	<details>
		<summary><code>pBAD-fwrd.pri</code></summary>

		<Code
			lang="text"
			code={String.raw`# For vectors with E. coli araBAD promoter; Forward
ATGCCATAGCATTTTTATCC`}
		/>
	</details>

	<details>
		<summary><code>T3.pri</code></summary>

		<Code
			lang="text"
			code={String.raw`# T3 promoter; Forward

GCAATTAACCCTCACTAAAGG`}
		/>
	</details>
</LessonSection>

<LessonSection id="read-seq-files">
	<h3><code>read_batch()</code></h3>

	<p>
		Let's move the loop into the reader module so that <code>main()</code> only coordinates reading the
		files and displaying the results.
	</p>

	<ol>
		<li>
			<p>
				In <code>reader.py</code>, create a function called <code>read_batch(file_paths)</code>. It
				should accept a
				<a
					href="https://docs.python.org/3/library/stdtypes.html#lists"
					target="_blank"
					rel="noopener">list</a
				>
				of strings <code>file_paths</code> and return a
				<a
					href="https://docs.python.org/3/builtins/stdtypes.html#dict"
					target="_blank"
					rel="noopener">dictionary</a
				>
				of sequences as strings. Move the loop from <code>main()</code>
				into this function. Instead of printing each sequence, store it in a dictionary called
				<code>sequences</code>, using the file path as the key, then return the dictionary:
			</p>
		</li>
		<li>
			<p>
				Call <code>read_file</code> and <code>clean_input</code> from <code>read_batch</code>
				in <code>reader.py</code>. This function still stores empty strings for empty or missing
				files, and does not yet validate DNA sequences.
			</p>
		</li>
		<li>
			<p>
				In <code>main.py</code>, replace the import of <code>read_file</code> and
				<code>clean_input</code> with just <code>read_batch</code>.
			</p>

			<Code lang="python" code={String.raw`from reader import read_batch`} />

			<blockquote>
				<p>Keep <code>import sys</code>, we will use it for command-line arguments.</p>
			</blockquote>
		</li>
		<li>
			<p>
				Update <code>main()</code> to pass <code>input_files</code> to your new function and print
				the first twenty characters of each returned sequence. Use the dictionary's
				<code>items()</code> method to get each file path and its sequence:
			</p>

			<Code
				lang="python"
				code={String.raw`def main(*input_files):
    sequences = read_batch(input_files)

    for file_path, sequence in sequences.items():
        print(file_path)
        print(sequence[:20])`}
			/>

			<p>
				Keep the input check and <code>main(*sys.argv[1:])</code> call at the bottom of
				<code>main.py</code>. Save both files and run <code>uv run main.py examples/*</code>. Check
				that each file path is followed by the first twenty characters of its cleaned sequence.
			</p>
		</li>
	</ol>

	<blockquote>
		<p>
			A dictionary stores one value per key. If the same file path is passed twice, it will be read
			twice but appear only once in the returned dictionary.
		</p>
	</blockquote>
</LessonSection>

<style>
	details {
		border-color: transparent;
	}
</style>
