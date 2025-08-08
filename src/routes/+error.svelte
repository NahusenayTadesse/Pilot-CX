<script> 
 import {page} from '$app/state';
 import RiveAnimation from '$lib/RiveAnimation.svelte';
 
 let riveInstance;
</script>

<div style="background-image: url('/images/quotebg.webp')" 
class="bg-cover bg-no-repeat lg:h-[100vh] h-[35vh] flex flex-col justify-center items-center bg-[#2e86c7" >
   <h1 class="text-center lg:!text-8xl text-dark-1">{page.status}</h1>
   <p class="text-white">Error: {page.error?.message}</p>
   {#if page.status === 404}
   <div class="w-1/3 p-0 z-10">
        <RiveAnimation src="/animations/error_404_page.riv" {riveInstance} animations = {["hamsters MOVE", "hamsters ENTRY"]}/>
</div>
{/if}

</div>

