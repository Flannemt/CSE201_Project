<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	// Invalidate all pages to force remove restricted content
	onMount(async () => {
		await invalidateAll();
		goto('/');
	});
</script>
