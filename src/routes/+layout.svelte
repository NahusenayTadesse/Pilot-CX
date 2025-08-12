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
  
 import {page} from '$app/state'
  
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title> PilotCX - Customer Experience Simplified</title>
	<!-- Primary Meta Tags -->
<meta name="title" content="PilotCX — World-Class Customer Support for SaaS Startups">
<meta name="description" content="PilotCX helps SaaS startups focus on growth by providing specialized, reliable customer support solutions. Keep your customers happy while we handle the tickets.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://pilotcx.com/">
<meta property="og:title" content="PilotCX — World-Class Customer Support for SaaS Startups">
<meta property="og:description" content="We help SaaS startups scale smoothly by delivering expert customer support, so you can focus on building your product.">
<meta property="og:image" content="/images/LinkPreview.webp">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://pilotcx.com/">
<meta property="twitter:title" content="PilotCX — World-Class Customer Support for SaaS Startups">
<meta property="twitter:description" content="We help SaaS startups scale smoothly by delivering expert customer support, so you can focus on building your product.">
<meta property="twitter:image" content="/images/LinkPreview.webp">

<!-- Additional SEO -->
<meta name="keywords" content="SaaS customer support, startup support outsourcing, SaaS help desk, SaaS customer experience, customer success for SaaS, support outsourcing for startups, SaaS scaling support">
<meta name="robots" content="index, follow">
<meta name="author" content="PilotCX">
<link rel="canonical" href="https://pilotcx.com/">

</svelte:head>

{#if !page.url.pathname.includes('/dashboard') && !page.url.pathname.includes('/login')}


<Header {scrolled} />

	
{@render children()}


<Footer />

{:else}
{@render children()}
{/if}




