<script lang="ts">
	import type { DiscordUser } from '$db/models/user';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;

	const { thread, members } = data;
	const memberMap = new Map<string, DiscordUser>();

	for (const member of members) {
		memberMap.set(member.uuid, member.user);
	}

	let url = '';

	//var count = data.thread.messages.length; //counter var

	onMount(() => url = $page.url.pathname);

	onMount(async () => {
	setInterval(fetchMessages, 1000);
	});

	$: messages = data.thread.messages;

	async function fetchMessages() {
		let count = messages.length; //setting again to update every fetch
		let message = null;
		const request = await fetch(window.location.origin + url + '/message/?count=' + count);
		message = await request.json();

		console.log(message.message);
		console.log(count);
		
		if(count != message.count) {
			//messages = [...messages, ...message.updates];
			//messages.push(message.updates);

			if(count != message.count && message != undefined) {
				messages = [...messages, ...(message.updates ?? [])];
			//messages.push(message.updates);
			
				message.message = 'All good'; //resets messages pkt
				count = message.count;
			/*
			let text = document.querySelector("#messageText")
			if(text.value == '') {
				let cancel;
				text.value = localStorage.getItem("val")


				text.addEventListener("keyup", event => {
				if (cancel) clearTimeout(cancel)
					cancel = setTimeout(() => {
					localStorage.setItem("val", event.target.value)
				}, 1000)		
})
*/
	}
			//location.reload(); 
			//count = message.count; //sets count to what the server has
			//message = null; //resets messages pkt
}
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
			<input class="chatbox" name="content" type="text" value="" id='messageText'/> 
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
