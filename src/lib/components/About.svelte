<script>
	import RiveAnimation from "$lib/RiveAnimation.svelte";
  let riveInstance;

</script> 
{#snippet mission(image, title, description)}

  <div class="flex flex-col gap-2 justify-center items-center">
    <img src="/icons/{image}.svg" alt="{title} icon" class="lg:w-[125px] lg:h-[125px] w-16   h-16 justify-self-center" loading="lazy">
    <h5 class="text-dark-6 text-center">{title}</h5>
    <p class="text-center lg:px-0 px-4">{description}</p>
     
  </div>
  
{/snippet}
<section class="flex flex-col lg:gap-16 gap-8">
<div class="relative flex flex-col items-center justify-center w-full gap-2 p-4 pt-0">
  <h2 class="text-dark-6">About <span class="text-light-blue-4">Us</span></h2>
  <p class="text-dark-4 lg:w-[882px]">

<span class="text-light-blue-4 text-center">PilotCX </span>
was born out of a simple observation—SaaS startups were building amazing products but struggling to keep up with customer support. We set out to change that by offering specialized, reliable support solutions designed exclusively for SaaS. We help you stay focused on growth while we handle your customer experience with care and expertise. <br/><br />
We believe every SaaS startup deserves world-class customer support without losing focus on building their product. We started our journey after seeing too many brilliant SaaS teams weighed down by endless support tickets. Today, we’re here to be your co-pilot—helping you scale smoothly while keeping customers happy.</p>

      <button class="absolute -bottom-72 -z-1 w-full" >
<div class="hidden lg:block">
<RiveAnimation src="/animations/paper_plane_about_us_loop.riv" {riveInstance}  />
</div>
<div class="block lg:hidden absolute top-96">
<RiveAnimation src="/animations/paper_about_us_mobile.riv" {riveInstance}  />
</div>
</button>

</div>


<div class="flex flex-col gap-4 justify-center items-center">
     <h2 class="text-center">Our <span class="text-light-blue-4">Mission</span></h2>
     <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center items-center align-middle">
       {@render mission('Target', 'Specialization', 'We work with SaaS companies, so every strategy, tool, and process we use is built for your world.')}
       {@render mission('growth', 'Results', 'Our success is defined by quicker resolutions, happier customers, and tangible growth in your support metrics.' )}
       {@render mission('Shield','Reliability', 'You can count on us to deliver dependable, top-tier customer support day after day.')}
      </div>
    </div>

</section>