
 <script>
	import { btnWhiteFilled } from "$lib/global.svelte";
	import { AlignJustify, X } from "lucide-svelte";
	import { slide } from "svelte/transition";

     let sections = [
         { id: 'services', name: 'Services' },
         { id: 'how-it-works', name: 'How it works?' },
         { id: 'why-choose-us', name: 'Why Choose Us?' },
         { id: 'about', name: 'About Us' }
     ];

     let mobileSections = [
         { id: '/', name: 'Home'},
         { id: 'services', name: 'Services' },
         { id: 'how-it-works', name: 'How it works?' },
         { id: 'why-choose-us', name: 'Why Choose Us?' },
         { id: 'about', name: 'About Us' }
     ]

     let menu = $state(false);

      function onclick() {
         if(menu ===  true) return menu = false;
         else return menu = true;
      }

    let  Menuicon = $derived (menu ? X : AlignJustify);



  
 </script>

    <nav class="hidden lg:flex justify-between px-[10%] 
    items-center space-x-4 bg-[#2e86c7] py-8 sticky top-0 z-50 ">
        <a href="/">
        <img src="/Logo.svg" alt="Pilot CX Logo" class="w-[190px] h-[46px]" />
            </a>
        <div class="flex flex-row gap-5 justify-center items-center">
        {#each sections as section}
            <a
                href="/#{section.id}"
                class="text-dark-1 transition-transform duration-300 ease-in-out hover:scale-125"
            >
                {section.name}
            </a>
        {/each}   
    </div>
        <a href="/contact" class="{btnWhiteFilled} !py-[12px] !text-[17px]">Get a Quote</a>
    </nav>


 <!-- Nav Mobile --> 

  <nav class="flex lg:hidden flex-row justify-between items-center p-4 sticky top-0 z-50 space-x-4 bg-[#2e86c7]">
     <a href="/">
      <img src="/Logo.svg" alt="Pilot CX Logo" class="w-[150px] h-[60px]" />
        </a>
     <div>
       
         <button {onclick} >
        <Menuicon class="text-white" /> </button>
        {#if menu} 
         
         <div class="flex flex-col w-[100%] absolute top-16 p-2 right-0  z-100 gap-2 justify-center items-start pl-4">
        {#each mobileSections as section}
            <a
                href="/#{section.id}"
                class="text-dark-1 transition-transform duration-300 ease-in-out hover:scale-125"
             transition:slide|global {onclick}>
                {section.name} 
            </a>
        {/each}  
        </div>
         
        {/if}

        


     </div>
  </nav>