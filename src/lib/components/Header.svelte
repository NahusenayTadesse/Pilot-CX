
 <script>
	import { afterNavigate } from "$app/navigation";
	import { btnFilled, btnWhiteFilled } from "$lib/global.svelte";
	import { AlignJustify, X } from "lucide-svelte";
	import { fly, slide } from "svelte/transition";

     let sections = [
         { id: 'services', name: 'Services' },
         { id: 'how-it-works', name: 'How it works?' },
         { id: 'why-choose-us', name: 'Why Choose Us?' },
         { id: 'about', name: 'About Us' }
     ];

     let mobileSections = [
         { id: '', name: 'Home'},
         { id: '#services', name: 'Services' },
         { id: '#how-it-works', name: 'How it works?' },
         { id: '#why-choose-us', name: 'Why Choose Us?' },
         { id: '#about', name: 'About Us' },
         { id: 'contact', name: 'Get a Quote' }

     ]

     let menu = $state(false);

      function onclick() {
         if(menu ===  true) return menu = false;
         else return menu = true;
      }

    let  Menuicon = $derived (menu ? X : AlignJustify);
  let {scrolled=false} = $props();

    let visible = $state(false)
  let duration;

  afterNavigate(({ from }) => {
    duration = from === null ? 600 : 0;
    visible = true;
  });

  



  
 </script>
  {#if visible}
    <nav class="hidden lg:flex justify-between px-[10%] 
    items-center space-x-4  py-8 fixed top-0 z-50 w-screen bg-[#2e86c7]  
    {scrolled ? 'backdrop-blur-lg bg-white/30': 'bg-transparent'} 
    transition-all duration-300 ease-in-out"
    transition:fly={{y:-200, duration: 1000, delay: 500 }}>
        <a href="/" title="Home">
        <img src="{scrolled ? '/LogoforWhite.svg' : '/Logo.svg'}" alt="Pilot CX Logo" class="w-[190px] h-[46px] hover:scale-110 transition-all duration-300 ease-in-out" loading="lazy" />
        
            </a>
        <ul class="flex flex-row gap-5 justify-center items-center">
        
        {#each sections as section}
           <li class="hover:scale-110 transition-transform duration-300 ease-in-out text-lg">
            <a
                href="/#{section.id}"
                title={section.name}
                class="{scrolled ? 'text-dark-6': 'text-dark-1'}"
            >
                {section.name}
            </a>
            </li>
        {/each} 
        </ul> 
    
        <a href="/contact" class="{scrolled ? btnFilled : btnWhiteFilled} !py-[12px] !text-[17px]">Get a Quote</a>
    </nav>
    {/if}


 <!-- Nav Mobile --> 

  <nav class="flex lg:hidden flex-row justify-between items-center p-4 fixed w-full top-0 z-50 {scrolled ? 'backdrop-blur-lg bg-white/30': 'bg-transparent'} space-x-4">
     <a href="/">
      <img src="{scrolled ? '/LogoforWhite.svg' : '/Logo.svg'}" alt="Pilot CX Logo" class="w-[150px] h-[60px]" />
        </a>
     <div>
       
         <button {onclick} >
        <Menuicon class={scrolled ? 'text-light-blue-4': 'text-dark-1'} /> </button>
        {#if menu} 
         
         <ul class="flex flex-col w-[100%] absolute top-16 p-2 right-0 
         z-100 gap-2 justify-center items-start pl-4 {scrolled ? 'bg-dark-1': 'bg-[#2e86c7]'}">
         
        {#each mobileSections as section}
        <li transition:slide|global>
            <a
                href="/{section.id}"
                title={section.name}
                class="{scrolled ? 'text-dark-6': 'text-dark-1'} transition-transform duration-300 ease-in-out hover:scale-125"
              {onclick}>
                {section.name} 
            </a>
            </li>
        {/each}  
        </ul>
       
         
        {/if}

        


     </div>
  </nav>