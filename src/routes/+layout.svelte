<script>
	import Header from '$comp/header.svelte';
	import Footer from '$comp/footer.svelte';

	import './styles.css';
</script>

<div class="app">
	<!-- Insert our header -->
	<Header />

	<!-- Page data gets inserted here -->
	<slot />

	<!-- Insert our footer -->
	<Footer />
</div>
