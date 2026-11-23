<script lang="ts">
	import { asset } from '$app/paths';

	let {
		label,
		src,
		mobileSrc,
		fit = 'contain',
	}: {
		label: string;
		src: Parameters<typeof asset>[0];
		mobileSrc?: Parameters<typeof asset>[0];
		fit?: 'contain' | 'cover';
	} = $props();
</script>

<picture>
	{#if mobileSrc}
		<source media="(max-width: 40rem)" srcset={asset(mobileSrc)} />
	{/if}
	<img
		class="banner"
		src={asset(src)}
		alt={label}
		width="3312"
		height="576"
		style:object-fit={fit}
	/>
</picture>

<style>
	.banner {
		display: block;
		width: 100%;
		/* Blend mobile and desktop proportions without a breakpoint-sized jump. */
		height: clamp(calc(100cqw * 4 / 23), calc(7rem + 7.5cqw), calc(100cqw * 8 / 21));
		max-height: 23dvh;
		margin-block: 0.75rem 1.5rem;
		object-position: left center;
	}
</style>
