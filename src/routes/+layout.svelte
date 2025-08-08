<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	let favicon =  '/favicon.svg';
	

	let { children } = $props();
	let scrolled = $state(false);
	onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 150;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();          

    return () => window.removeEventListener('scroll', onScroll);
  });
  

  
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title> PilotCX - Customer Experience Simplified</title>
</svelte:head>


<Header {scrolled} />

	
{@render children()}


<Footer />


