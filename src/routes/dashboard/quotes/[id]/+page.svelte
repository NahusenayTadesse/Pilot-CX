<script lang="ts">
 let {data, form} = $props();
 import { enhance } from "$app/forms";

	import { LoaderCircle,CircleCheck,CircleAlert } from "lucide-svelte";
	import { fly } from "svelte/transition";

    let loading = $state(false);






 let visible = $state(false);
 let errorVisible = $state(false);

function onsubmit(){
        loading = true;
     }
     
    $effect(() => {
    if (form?.success) {
      loading = false;
      visible = true;
      const timer = setTimeout(() => {
        visible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });
   $effect(() => {
    if (form?.error) {
     errorVisible = true;
     loading = false;
      const timer = setTimeout(() => {
        errorVisible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });

  let headers = ['id', 'reply', 'date']

 
</script>
<div class="flex flex-col gap-4 overflow-y-auto">
<!-- Loading + Await Block -->
{#await data.singlequote}
  <!-- Loading Spinner -->
  <div class="flex justify-center items-center min-h-screen">
    <LoaderCircle class="w-8 h-8 animate-spin text-gray-500" />
    <span class="ml-2 text-gray-600">Loading quote...</span>
  </div>

{:then singlequote}
  <!-- Quote Display -->
  <div class="max-w-2xl lg:w-1/2 mx-auto p-6 bg-white rounded shadow-md mt-10">
    <h3 class="text-2xl font-bold mb-4">Quote Details</h3>

    <div class="space-y-2">
      <p><span class="font-semibold">Name:</span> {data.singlequote?.firstName} {data.singlequote?.lastName} </p>
      <p><span class="font-semibold">Email:</span> {data.singlequote?.email}</p>
      <p><span class="font-semibold">Phone:</span> {data.singlequote?.phone || 'N/A'}</p>
      <p><span class="font-semibold">Existing Teams:</span> {data.singlequote?.existingTeam || 'N/A'}</p>
      <p><span class="font-semibold">Number of Teams:</span> {data.singlequote?.numberOfTeams || 'N/A'}</p>
      <p><span class="font-semibold">Tickets Per Week:</span> {data.singlequote?.ticketsPerWeek || 'N/A'}</p>
      <p><span class="font-semibold">Start Date:</span> {new Date(data.singlequote?.startDate).toLocaleDateString() || 'N/A'}</p>
      <p><span class="font-semibold">Details:</span></p>  
      <p class="bg-gray-50 p-3 rounded border border-gray-200">{data.singlequote?.details}</p>
      <p class="text-sm text-gray-500 mt-4">
        Submitted At: {new Date(data.singlequote?.submittedAt).toLocaleString()}
      </p>
    </div>
  </div>


{:catch err}
  <!-- Error State -->
  <div class="flex flex-col justify-center items-center min-h-screen text-center text-red-600">
    <p class="text-lg font-semibold">Failed to load quote.</p>
    <p class="text-sm text-gray-500">{err.message}</p>
  </div>
{/await}


{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold"> Quote Successfully sent.</h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.error}.</h6>
  </div>
{/if}



<form
    class="lg:w-1/2 w-full items-center justify-center flex flex-col gap-4 mx-auto my-8 p-8 bg-white rounded-xl shadow-lg font-sans"
    method="POST" use:enhance 
    {onsubmit}
    
>

    <input type="email" name="email" hidden value={data.singlequote.email} id="">
    <input type="text" name="name" hidden value={data.singlequote.firstName} id="">
    <input type="text" name="quoteId" hidden value={data.singlequote.id} id="">
    
    <label for="reply" class="block mb-2 font-medium text-gray-700"><h3>Reply to Quote</h3></label>
    <textarea
        id="reply"
        name="reply"
        rows="4"
        required
        placeholder=""
        class="w-full p- h-48  mb-6 border border-gray-200 rounded-md bg-gray-50 text-base"
    ></textarea>

    <button
        type="submit"
        class="flex flex-row justify-center items-center gap-4 w-full p-3 bg-light-blue-4 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition"
     
    >   
       {#if loading}
        <LoaderCircle class="animate-spin text-white" />
        {/if}

        Reply
    </button>
</form>






{#await data.allReplies}
   <div class="flex justify-center items-center min-h-screen">
    <LoaderCircle class="w-8 h-8 animate-spin text-gray-500" />
    <span class="ml-2 text-gray-600">Loading quote...</span>
  </div>
{:then replies} 

 
<div class="flex flex-col gap-4 justify-center items-center">

  <h3 class="text-center">Reply History</h3>
  {#if data.allReplies.length === 0}
   <p>A reply hasn't been made yet</p>
   {:else}
   <table class="justify-self-center">
  <thead>
    <tr>
     {#each headers as head }
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-semibold text-gray-700
             dark:text-gray-300 uppercase tracking-wider relative"
            
            >
            <div class="flex flex-row">
              {head}
            </div>

              
          </th>
        {/each}

    </tr>
  </thead>
  <tbody>
    {#each Object.values(data.allReplies) as person, index} 
    
 
        <tr class="hover:bg-gray-50 dark:hover:bg-dark transition-colors duration-150"> 
          
      
        {#each Object.entries(person) as [key, value]}
          {#if key === 'isActive'}
          <td class="px-6 py-4 whitespace-nowrap text-sm  {value ? 'bg-green-400' : 'bg-red-400'} text-white">{value ? 'Active' : 'InActive'}</td>
          {:else if key === 'id'}
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{index + 1}</td>
         
          {:else if key === 'sentAt'}
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">
               {new Date(value).toLocaleDateString()}
            </td>
          {:else }
          
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200 capitalize">{value}</td>
                
         {/if}
        
          {/each}
          </tr>
          {/each}

  </tbody>
</table>
{/if}
</div>
{:catch err}
  <!-- Error State -->
  <div class="flex flex-col justify-center items-center min-h-screen text-center text-red-600">
    <p class="text-lg font-semibold">Failed to load Load History.</p>
    <p class="text-sm text-gray-500">{err.message}</p>
  </div>

  
{/await}

</div>