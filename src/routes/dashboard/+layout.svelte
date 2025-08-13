<script lang="ts">
    let { data, children } = $props();
    import {page} from '$app/state';
      import { MessageSquare, Inbox, NotebookPen, Megaphone, LogOut, X, AlignJustify, House } from 'lucide-svelte';


    import { LayoutDashboard, Quote, MessageSquareQuote } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

let currentPage = $state(page.url.pathname.charAt(1).toUpperCase() + page.url.pathname.slice(2));


  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Quotes', href: '/dashboard/quotes', icon: Quote},
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquareQuote },
    { name: 'Blogs', href: '/dashboard/blogs', icon: NotebookPen },
    { name: 'Annoucement', href: '/dashboard/announcement', icon: Megaphone }
  ];
    let sidebar = $state(false);
    let submitting = $state(false);

    function onsubmit() {
        submitting = true;
    }
  
    let open = $state(false);
        let  Menuicon = $derived (open ? X : AlignJustify);


</script>

<div class="lg:flex h-screen hidden">
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
    pb-8">
       <a href="/" title="Home">
        <img src="{sidebar ? '/Logo.svg': '/favicon.svg'}" alt="Pilot CX Logo" >
        </a>
       
        
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




<main class="flex flex-col p-2 flex-1 {sidebar ? 'ml-[250px]' : 'ml-[80px]'} pb-16 transition-all duration-300 ease-in-out">
  <header class="relative transition-transform duration-300 shadow-md rounded-lg p-4 flex flex-row gap-2 justify-center items-center gap-4">

    <MessageSquare class="w-6 h-6 text-light-blue-5" />
  
      <p class="text-sm text-gray-500">Replies</p>
      <p class="text-2xl font-semibold text-gray-900">{data?.replyCount.length}</p>
  
    <Inbox class="w-6 h-6 text-red-500" />
    
      <p class="text-sm text-gray-500">Unreplied Quotes</p>
      <p class="text-2xl font-semibold text-gray-900">{data?.unrepliedCount.length - data?.replyCount.length}</p>

      <form method="post" action="/dashboard/?/logout" use:enhance {onsubmit} id="logoutForm">
    <button type="submit" name="logout" class="absolute right-4 top-4 flex flex-row gap-2 items-center justify-center" disabled={submitting}>
         <LogOut class="{submitting ? 'animate-spin': ''} w-4 h-4" />
        {submitting ? "Logging out..." : "Logout"}
    </button>
</form>
   
  
  </header>
       <div class="p-8">
         {@render children()}
            </div>
    </main>
</div>
<!-- Mobile Bottom Menu -->
<section class="lg:hidden flex flex-col p-0">
  <button onclick={()=>open = !open} class="fixed top-2 left-4"><Menuicon /></button>
  {#if open} 

  <form method="post" action="/dashboard/?/logout" class="fixed left-4 top-12 p-2 z-100 bg-white w-1/2" use:enhance {onsubmit} transition:slide|global>
        <a href="/" class="flex flex-row gap-2"><House class="w-4 h-4" /> Home</a>

    <button type="submit" name="logout" class="flex flex-row gap-2 items-center justify-center" disabled={submitting}>
         <LogOut class="{submitting ? 'animate-spin': ''} w-4 h-4" />
        {submitting ? "Logging out..." : "Logout"}
    </button>
</form>
{/if}
   
  <div class="pt-16 py-24 px-4">
  
   {@render children()}
   </div>

<div class="grid lg:hidden grid-cols-5 gap-2 fixed bottom-0 z-100 w-full bg-light-blue-4 justify-center items-center align-center p-2">


  {#each navItems as item}

    <a href={item.href} class="flex flex-col gap-1 text-white justify-center items-center">
   
    <item.icon size="18" />
    <p class="text-[8px] tex-white">{item.name}</p>
    

    </a>
  {/each}
  
</div>

</section>
 

   

