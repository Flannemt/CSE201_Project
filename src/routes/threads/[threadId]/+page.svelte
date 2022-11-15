<script lang="ts">
	import type { DiscordUser } from '$db/models/user';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';

	export let data: PageData;

	const { members } = data;
	const memberMap = new Map<string, DiscordUser>();

	for (const member of members) {
		memberMap.set(member.uuid, member.user);
	}

	let url = '';
	let intervalId: any;

	onMount(async () => {
		url = $page.url.pathname;
		intervalId = setInterval(fetchMessages, 1000);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	$: messages = data.thread.messages;

	async function fetchMessages() {
		let count = messages.length; //setting again to update every fetch

		const request = await fetch(window.location.origin + url + '/message/?count=' + count);
		const message = await request.json();

		if (!message || count === message.count) {
			return; // No new messages
		}

		if (message?.updates) {
			messages = [...messages, ...(message.updates ?? [])];
		}

		count = message.count;
	}
</script>

<main>
	<section class="messages">
		<div>
			{#each messages ?? [] as message (message.uuid)}
				<div class="message">
					<h5>
						{memberMap.get(message.author)?.username}
						<span class="timestamp"
							>{new Date(message.timestamp).toLocaleTimeString(undefined, {
								timeStyle: 'short'
							})}</span
						>
					</h5>
					<!-- button for adding friends here -->
					<form method="POST" action="?/friend">
						<input name="friendId" type="text" value={message.author} hidden />
						<button>Send</button>
					</form>
					<p>{message.content}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="inputs">
		<form method="POST" action="?/message">
			<input class="chatbox" name="content" type="text" value="" id="messageText" />
			<button>Send</button>
		</form>
		<form method="POST" action="?/invite">
			<input name="content" type="text" placeholder="User ID" />
			<button>Invite</button>
		</form>
	</section>
</main>

<style>
	.messages {
		display: flex;
		overflow: auto;
		flex-direction: column-reverse;
		height: 100%;
	}

	.message {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		margin: 4px;
		background-color: #9ea3b0;
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

	.chatbox {
		width: 50%;
		padding: 0.5rem;
		margin-top: 4px;
		word-break: break-word;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
</style>
