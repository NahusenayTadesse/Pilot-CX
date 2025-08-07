<script>
  let dedicated = ['Fully managed, dedicated team aligned with your SaaS brand voice',
  'No task-sharing, full focus on your brand, tools and customers',
  'Ongoing QA and coaching included (no extra fees)',
  'Scaled Operations: easily add seats / adjust shifts monthly',
  'Optional weekend and holiday support.'
  ];
   
  let hourly = [
    'Multi-channel(Email and live chat)',
    'Ideal for low‑complexity SaaS support (billing, FAQs, basics)',
    'Transparent hourly billing with no lock‑in'
  ];

  let hourlyTech = [
    'Trained SaaS-specialist agents with troubleshooting capabilities',
    'Includes escalation, product-specific support, integrations help',
    'Option for part-time hourly coverage or burst load handling'

  ];

  let payPer = [
     'All-inclusive: agent time, tools, quality assurance, routing, reporting',
     'Ideal for startups with predictable volume or simple support workflows'
  ]
</script>

{#snippet packages(array, title)}
  <div class="rounded-[40px] px-8 py-8 lg:w-[600px] lg:h-[400px] bg-light-blue-1 
  bg-bottom-right bg-no-repeat bg-[length:200px_auto] flex flex-col gap-4" 
  style="background-image: url('/images/cloud.svg'); z-index-10">
      <h4>{title}</h4>
      {#each array as list}
      <div class="flex flex-row gap-2">
       <img src="/icons/listPlane.svg" alt="Arrow">
        <p>{list}</p>
       </div>
      {/each}
  </div>
  
{/snippet}
<section class="flex flex-col items-center justify-center w-full gap-4 p-4" >
  <h2 class="text-dark-6">Packages</h2>
  <p class="text-dark-4 lg:w-[447px]">Whether you're just getting started or scaling fast, we’ve got a support package that fits your journey </p>
   
  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 pt-4">

    <div class="relative rounded-[40px] px-8 py-8 lg:w-[600px] lg:h-[400px] bg-light-blue-4   
  bg-bottom-right bg-no-repeat bg-[length:200px_auto] flex flex-col gap-4" 
  style="background-image: url('/images/cloud.svg'); z-index-10">
      <h4 class="text-dark-1">Dedicated agents(24/7) </h4>
      <img src="/images/cloudAbsolute.svg" 
      class="w-[100px] absolute top-1 right-2 hidden lg:block" alt="Cloud">
      {#each dedicated as list}
      <div class="flex flex-row gap-2">
       <img src="/icons/listPlaneWhite.svg" alt="Arrow">
        <p class="text-dark-1">{list}</p>
       </div>
      {/each}
  </div>
     {@render packages(hourly, 'Hourly basic')}
     {@render packages(hourlyTech, 'Hourly Tech')}
     {@render packages(payPer, 'Pay Per Resolution')}
  </div>
  

</section> 
