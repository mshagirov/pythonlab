<script lang="ts">
	import HomeBanner from '#lib/components/HomeBanner.svelte';
	import { href } from '#lib/href.ts';
	import { sections } from '#lib/nav.ts';
</script>

<HomeBanner />

<p><strong>Workshops and Tutorials</strong></p>

<ul>
	{#each sections as section}
		<li><a href={href(section.path)}>{section.title}</a></li>
	{/each}
</ul>

<p><strong>Planned Workshop Topics</strong></p>

<ul>
	<li>Preparing figures, tabular data. Working with images.</li>
</ul>
