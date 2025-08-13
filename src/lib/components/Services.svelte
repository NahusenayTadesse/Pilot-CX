
<script>
    import { btnFilled } from "$lib/global.svelte";
	import RiveAnimation from "$lib/RiveAnimation.svelte";

    let riveInstance;

    import { fade, fly } from 'svelte/transition';

    
    




 
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
{#snippet card(src, title, description, number)}
    <div class="bg-light-blue-1 flex flex-col items-start justify-start p-8 
    border border-light-2 rounded-[40px] lg:w-[400px] gap-2
    transition-transform ease-in-out duration-300 hover:scale-110 z-10" in:fade={{ duration: 1000, delay: number }} out:fade >
            <img {src} alt="{title}" class="w-[40px] h-[40px]" loading="lazy"/>
            <h5 class="text-dark-6">{title}</h5>
        <p class="text-dark-4">{description}</p>
    </div>
{/snippet}


<section class="flex flex-col items-center justify-center px-8">

 <div class="flex flex-row flex-wrap gap-4 items-end justify-between lg:w-[80%] w-[100%]" bind:this={el} >
    <div class="flex flex-col">
    <h2 class="" >Services</h2>
    <p class="text-dark-4">We handle your customer conversations with speed, <br class="hidden lg:flex" /> care, and SaaS-native expertise</p>
    </div>
   <a href="/contact" class="{btnFilled} animate-bounce">

    Let's Talk Support
   </a>

 </div>
   
 <div class="relative grid lg:grid-cols-3 grid-cols-1 gap-8 mt-8 justify-center" bind:this={el}>
     <div class="absolute -top-48 -z-1 w-full" >
<RiveAnimation src="/animations/paper_plan_for_service_section_loop.riv" {riveInstance}  />
     </div>
     {#if visible}
     <div 
     class="bg-light-blue-4 flex flex-col items-start justify-start
      p-8 border border-light-2 rounded-[40px] lg:w-[400px] rotate-[3deg] hover:rotate-0 -mr-2 gap-2
      transition-transform ease-in-out duration-300 hover:scale-110"
       in:fade={{duration: 1000, delay: 300 }} out:fade
       >
          <img src="/icons/chat.svg" alt="Live Chat & Email Support" class="w-[40px] h-[40px]"  />
            <h5 class="text-dark-1 font-Inter text-[27px] font-[500]">Live Chat & Email Support</h5>
            <p class="text-dark-2 text-[17px]">Deliver fast, friendly, and personalized assistance through real-time chat and email. Tailored to startup SaaS </p>
     </div>
     
    {@render card('/icons/copy.svg', '2 Tier Technical Support', 'Handle everything from basic troubleshooting to more complex product issues.', 100)}
    {@render card('/icons/brain.svg', 'Knowledge Base & Help Center Management', 'Build and maintain self-service resources', 300)}
    {@render card('/icons/chart.svg', 'Customer Feedback Collection & Reporting', 'Track CSAT, NPS, and user feedback to generate insights.', 500)}
    {@render card('/icons/star.svg','Quality Assurance & Support Process Optimization', '', 700)}
    {/if}
</div>

 
 
</section>