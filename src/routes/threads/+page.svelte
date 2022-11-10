<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let action: ActionData;

	const { threads } = data;
</script>

<section>
	{#each threads ?? [] as thread (thread)}
		<div class="thread">
			<a href="/threads/{thread}">{thread}</a>
		</div>
	{/each}
</section>

<section>
	<form method="POST" action="?/create">
		<!-- <input name="name" type="text"> -->
		<button>Create Thread</button>
	</form>
	{#if action?.success}
		<p>Success! Created new thread here</p>
		<a href="/threads/{action.thread?.uuid}">Link to new thread</a>
	{/if}
</section>
