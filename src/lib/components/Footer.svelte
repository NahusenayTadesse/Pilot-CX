 <script>
	import { btnWhiteFilled } from "$lib/global.svelte";
	import { AtSign, MapPin } from "lucide-svelte";

     let sections = [
         { id: 'services', name: 'Services' },
         { id: 'how-it-works', name: 'How it works?' },
         { id: 'why-choose-us', name: 'Why Choose Us?' },
         { id: 'about', name: 'About Us' }
     ];
 </script>


<footer class="pt-[220px] pb-[100px] bg-cover bg-no-repeat bg-[#2e86c7] flex flex-col" style="background-image: url('/Footer.webp');">
     
  <div class="flex flex-col items-center justify-center gap-8 pb-32 pt-16">
     <h2 class="text-dark-1 text-center">Scale Confidently With a Support <br /> Team That Knows SaaS</h2>
     <a href="/contact" class="{btnWhiteFilled} !py-[12px] !text-[17px]">Get a Quote</a>
  </div>

  <div class='flex flex-row flex-wrap justify-evenly items-start w-[90%] mx-auto mt-16 '>
      <div class="flex flex-col gap-4 h-[200px]">
          <img src="/Logo.svg" alt="Pilot CX Logo" class="w-[190px] h-[46px]" />
          <h4 class="text-dark-1">Your CX Co-pilot</h4>
      </div>
      <div class="flex flex-col gap-1">
          <h6 class="text-dark-1">Quick Links</h6>
          {#each sections as section}
        <a
            href="#{section.id}"
            class="text-dark-1 transition-transform duration-300 ease-in-out hover:scale-125"
        >
            {section.name}
        </a>
    {/each}   
     
      </div>
       <div>
            <h6 class="text-dark-1">Let's Talk Support</h6>


            <p class="text-dark-1"><MapPin class="inline-block mr-1 " /> <a href="mailto:info@pilotcx.com">Addis Ababa, Ethiopia</a></p>
            <p class="text-dark-1"><AtSign class="inline-block mr-1" /> <a href="mailto:info@pilotcx.com">info@pilotcx.com</a></p>
       </div>

  </div>
</footer>

