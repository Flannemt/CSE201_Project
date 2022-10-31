<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let action: ActionData;
</script>

<section>
	{#each data.thread?.messageCache ?? [] as message}
		<div class="message">
			<h5>{message.author}</h5>
			<p>{message.content}</p>
		</div>
	{/each}
</section>

<section>
	<form method="POST" action="?/message">
		<input name="content" type="text" />
		<button>Send</button>
	</form>
	{#if action?.success}
		<p>Success!</p>
	{/if}
</section>

<style>
	.message {
		display: flex;
		flex-direction: column;
		margin: 4px;
		background-color: antiquewhite;
		padding: 4px;
	}

	.message > h5 {
		margin: 2px;
	}
</style>
