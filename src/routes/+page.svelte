
<script>
	import About from '$lib/components/About.svelte';
	import Experts from '$lib/components/Experts.svelte';
    import Hero from '$lib/components/Hero.svelte';
	import Packages from '$lib/components/Packages.svelte';
	import Services from '$lib/components/Services.svelte';
    import FAQ from '$lib/components/FAQ.svelte';
</script>

<div class="flex flex-col gap-16 pb-8">

<section id="hero">
    <Hero />
</section>

<section id="services">
    <Services />
</section>

<section id="how-it-works" class="mb-32">
    <Experts />
</section>

<section id="packages">
    <Packages />
</section>

<section id="about">
    <About />
</section>
<section id="faq">
    <FAQ />

</section>
</div>