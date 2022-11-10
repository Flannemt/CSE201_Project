<script lang="ts">
	import type { DiscordUser } from '$db/models/user';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let action: ActionData;

	const { thread, members } = data;
	const memberMap = new Map<string, DiscordUser>();

	for (const member of members) {
		memberMap.set(member.uuid, member.user);
	}
</script>

<section>
	{#each data.thread.messages ?? [] as message (message.uuid)}
		<div class="message">
			<h5>{memberMap.get(message.author)?.username}</h5>
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

<section>
	<form method="POST" action="?/invite">
		<input name="content" type="text" placeholder="User ID" />
		<button>Invite</button>
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
