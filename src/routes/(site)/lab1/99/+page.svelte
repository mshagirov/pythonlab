<script lang="ts">
	import { asset } from '$app/paths';
	import Code from '#lib/components/Code.svelte';
	import LessonSection from '#lib/components/LessonSection.svelte';
</script>

<LessonSection id="python-environments">
	<h3>Managing Python Environments</h3>
	<ul>
		<li>
			<a
				href="https://www.kaggle.com/code/shrushtijoshi/analysis-of-dna-sequences-with-python"
				target="_blank"
				rel="noopener">example DNA seq example for venv</a
			>
		</li>
		<li>
			<a href="https://biopython.org/docs/latest/Tutorial/index.html" target="_blank" rel="noopener"
				>biopython</a
			>
		</li>
	</ul>
	<Code
		lang="python"
		code={String.raw`import matplotlib.pyplot as plt
from Bio.Seq import Seq
from Bio.SeqUtils import gc_fraction

# Example DNA sequence (or load from FASTA via SeqIO.read)
dna = Seq(
    "ATGCGTACGTAGCTAGCTAGCATCGATCGTAGCTAGCTAGCATCGTAGCTAGCTAGCATC"
    "GGGGCCCCGGGGCCCCGGGGCCCCGGGGCCCCAAAATTTTAAAATTTTAAAATTTTAAAA"
    "GCGCGCGCGCGCGCGCATATATATATATATATGCGCGCGCGCGCGCGCATATATATATAT"
)

window_size = 15
step = 1
positions = []
gc_values = []

# Calculate GC% in a sliding window using Biopython
for i in range(0, len(dna) - window_size + 1, step):
    subseq = dna[i : i + window_size]
    positions.append(i + window_size // 2)
    gc_values.append(gc_fraction(subseq) * 100)  # gc_fraction returns 0.0 to 1.0

# Plot with Matplotlib
plt.figure(figsize=(10, 4))
plt.plot(positions, gc_values, color="#2b5c8f", linewidth=2, label="GC %")
plt.axhline(50, color="gray", linestyle="--", linewidth=1, label="50% Baseline")
plt.fill_between(positions, gc_values, 50, alpha=0.2, color="#2b5c8f")

plt.title("Sliding-Window GC Content Across DNA Sequence")
plt.xlabel("Nucleotide Position (bp)")
plt.ylabel("GC Content (%)")
plt.ylim(0, 100)
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.show()`}
	/>
	<figure>
		<img
			src={asset('lab1-gc-content.png')}
			alt="Line chart of GC content in a 15-base sliding window across a 180 bp DNA sequence, rising and falling between 0% and 100% around a 50% baseline"
			width="2000"
			height="800"
		/>
	</figure>
</LessonSection>

<LessonSection id="sequence-dot-plot">
	<h3>Sequence Dot Plot</h3>
	<Code
		lang="python"
		code={String.raw`import matplotlib.pyplot as plt
import numpy as np
from Bio.Seq import Seq

seq1 = Seq("ACGTACGTACGTNNNNNNACGTACGTACGT")
seq2 = seq1  # Compare against itself (or use seq1.reverse_complement() for hairpins/palindromes)

window = 4
matrix = np.zeros((len(seq1) - window + 1, len(seq2) - window + 1))

# Populate match matrix
for i in range(len(seq1) - window + 1):
    for j in range(len(seq2) - window + 1):
        if seq1[i : i + window] == seq2[j : j + window]:
            matrix[i, j] = 1

plt.figure(figsize=(6, 6))
plt.imshow(matrix, cmap="Greys", origin="upper")
plt.title(f"Sequence Dot Plot (Window = {window} bp)")
plt.xlabel("Sequence Position (bp)")
plt.ylabel("Sequence Position (bp)")
plt.tight_layout()
plt.show()`}
	/>
	<figure>
		<img
			src={asset('lab1-dot-plot.png')}
			alt="Dot plot comparing a 30 bp DNA sequence with itself using a 4 bp window: a solid diagonal plus off-diagonal dots where the ACGT repeat matches again, and no off-diagonal matches across the NNNNNN stretch"
			width="1200"
			height="1200"
		/>
	</figure>
</LessonSection>

<style>
	figure {
		margin: 1rem 0;
	}

	figure img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--border);
		border-radius: 6px;
	}
</style>
