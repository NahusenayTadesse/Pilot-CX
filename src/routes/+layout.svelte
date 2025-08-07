<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let favicon =  '/favicon.svg';
	

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title> PilotCX - Customer Experience Simplified</title>
</svelte:head>

<Header />

{@render children()}

<Footer />