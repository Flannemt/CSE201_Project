<script>
	// This script is executed on the server and the client
	console.log('Hello, someone opened the main page');

	let counter = 0;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<h1>This is a super complex page</h1>
	<p>It's so complex that it doesn't even have a button</p>

	<!-- Simply adding 1 to the counter automatically updates the page -->
	<button on:click={() => (counter += 1)}>I lied</button>

	<!-- Simple if statement for displaying different data -->
	{#if counter > 0}
		<p>You clicked {counter} times</p>
	{:else if counter === 0}
		<p>You haven't clicked the button yet, what's wrong with you</p>
	{/if}

	<!-- Api info -->
	<p>Test out how server requests work by going to src/routes/api/demo/+server.ts</p>
	<a href="/api/demo">Go to the API demo</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
