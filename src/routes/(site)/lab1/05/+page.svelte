<script lang="ts">
	import LessonSection from '#lib/components/LessonSection.svelte';
	import Code from '#lib/components/Code.svelte';
</script>

<LessonSection id="create-project">
	<h3>Create Project</h3>

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

	<blockquote>
		<p>
			The <code>--no-package</code> option creates a simple project with <code>main.py</code>
			and <code>pyproject.toml</code>. Open <code>dna-analyser</code> as your project folder in Zed,
			then open <code>main.py</code>.
		</p>
	</blockquote>
</LessonSection>
