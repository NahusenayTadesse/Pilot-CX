<script lang="ts">
    let { data, children } = $props();
    import {page} from '$app/state';

    import { LayoutDashboard, Quote, MessageSquareQuote } from '@lucide/svelte';

let currentPage = $state(page.url.pathname.charAt(1).toUpperCase() + page.url.pathname.slice(2));


  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Quotes', href: '/dashboard/quotes', icon: Quote},
    { name: 'Messages', href: '/dashboard/parents', icon: MessageSquareQuote }
   
  ];



  
  let sidebar = $state(true);


</script>

<div class="flex h-screen">
  <!-- Sidebar -->
  <aside class="{sidebar ? 'w-[250px]': 'w-[70px]'} 
  {sidebar ? 'min-w-[250px]': 'min-w-[70px]'} 
  h-screen inset-y-0 fixed 
  top-0 bottom-0 shadow-md p-2 
  bg-gradient-to-bl
   from-[#2e86c7] to-light-blue-3 
   transition-all duration-300 ease-in-out "
  
  onmouseenter={() => sidebar = true}
  onmouseleave={() => sidebar = false}
  >
    <div class="p-4 text-2xl font-bold flex flex-row justify-between gap-8 mb-8 
    pb-8 border-b-1 border-gray-500 dark:border-white mt-32">
      {#if sidebar === true}
       <a href="/dashboard">
        <img src="/Logo.svg" alt="Pilot CX Logo" >
        </a>
        
      {:else} 
       <a href="/dashboard">
        <img src="/favicon.svg" alt="Pilot CX Logo" >
        </a>
      {/if}
       
        
    </div>
    <nav class="mt-4 flex flex-col gap-4">
    {#each navItems as item}
      <a
        class="w-full flex flex-row items-center text-left text-dark-1 px-4 py-2  duration-100 gap-2
             rounded-lg hover:shadow-white hover:shadow-lg transition-all ease-in-out" 
             aria-current={page.url.pathname === item.href ? 'page' : undefined}
        class:selected={currentPage === item.name}
        href={item.href}
       title={item.name}> 
        <item.icon size="16" />

         {#if sidebar}
         <span> {item.name}</span>
        
         {/if}
      </a>
    {/each}
   </nav>
  </aside>

  <!-- Main Content -->


<main class="flex flex-col p-2 flex-1 w-full {sidebar ? 'ml-[250px]' : 'ml-[80px]'} pb-16 transition-all duration-300 ease-in-out">
            {@render children()}
    </main>
</div>



 

    

