<script lang="ts">
	import { onMount } from 'svelte';
	import { cycleTheme, getTheme } from '#lib/theme.svelte.ts';

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	const theme = $derived(mounted ? getTheme() : 'system');
	const label = $derived(`Theme: ${theme}`);
</script>

{#snippet moon()}
	<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
		<path
			d="M10.854 1.064A7.5 7.5 0 1 0 10.854 14.936A7 7 0 0 1 10.854 1.064Z"
			fill="currentColor"
		/>
	</svg>
{/snippet}

{#snippet sun()}
	<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
		<circle cx="8" cy="8" r="3.2" fill="currentColor" />
		<g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
			<line x1="8" y1="1" x2="8" y2="3" />
			<line x1="8" y1="13" x2="8" y2="15" />
			<line x1="1" y1="8" x2="3" y2="8" />
			<line x1="13" y1="8" x2="15" y2="8" />
			<line x1="3.05" y1="3.05" x2="4.46" y2="4.46" />
			<line x1="12.95" y1="3.05" x2="11.54" y2="4.46" />
			<line x1="3.05" y1="12.95" x2="4.46" y2="11.54" />
			<line x1="12.95" y1="12.95" x2="11.54" y2="11.54" />
		</g>
	</svg>
{/snippet}

<button type="button" onclick={cycleTheme} aria-label={label} title={label}>
	{#if theme === 'dark'}
		{@render moon()}
	{:else if theme === 'light'}
		{@render sun()}
	{:else}
		{@render moon()}
		<span class="divider"></span>
		{@render sun()}
	{/if}
</button>

<style>
	button {
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		width: 3.25rem;
		height: 2rem;
		padding: 0;
	}

	.divider {
		flex: 0 0 auto;
		width: 1px;
		height: 14px;
		background: currentColor;
		opacity: 0.6;
	}
</style>
