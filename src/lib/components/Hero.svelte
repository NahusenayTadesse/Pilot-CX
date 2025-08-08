<script>
	import { btnFilled, btnWhiteFilled, btnWhiteHallow } from "$lib/global.svelte";
    import RiveAnimation from "$lib/RiveAnimation.svelte";
    let riveInstance;

</script>

<section class="lg:h-[100vh] h-[80vh] flex lg:pt-[0px] pt-[40px] justify-center items-center min-h-[70vh]text-white text-center bg-[#2e86c7]">
    <div class="mx-auto z-2">
        <h1 class="mb-4 font-bold font-sans text-dark-1">
            With PilotCX You Navigate <br class="hidden lg:flex" /> Customer Experience with Ease
        </h1>
        <p class="text-[17px] font-Inter text-dark-2 mb-8 lg:w-[649px] justify-self-center">
            While you focus on building product and hitting growth milestones, PilotCX keeps your support smooth, responsive, and always on course.
        </p>
        <div class="flex flex-row justify-center gap-[26px]">
            <a href="/contact" class= {btnWhiteFilled}>
                Get a Quote
            </a>
            <a href="#about" class="lg:{btnWhiteHallow} {btnFilled}">
                Learn More
            </a>
        </div>
    </div>

    
</section>
<button class="absolute top-0 left-0 z-0 w-full h-full hidden lg:block"  >



<RiveAnimation src="/animations/paper_plane_loop.riv" {riveInstance}  />
</button>
<button class="absolute top-48 left-0 z-1 lg:hidden block"  >



<RiveAnimation src="/animations/paper_hero_mobile.riv" {riveInstance}  />
</button>

<style>
    section {
         background-image: url('$lib/assets/hero-background.webp');
         background-size: cover;
         background-position: center;
    }
</style>
