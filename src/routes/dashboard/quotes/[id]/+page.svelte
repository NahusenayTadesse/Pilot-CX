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



</script>
<div class="flex flex-col gap-4 overflow-y-auto">
<!-- Loading + Await Block -->
{#await data}
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
      <p><span class="font-semibold">Name:</span> {data.singlequote?.name}</p>
      <p><span class="font-semibold">Email:</span> {data.singlequote?.email}</p>
      <p><span class="font-semibold">Company:</span> {data.singlequote?.company || 'N/A'}</p>
      <p><span class="font-semibold">Phone:</span> {data.singlequote?.phone || 'N/A'}</p>
      <p><span class="font-semibold">Service:</span> {data.singlequote?.service}</p>
      <p><span class="font-semibold">Budget:</span> ${data.singlequote?.budget || 'N/A'}</p>
      <p><span class="font-semibold">Timeline:</span> {data.singlequote?.timeline || 'N/A'}</p>
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
    
>

    <input type="email" name="email" hidden value={data.singlequote.email} id="">
    <input type="text" name="name" hidden value={data.singlequote.name} id="">
    <input type="text" name="quoteId" hidden value={data.singlequote.id} id="">
    
    <label for="reply" class="block mb-2 font-medium text-gray-700"><h3>Reply to Quote</h3></label>
    <textarea
        id="reply"
        name="reply"
        rows="4"
        required
        placeholder="Describe your requirements, goals, and expectations"
        class="w-full p- h-48  mb-6 border border-gray-200 rounded-md bg-gray-50 text-base"
    ></textarea>

    <button
        type="submit"
        class="flex flex-row justify-center items-center gap-4 w-full p-3 bg-light-blue-4 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        {onsubmit}
    >   
       {#if loading}
        <LoaderCircle class="animate-spin text-white" />
        {/if}

        Reply
    </button>
</form>


</div>