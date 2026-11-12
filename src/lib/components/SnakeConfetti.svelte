<script lang="ts">
	import { onMount } from 'svelte';

	let particles = $state<string[]>([]);

	onMount(() => {
		particles = Array.from({ length: 48 }, () => {
			return [
				`--left: ${Math.random() * 100}%`,
				`--drift: ${Math.random() * 24 - 12}vw`,
				`--duration: ${3 + Math.random() * 1.5}s`,
				`--delay: ${Math.random() * 0.7}s`,
				`--spin: ${Math.random() * 720 - 360}deg`,
				`--size: ${1.25 + Math.random()}rem`,
			].join(';');
		});

		const timeout = window.setTimeout(() => (particles = []), 5500);
		return () => window.clearTimeout(timeout);
	});
</script>

{#if particles.length}
	<div class="confetti" aria-hidden="true">
		{#each particles as style, index}
			<span {style}>{index % 3 === 0 ? '✨' : '🐍'}</span>
		{/each}
	</div>
{/if}

<style>
	.confetti {
		position: fixed;
		inset: 0;
		z-index: 10;
		overflow: hidden;
		pointer-events: none;
		user-select: none;
	}

	span {
		position: absolute;
		top: -3rem;
		left: var(--left);
		font-size: var(--size);
		line-height: 1;
		animation: fall var(--duration) var(--delay) linear both;
	}

	@keyframes fall {
		from {
			transform: translate3d(0, 0, 0) rotate(0deg);
		}
		to {
			transform: translate3d(var(--drift), calc(100dvh + 6rem), 0) rotate(var(--spin));
		}
	}
</style>
