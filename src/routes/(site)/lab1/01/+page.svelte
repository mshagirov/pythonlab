<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
</script>

<LessonSection id="dna-analyser">
	<h3>DNA Analyser</h3>

	<p>
		In this lab we will build a tool to analyse DNA sequences. We require this program to do the
		following:
	</p>

	<ul>
		<li>It is a command line tool (we will use it from the terminal)</li>
		<li>Accept one or more paths to potential DNA sequence files (file locations)</li>
		<li>Read those files and ignore any comments</li>
		<li>Check if the sequence is a valid DNA data and ignore it if it is not</li>
		<li>Count the bases <code>A</code>, <code>T</code>, <code>G</code>, and <code>C</code></li>
		<li>Compute the GC content (%)</li>
		<li>Estimate sequence&#39;s melting temperature (Tm assuming it is a plasmid)</li>
		<li>Print out all the analysis results to the terminal</li>
	</ul>

	<pre class="terminal-output"><code
			><span class="ansi-art"
				>{String.raw`                                      ▄                         
█▀▀▄  █▀▀▄  ▄▀▀▄     ▄▀▀▄ ▄▄▄    ▄▄▄  █  ▄  ▄   ▄▄▄   ▄▄   ▄ ▄▄ 
█  █  █  █  █▄▄█     █▄▄█ █  █  █  █  █  █  █  ▀▄▄   █▄▄█  █▀   
█▄▄▀  █  █  █  █     █  █ █  █  ▀▄▀█  █  ▀▄▄█  ▄▄▄▀  ▀▄▄▄  █    
                                          ▄▄▀                   
`}</span
			>{String.raw`+--------------------+--------+--------+--------+--------+--------+
┊   Sequence File    ┊ #bases ┊ssMW kDa┊  GC%   ┊ AT/GC  ┊ Tm C°  ┊
+--------------------+--------+--------+--------+--------+--------+
┊     BGH-R.pri      ┊   18   ┊  5.66  ┊ 55.56% ┊  0.80  ┊ 45.18  ┊
+--------------------+--------+--------+--------+--------+--------+
┊   pBAD-fwrd.pri    ┊   20   ┊  6.10  ┊ 35.00% ┊  1.86  ┊  40.5  ┊
+--------------------+--------+--------+--------+--------+--------+
┊       T3.pri       ┊   21   ┊  6.45  ┊ 42.86% ┊  1.33  ┊ 45.33  ┊
+--------------------+--------+--------+--------+--------+--------+

Skipped:
❌     example2.txt      Not a DNA sequence
❌     example4.rna      Not a DNA sequence`}</code
		></pre>
</LessonSection>
<LessonSection id="goals-of-the-project">
	<h3>Learning Objectives</h3>

	<ul>
		<li>Practice the Python commands we learned in the previous session</li>
		<li>Get familiar with your code editor and IDE</li>
		<li>Create and use isolated Python environments for your projects</li>
		<li>Develop Python modules and a CLI tool</li>
		<li>Install and use external Python package</li>
		<li>Have fun with Python!</li>
	</ul>
</LessonSection>

<style>
	.terminal-output {
		background: var(--code-bg);
		color: var(--fg);
	}

	.ansi-art {
		color: #0096ff;
	}
</style>
