<script>
	import { enhance } from "$app/forms";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { CircleAlert, CircleCheck, LoaderCircle, Reply, Trash } from "lucide-svelte";
	import { fly, fade } from "svelte/transition";

  let { data, form } = $props();

  let searchQuery = $state('');
  let allQuotes    = $derived(data.allquotes);

  // reactive filtered list
  let filteredQuotes = $derived(
    searchQuery.trim()
      ? allQuotes.filter(q => {
          const term = searchQuery.toLowerCase();
          return (
            (q.id        && q.id.toString().toLowerCase().includes(term)) ||
            (q.firstName && q.firstName.toLowerCase().includes(term)) ||
            (q.lastName  && q.lastName.toLowerCase().includes(term)) ||
            (q.email     && q.email.toLowerCase().includes(term)) ||
            (q.phone     && q.phone.toLowerCase().includes(term))
          );
        })
      : allQuotes
  );

  


  function onsubmit(){
        loading = true;

         setTimeout(() => {
        open = false;
      }, 1000);
        
     }
     let loading = $state(false)
      let visible = $state(false);
 let errorVisible = $state(false);
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
 let open = $state(false);

</script>

<input
  type="text"
  placeholder="Search Quotes"
  class="fixed top-4 right-4 px-4 py-2 w-64 text-gray-800 bg-white rounded-md shadow-lg
         focus:outline-none focus:ring-2 focus:ring-light-blue-4 focus:bg-light-blue-1 focus:ring-opacity-75
         transition-shadow duration-300"
  bind:value={searchQuery}
/>

{#await data.allquotes}

 <div class="w-full h-full flex flex-col justify-center items-center">
<LoaderCircle class="animate-spin w-32 h-32" />
</div>
 
{:then allquotes} 
{#if filteredQuotes?.length === 0}
 
 <h3>No Quotes Found</h3>
{/if}
  <div class="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center overflow-y-auto">
  {#each filteredQuotes as quote}
    <div class="flex flex-col p-4 rounded-lg shadow-md gap-2 bg-light-blue-1" transition:fade>
      <p>Name: {quote.firstName} {quote.lastName}</p>
      <a href="mailto:{quote.email}">Email: {quote.email}</a>
      <a href="tel:{quote.phone}">Phone: {quote.phone}</a>
      <p>Submission Date: {new Date(quote.submittedAt).toLocaleDateString()}</p>
      <a href="/dashboard/quotes/{quote.id}" 
      class="bg-light-blue-4 text-dark-1 w-1/2 text-center rounded-2xl p-2 flex flex-row gap-2 hover:scale-110 transition-all ease-in-out duration-300">
<Reply />      Reply to Quote</a>
      <AlertDialog.Root bind:open >
  <AlertDialog.Trigger 
  class="bg-red-500 p-2 w-1/4 text-white text-center rounded-2xl flex flex-row gap-2 justify-center items-center hover:scale-110 transition-all ease-in-out duration-300">
  <Trash size="20" /> Delete</AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete the quote from the database. 
        The email will be saved in the email server though.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
       <form action="?/delete" method="POST" use:enhance  {onsubmit}>
        <input type="hidden" value={quote.id} name="id">
       
       
      <AlertDialog.Action 
      class="bg-red-500 p-2  text-white text-center flex flex-row gap-2 justify-center items-center"
     
      type='submit'

      ><Trash /> Delete</AlertDialog.Action>
      </form>
      
 
      
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
   
    </div>
    
  {/each}
</div>
{/await}





 {#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold"> {form?.message}</h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.error}.</h6>
  </div>
{/if}