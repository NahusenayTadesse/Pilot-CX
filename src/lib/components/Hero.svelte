<script>
	import { btnWhiteFilled, btnWhiteHallow } from "$lib/global.svelte";

</script>

<section class="h-[100vh] flex pt-[100px] justify-center items-start min-h-[70vh]text-white text-center">
    <div class="mx-auto">
        <h1 class="mb-4 font-bold font-sans text-dark-1">
            With PilotCX You Navigate <br /> Customer Experience with Ease
        </h1>
        <p class="text-[17px] font-Inter text-dark-2 mb-8 w-[649px] justify-self-center">
            While you focus on building product and hitting growth milestones, PilotCX keeps your support smooth, responsive, and always on course.
        </p>
        <div class="flex flex-row justify-center gap-[26px]">
            <a href="#about" class= {btnWhiteFilled}>
                Get a Quote
            </a>
            <a href="#about" class={btnWhiteHallow}>
                Learn More
            </a>
        </div>
    </div>
</section>

<style>
    section {
         background-image: url('$lib/assets/hero-background.webp');
         background-size: cover;
         background-position: center;
    }
</style>
