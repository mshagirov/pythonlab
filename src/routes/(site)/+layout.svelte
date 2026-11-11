<script lang="ts">
	import { page } from '$app/state';
	import PrevNext from '#lib/components/PrevNext.svelte';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { href, toNavPath } from '#lib/href.ts';
	import { neighbours } from '#lib/nav.ts';

	let { children } = $props();

	const current = $derived(neighbours(toNavPath(page.url.pathname)));
</script>

<svelte:head>
	<title>{current ? `${current.title} | Python Lab` : 'Python Lab'}</title>
</svelte:head>

<header>
	<a href={href('')}>🐍 Python Lab</a>
	<ThemeToggle />
</header>

<main>
	{#if current}
		<h1>{current.title}</h1>
	{/if}

	{@render children()}

	{#if current}
		<PrevNext previous={current.previous} next={current.next} />
	{/if}
</main>

<footer>Python Lab — Python workshops and tutorials</footer>
