<script lang="ts">
	import { asset } from '$app/paths';
</script>

<picture>
	<source media="(max-width: 40rem)" srcset={asset('pythonlab-banner-mobile.png')} />
	<img
		class="banner"
		src={asset('pythonlab-banner.png')}
		alt="Python Lab"
		width="3312"
		height="576"
	/>
</picture>

<style>
	.banner {
		display: block;
		width: 100%;
		height: auto;
		max-height: 23dvh;
		margin-block: 0.75rem 1.5rem;
		object-fit: contain;
		object-position: left center;
	}
</style>
