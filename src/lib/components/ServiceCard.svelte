<!-- src/lib/components/ServiceCard.svelte -->
<script>
 let { src, title, description} = $props();
</script>

<div class="animated-card bg-light-blue-1 flex flex-col items-start justify-start p-8 border border-light-2 rounded-[40px] lg:w-[400px] gap-2">
  <img {src} alt={title} class="w-[40px] h-[40px]" />
  <h5 class="text-dark-6 font-Inter text-[27px] font-[500]">{title}</h5>
  <p class="text-dark-4 text-[17px]">{description}</p>
</div>