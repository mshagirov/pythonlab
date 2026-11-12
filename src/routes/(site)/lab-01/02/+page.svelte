<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
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

	<Code
		lang="python"
		code={String.raw`                                      ▄                         
█▀▀▄  █▀▀▄  ▄▀▀▄     ▄▀▀▄ ▄▄▄    ▄▄▄  █  ▄  ▄   ▄▄▄   ▄▄   ▄ ▄▄ 
█  █  █  █  █▄▄█     █▄▄█ █  █  █  █  █  █  █  ▀▄▄   █▄▄█  █▀   
█▄▄▀  █  █  █  █     █  █ █  █  ▀▄▀█  █  ▀▄▄█  ▄▄▄▀  ▀▄▄▄  █    
                                          ▄▄▀                   
Analysing sequences:
+--------------------+--------+--------+--------+--------+--------+
┊   Sequence File    ┊ #bases ┊ssMW kDa┊  GC%   ┊ AT/GC  ┊ Tm C°  ┊
+--------------------+--------+--------+--------+--------+--------+
┊     BGH-R.pri      ┊   18   ┊  5.66  ┊ 55.56% ┊  0.80  ┊   56   ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example1.txt    ┊  6458  ┊1998.87 ┊ 34.42% ┊  1.91  ┊ 17362  ┊
+--------------------+--------+--------+--------+--------+--------+
┊    example3.dna    ┊   47   ┊ 14.61  ┊ 14.89% ┊  5.71  ┊  108   ┊
+--------------------+--------+--------+--------+--------+--------+
┊   MSCV-fwrd.pri    ┊   23   ┊  6.93  ┊ 60.87% ┊  0.64  ┊   74   ┊
+--------------------+--------+--------+--------+--------+--------+
┊   pBAD-fwrd.pri    ┊   20   ┊  6.10  ┊ 35.00% ┊  1.86  ┊   54   ┊
+--------------------+--------+--------+--------+--------+--------+
┊       T3.pri       ┊   21   ┊  6.45  ┊ 42.86% ┊  1.33  ┊   60   ┊
+--------------------+--------+--------+--------+--------+--------+

Skipped:
❌     example2.txt      Not a DNA sequence
❌     example4.rna      Not a DNA sequence`}
	/>
</LessonSection>
<LessonSection id="goals-of-the-project">
	<h3>Goals of the Project</h3>

	<ul>
		<li>Practice Python commands that we have learned from the previous session</li>
		<li>Get familiar with your tooling (e.g., IDE, your machine etc)</li>
		<li>Learn what is a Python environment</li>
		<li>Learn how to set up a Python environment for your project</li>
		<li>Practice writing (re-usable) Python modules</li>
		<li>Have fun with Python!</li>
	</ul>
</LessonSection>
