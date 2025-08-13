<script>
	import RiveAnimation from "$lib/RiveAnimation.svelte";
  let riveInstance;
    import { fly, fade } from 'svelte/transition';

 let el = $state();
  let visible = $state(false);

  $effect(() => {
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Cleanup function (runs when effect re-runs or component unmounts)
    return () => {
      observer.disconnect();
    };
  });


</script> 
{#snippet mission(image, title, description)}

  <div class="flex flex-col gap-2 justify-center items-center">
    <img src="/icons/{image}.svg" alt="{title} icon" class="lg:w-[125px] lg:h-[125px] w-16   h-16 justify-self-center" loading="lazy">
    <h5 class="text-dark-6 text-center">{title}</h5>
    <p class="text-center lg:px-0 px-4">{description}</p>
     
  </div>
  
{/snippet}
<section class="flex flex-col lg:gap-16 gap-8">
 
<div class="relative flex flex-col items-center justify-center w-full gap-2 p-4 pt-0" bind:this={el}>
   {#if visible}
  <h2 class="text-dark-6" transition:fly={{y:-300, duration: 1000}}>About <span class="text-light-blue-4">Us</span></h2>
  <p class="text-dark-4 lg:w-[882px]">

<span class="text-light-blue-4 text-center" transition:fade={{duration: 1000}}>PilotCX </span>
was born out of a simple observation—SaaS startups were building amazing products but struggling to keep up with customer support. We set out to change that by offering specialized, reliable support solutions designed exclusively for SaaS. We help you stay focused on growth while we handle your customer experience with care and expertise. <br/><br />
We believe every SaaS startup deserves world-class customer support without losing focus on building their product. We started our journey after seeing too many brilliant SaaS teams weighed down by endless support tickets. Today, we’re here to be your co-pilot—helping you scale smoothly while keeping customers happy.</p>

      <div class="absolute -bottom-72 -z-1 w-full" >
<div class="hidden lg:block">
<RiveAnimation src="/animations/paper_plane_about_us_loop.riv" {riveInstance}  />
</div>
<div class="block lg:hidden absolute top-96">
<RiveAnimation src="/animations/paper_about_us_mobile.riv" {riveInstance}  />
</div>
</div>
{/if}
</div>



<div class="flex flex-col gap-4 justify-center items-center" bind:this={el}>
  {#if visible}
     <h2 class="text-center" transition:fly={{y:-300, duration: 1000}}>Our <span class="text-light-blue-4" >Mission</span></h2>
     <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center align-middle">
        <div transition:fly={{x:-300, duration: 2000, delay: 500}}>{@render mission('Target', 'Specialization', 'We work with SaaS companies, so every strategy, tool, and process we use is built for your world.')}</div>
        <div transition:fly={{y:-300, duration: 2000, delay: 500}}>{@render mission('growth', 'Results', 'Our success is defined by quicker resolutions, happier customers, and tangible growth in your support metrics.' )}</div>
        <div transition:fly={{x: 300, duration: 2000, delay: 500}}>{@render mission('Shield','Reliability', 'You can count on us to deliver dependable, top-tier customer support day after day.')}</div>
      </div>
        {/if}
    </div>
  

</section>