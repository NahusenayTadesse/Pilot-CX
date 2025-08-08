<script>

</script>

{#snippet choose(bg, title)}
<div class="flex flex-col items-center justify-end p-[20px] w-[330px] h-[218px] bg-light-blue-4 bg-no-repeat bg-right bg-contain rounded-[40px]"
     style="background-image: url({bg}); z-index: 10;">
    <h5 class="text-dark-1 text-start">{title}</h5>

 </div>
    
{/snippet}

<section id="why-choose-us" class="flex lg:flex-row flex-col flex-wrap items-center justify-center justify-self-center ml-[8%] mr-[5%] mt-32">

 <div class="flex flex-col lg:items-start items-center justify-center gap-2 w-full lg:w-[40%]">
    <h2 class="text-dark-6 text-start">Why Choose <span class="text-light-blue-4">Us?</span></h2>
    <p class="text-dark-4">We combine deep SaaS knowledge with reliable, high-quality support so your customers get the help they need, and you get time back to focus on building.</p>
 </div>

 <div class="relative w-full lg:w-[60%] grid lg:grid-cols-2 grid-cols-1 gap-[20px] justify-end">


    {@render choose('/images/choose1.svg', 'Fast and flexible onboarding')}
    {@render choose('/images/choose2.svg', 'Startup friendly pricing')}
    {@render choose('/images/choose3.svg', 'Startup friendly pricing')}
    {@render choose('/images/choose4.svg', 'Actionable Analytics and weekly reports')}
  

 </div>

</section>