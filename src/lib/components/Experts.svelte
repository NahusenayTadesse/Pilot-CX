 <script lang='ts'>
	import RiveAnimation from '$lib/RiveAnimation.svelte';
   

   let river: any = $state(null);

    import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement | null = $state(null);
  let numberInput: any                 = $state(null);
  let riveInstance: any                = $state(null);

  onMount(async () => {
    if (!browser) return;

    const { Rive, Layout, Fit, Alignment } = await import('@rive-app/canvas');

    river = new Rive({
      src: '/animations/paper_plane_how_it_works_2.riv',
      canvas: canvas!,
      autoplay: true,
      stateMachines: ['State Machine 1'],
      layout: new Layout({
        fit: Fit.Cover,
        alignment: Alignment.Center,
      }),
      onLoad: () => {
        river.resizeDrawingSurfaceToCanvas();

        const sm = river.stateMachineInputs('State Machine 1');
        console.log('All inputs:', sm);
        sm.forEach((i: any) => console.log('input name =', i.name, 'type =', i.type));

         numberInput = sm.find((i: any) => i.name === 'Scroll');

        if (!numberInput) console.error('"Numbers" input not found');
      },
    });

    // scroll handler
    function updateScroll() {
      const pct = window.scrollY /
                  (document.body.scrollHeight - window.innerHeight);
        console.log('Pct: ', pct)
      if (numberInput) numberInput.value = ((pct-0.25)/(0.52-0.25))*100;
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll(); // initial value

    // cleanup returned from onMount, not from onLoad
    return () => {
      window.removeEventListener('scroll', updateScroll);
      river?.cleanup();
    };
  });



 

 </script>


{#snippet steps(picture, title, titlespan, description, orientation)}

  <div 
  class="flex {orientation ? 'lg:flex-row': 'lg:flex-row-reverse'} 
  flex-wrap flex-col items-center justify-between lg:w-[80%] w-full gap-0">
    <div class="lg:w-1/2 w-full
     {orientation ? '':'flex lg:items-end lg:justify-end items-center justify-center'}">
        <img src={picture} alt={titlespan} class="lg:w-[434px] w-full h-full lg:h-[442px] object-cover"
       />
       
    
    </div>
    <div class="lg:w-1/2 w-full flex flex-col gap-2 items-center lg:items-start">
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

<section class="relative flex flex-col items-center justify-center w-full gap-2 p-4">
   <button class="absolute -top-72 z-0 w-full lg:block hidden" 

     >
<RiveAnimation src="/animations/paper_plane_for_exper_section_loop_.riv" {riveInstance}  />
</button>
<button class="absolute -top-2 z-0 lg:hidden block" 

     >
<RiveAnimation src="/animations/paper_expert_mobile.riv" {riveInstance}  />
</button>
    
    
    <div class="relative flex flex-col lg:h-[50vh] mt-8 pb-8">
      
     
     <h1 class="text-[96px] text-dark-6 text-center">Experts On <span class="text-light-blue-4">Saas</span> Technology</h1>
     </div>
     <div class="flex flex-col">
        <h2 class="text-dark-6">How it Works<span class="text-light-blue-4">?</span></h2>
     </div>
   <div class="relative flex flex-col items-center justify-center w-full gap-2 p-4">
     
      
          <canvas bind:this={canvas} class="w-full -z-1 h-full absolute lg:block hidden" ></canvas> 

           
     {@render steps('/images/step1.svg', 'Step 1', 'Understand Your Needs', 
     "We start with a quick 30-minute call to learn about your product and support goals. Within 48 hours, you'll get a tailored proposal with clear pricing and a CX strategy built around your needs.", true)}
     {@render steps('/images/step3.svg', 'Step 2', 'Strategy Meets Structure', 
     'We host a kickoff call to align on support tone, tools, expected volume, workflows, and success metrics—making sure we’re fully synced before launch. ', false)}
     
      {@render steps('/images/step4.svg', 'Step 3', 'Your Brand, Our Agents', 
        'Our team gets trained on your tools, product, and brand tone. We prepare fast but thoroughly to ensure agents are ready to deliver on day one. ', true
     )}
     
     {@render steps('/images/steps5.svg', 'Step 4', 'Test and Launch', 
     'We run a 24-hour dry run with real tickets so you can review quality. Once ready, we go live—providing full support while tracking performance and improving continuously.', false)}
     
     </div>

    



</section>



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