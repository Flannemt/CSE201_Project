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
		border-radius: 20px;
		margin: 4px;
		background-color: #9EA3B0;
		color: black;
		padding: 4px;
		word-wrap: break-word;
		width: 60%;
	}

	.message > h5 {
		margin: 4px;
		font-size: 120%;
		font-weight: bold;
	}

	p {
		margin: 4px;
	}

</style>
