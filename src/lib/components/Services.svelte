
<script>
    import { btnFilled } from "$lib/global.svelte";
    import { Copy, Brain, ChartNoAxesCombined, Award } from 'lucide-svelte';



</script>
{#snippet card(src, title, description)}
    <div class="bg-light-blue-1 flex flex-col items-start justify-start p-8 border border-light-2 rounded-[40px] w-[400px] gap-2">
            <img {src} alt="{title}" class="w-[40px] h-[40px]" />
            <h5 class="text-dark-6">{title}</h5>
        <p class="text-dark-4">{description}</p>
    </div>
{/snippet}

<section class="flex flex-col items-center justify-center">

 <div class="flex flex-row items-end justify-between w-[90%]">
    <div class="flex flex-col">
    <h2 class="" >Services</h2>
    <p class="text-dark-4">We handle your customer conversations with speed, <br /> care, and SaaS-native expertise</p>
    </div>
   <a href="/contact" class="{btnFilled}">

    Let's Talk Support
   </a>

 </div>
   
 <div class="flex flex-row flex-wrap gap-8 mt-8 w-[90%] justify-between">
     <div class="bg-light-blue-4 flex flex-col items-start justify-start p-8 border border-light-2 rounded-[40px] w-[400px] rotate-[3deg] -mr-2 gap-2">
          <img src="/icons/chat.svg" alt="Live Chat & Email Support" class="w-[40px] h-[40px]" />
            <h5 class="text-dark-1 font-Inter text-[27px] font-[500]">Live Chat & Email Support</h5>
            <p class="text-dark-2 text-[17px]">Deliver fast, friendly, and personalized assistance through real-time chat and email. Tailored to startup SaaS </p>
     </div>
    {@render card('/icons/copy.svg', '2 Tier Technical Support', 'Handle everything from basic troubleshooting to more complex product issues.')}
    {@render card('/icons/brain.svg', 'Knowledge Base & Help Center Management', 'Build and maintain self-service resources')}
    <div class="flex flex-row justify-center gap-16 items-center w-full">
    {@render card('/icons/chart.svg', 'Customer Feedback Collection & Reporting', 'Track CSAT, NPS, and user feedback to generate insights.')}
    {@render card('/icons/star.svg','Quality Assurance & Support Process Optimization', '')}
    </div>
</div>

 
 
</section>