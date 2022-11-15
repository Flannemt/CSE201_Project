<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<section>
	<h1>Select a thread!</h1>

	<div>
		<h4>Share your User ID to be added to threads!</h4>
		<p>{data.user.uuid}</p>
	</div>
</section>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: aliceblue;
	}
</style>
