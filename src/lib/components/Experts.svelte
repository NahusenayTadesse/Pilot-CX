 <script>

 </script>

{#snippet steps(picture, title, titlespan, description, orientation)}

  <div class="flex {orientation ? 'flex-row': 'flex-row-reverse'} flex-wrap items-center justify-between w-[80%] gap-0">
    <div class="w-1/2 {orientation ? '':'flex items-end justify-end'}">
        <img src={picture} alt={titlespan} class="w-[434px] h-[442px] object-cover" />
    </div>
    <div class="w-1/2 flex flex-col gap-2 items-start">
       <h4 class="text-dark-6 font-semibold">{title} : <span class="text-light-blue-4">{titlespan}</span> </h4>
       <p class="text-dark-4">{description}</p>
    </div>
  </div>
{/snippet}

{#snippet choose(bg, title)}
<div class="flex flex-col items-center justify-end p-[20px] w-[330px] h-[218px] bg-light-blue-4 bg-no-repeat bg-right bg-contain rounded-[40px]"
     style="background-image: url({bg}); z-index: 10;">
    <h5 class="text-dark-1 text-start">{title}</h5>

 </div>
    
{/snippet}

<section class="flex flex-col items-center justify-center w-full gap-2">
    <div class="flex flex-col h-[50vh] mt-8">
     <h1 class="text-[96px] text-dark-6">Experts On <span class="text-light-blue-4">Saas</span> Technology</h1>
     </div>
     <div class="flex flex-col">
        <h2 class="text-dark-6">How it Works<span class="text-light-blue-4">?</span></h2>
     </div>

     {@render steps('/images/step1.svg', 'Step 1', 'Understand Your Needs', 
     ' We begin with a 30-minute call to explore your product, support setup, and goals. It’s fast, focused, and friendly.', true)}
     {@render steps('/images/step2.svg', 'Step 2', 'Your Custom Plan', 
     'Within 48 hours, we’ll send you a custom plan with clear pricing, what’s included, and how we’ll handle your customer support.', false)}
     
     {@render steps('/images/step3.svg', 'Step 3', 'Strategy Meets Structure', 
     'A kickoff call to align on tone, tools, support volume, escalation process, and success metrics.', true)}

     {@render steps('/images/step4.svg', 'Step 4', 'Your Brand, Our Agents', 
        'We train your support team on your tools, product, tone, and customer scenarios—fast and thoroughly.', false
     )}



</section>

<section id="why-choose-us" class="flex flex-row flex-wrap items-center justify-center justify-self-center ml-[8%] mr-[5%]">

 <div class="flex flex-col items-start justify-center gap-2 w-[40%]">
    <h2 class="text-dark-6 text-start">Why Choose <span class="text-light-blue-4">Us?</span></h2>
    <p class="text-dark-4">We combine deep SaaS knowledge with reliable, high-quality support so your customers get the help they need, and you get time back to focus on building.</p>
 </div>

 <div class="w-[60%] grid grid-cols-2 gap-[20px] justify-end">
    {@render choose('/images/choose1.svg', 'Fast and flexible onboarding')}
    {@render choose('/images/choose2.svg', 'Startup friendly pricing')}
    {@render choose('/images/choose3.svg', 'Startup friendly pricing')}
    {@render choose('/images/choose4.svg', 'Actionable Analytics and weekly reports')}
  

 </div>

</section>