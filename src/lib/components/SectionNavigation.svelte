<script lang="ts">
	import type { NavStep } from '#lib/nav.ts';

	let { steps, active }: { steps: NavStep[]; active: number } = $props();
</script>

<nav class="section-navigation" aria-label="Lesson sections">
	<ol class="step-track">
		{#each steps as step, index}
			<li class:reached={index <= active}>
				<a
					href={`#${step.id}`}
					aria-label={`Section ${index + 1} of ${steps.length}: ${step.title}`}
					aria-current={index === active ? 'step' : undefined}
					title={step.title}
					data-sveltekit-reset="false"><span class="node"></span></a
				>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.section-navigation {
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 100%;
	}

	.step-track {
		display: flex;
		flex-shrink: 0;
		max-width: 100%;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.step-track li {
		position: relative;
		min-width: 0;
		display: flex;
		align-items: center;
	}

	.step-track li + li::before {
		content: '';
		position: absolute;
		right: calc(50% + 0.375rem);
		width: calc(100% - 0.75rem);
		height: 2px;
		background: var(--border);
		pointer-events: none;
	}

	.step-track li.reached + li.reached::before {
		background: var(--link);
	}

	.step-track a {
		display: grid;
		place-items: center;
		width: 1.75rem;
		max-width: 100%;
		height: 2rem;
		border-radius: 4px;
	}

	.node {
		width: 0.5rem;
		height: 0.5rem;
		border: 2px solid var(--border);
		border-radius: 50%;
		background: var(--bg);
	}

	.reached .node {
		border-color: var(--link);
		background: var(--link);
	}

	[aria-current='step'] .node {
		outline: 2px solid var(--link);
		outline-offset: 3px;
	}

	a:focus-visible {
		outline: 2px solid var(--link);
		outline-offset: 3px;
	}

	.step-track a:hover {
		background: var(--code-bg);
	}
</style>
