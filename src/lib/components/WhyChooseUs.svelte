<script>
   import { fly, fade } from "svelte/transition"
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

{#snippet choose(bg, title, number)}
<div class="flex flex-col items-center justify-end p-[20px] w-[330px] h-[218px]
 bg-light-blue-4 bg-no-repeat bg-right bg-contain rounded-[40px] z-100 hover:scale-110
   transition-transform ease-in-out duration-300"
     style="background-image: url({bg}); z-index: 10;" transition:fly={{x:600, duration:2000, delay: number}}>
    <h5 class="text-dark-1 text-start">{title}</h5>

 </div>
    
{/snippet}



<section id="why-choose-us" class="flex lg:flex-row flex-col items-center justify-center gap-4 justify-self-center ml-[8%] mr-[5%] lg:mt-32 mt-4" bind:this={el}>
 {#if visible}
 <div class="flex flex-col lg:items-start items-center justify-center gap-2 w-full lg:w-[40%]">
    <h2 class="text-dark-6 text-start" transition:fly={{x:-300, duration:2000}}>Why Choose <span class="text-light-blue-4">Us?</span></h2>
    <p class="text-dark-4" in:fly={{y:200, duration:2000}} out:fade>We combine deep SaaS knowledge with reliable, high-quality support so your customers get the help they need, and you get time back to focus on building.</p>
 </div>

 <div class="relative w-full lg:w-[60%] grid lg:grid-cols-2 grid-cols-1 gap-[20px] justify-end" >


    {@render choose('/images/choose1.svg', 'Fast and flexible onboarding', 0)}
    {@render choose('/images/choose2.svg', 'Startup friendly pricing', 200)}
    {@render choose('/images/choose3.svg', 'Reliable Support',400)}
    {@render choose('/images/choose4.svg', 'Actionable Analytics and weekly reports',600)}
  

 </div>
{/if}
</section>
