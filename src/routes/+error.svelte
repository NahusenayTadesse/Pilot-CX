<script> 
 import {page} from '$app/state';
	import { btnWhiteFilled } from '$lib/global.svelte';
 import RiveAnimation from '$lib/RiveAnimation.svelte';
 
 let riveInstance;
</script>

<div style="background-image: url('/icons/hero-background.webp')" 
class="relative h-screen w-full bg-cover bg-no-repeat  flex flex-col justify-center items-center bg-[#2e86c7] gap-4 pt-32" >
   <!-- <h1 class="text-center lg:!text-8xl text-dark-1">{page.status}</h1>
   <h3 class="text-white">Error: {page.error?.message}</h3>
    <a href="/" class="{btnWhiteFilled} animate-bounce"> Go Back Home</a> -->

   <div class="absolute w-full h-full p-0 z-10">
        <RiveAnimation src="/animations/404_not_found.riv" {riveInstance} />
</div>
      

</div>

