<svelte:head>
	<title>Home</title>
	<meta name="description" content="MessageBox" />
</svelte:head>

<main>
	<h1>Welcome to MessageBox!</h1>
	<p>Make sure to sign in before you view chats!</p>

	<a href="/threads"> View Chats! </a>

	<p>You haven't clicked the link yet, what's wrong with you??</p>
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
