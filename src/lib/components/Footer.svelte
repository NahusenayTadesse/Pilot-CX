 <script>
	import { btnWhiteFilled } from "$lib/global.svelte";
	import { AtSign, Clock4, MapPin, Phone } from "lucide-svelte";

     let sections = [
         { id: '', name: 'Home'},
         { id: '#services', name: 'Services' },
         { id: '#how-it-works', name: 'How it works?' },
         { id: '#why-choose-us', name: 'Why Choose Us?' },
         { id: '#about', name: 'About Us' },
         { id: 'contact', name: 'Get a Quote' }
     ];

     let currentYear =  new Date().getFullYear();
 </script>


<footer class="pt-[220px] lg:pb-[100px] pb-[40px] bg-cover bg-no-repeat bg-[#2e86c7] flex flex-col" style="background-image: url('/Footer.webp');">
     
  <div class="flex flex-col items-center justify-center gap-8 lg:pb-32 pt-16 pb-0">
     <h2 class="text-dark-1 text-center">Scale Confidently With a Support <br /> Team That Knows SaaS</h2>
     <a href="/contact" class="{btnWhiteFilled} !py-[12px] !text-[17px]">Get a Quote</a>
  </div>

  <div class='grid lg:grid-cols-4 grid-cols-1 lg:justify-items-center justify-center items-start content-center gap-4 w-[90%] mx-auto mt-16 '>
      <div class="flex flex-col gap-4 lg:h-[200px] justify-center items-center">
          <img src="/Logo.svg" alt="Pilot CX Logo" class="w-[190px] h-[46px]" />    
          <h4 class="text-dark-1">Your CX Co-pilot</h4>
      </div>
      <div class="flex flex-col gap-4">
          <h6 class="text-dark-1">Quick Links</h6>
          {#each sections as section}
        <a
            href="/{section.id}"
            class="text-dark-1 transition-transform duration-300 ease-in-out hover:scale-125"
        >
            {section.name}
        </a>
    {/each}   
     
      </div>
       <div class="flex flex-col gap-4">
            <h6 class="text-dark-1">Let's Talk Support</h6>


            <p class="text-dark-1"><MapPin class="inline-block mr-1" /> <a href="mailto:info@pilotcx.com">Addis Ababa, Ethiopia</a></p>
            <p class="text-dark-1"><AtSign class="inline-block mr-1" /> <a href="mailto:info@pilotcx.com">info@pilotcx.com</a></p>
            <p class="text-dark-1"><Phone class="inline-block mr-1 fill-white" /> <a href="tel:251xxxxxxx">+251 XXXXXXXX</a></p>
            <p class="text-dark-1"><Clock4 class="inline-block mr-1 " /> 24/7</p>
       </div>
       <!-- <div class="flex flex-col gap-4">
       <h6 class="text-dark-1">Subscribe</h6>
       <form method="POST" class="flex flex-row flex-wrap gap-2">
        <input type="email" name="email" id="email" class="border-1 border-white rounded-[16px] h-12 placeholder:text-white pl-4" placeholder="Subscribe">
        <button class="{btnWhiteFilled} !h-12 !p-2 !px-4 !text-[17px]">Get News</button>
        </form>
         
        

       </div> -->

  </div>
             <p class="text-dark-1 text-center !text-[16px] lg:mt-24 mt-8">&copy; {currentYear} Pilot CX. All Rights Reserved</p>


</footer>

