
 <script>
	import { btnWhiteFilled } from "$lib/global.svelte";

     let sections = [
         { id: 'services', name: 'Services' },
         { id: 'how-it-works', name: 'How it works?' },
         { id: 'why-choose-us', name: 'Why Choose Us?' },
         { id: 'about', name: 'About Us' }
     ];
 </script>

  <nav class="flex justify-between px-[5%] 
  items-center space-x-4 bg-[#2e86c7] py-8 sticky top-0 z-50">
      <img src="/Logo.svg" alt="Pilot CX Logo" class="w-[190px] h-[46px]" />
      <div class="flex flex-row gap-5 justify-center items-center">
    {#each sections as section}
        <a
            href="#{section.id}"
            class="text-dark-1 transition-transform duration-300 ease-in-out hover:scale-125"
        >
            {section.name}
        </a>
    {/each}   
</div>
      <a href="/contact" class="{btnWhiteFilled} !py-[12px] !text-[17px]">Get a Quote</a>
  </nav>