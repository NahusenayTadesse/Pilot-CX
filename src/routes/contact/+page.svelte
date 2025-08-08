<script>
	import { enhance } from "$app/forms";
	import { btnFilled } from "$lib/global.svelte";

	import { LoaderCircle,CircleCheck,CircleAlert } from "lucide-svelte";
	import { fly } from "svelte/transition";
        import { goto } from '$app/navigation';


    let loading = $state(false);

    


    let {  form } = $props();




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
         goto('/');
      }, 2000);
       



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
{#snippet labels(labels, fors)}
  <label for = {fors} class="block mb-2 text-[17px] text-gray-700">{labels}</label>
{/snippet}
{#snippet inputs(placeholder, name, type)}
  <input {type} {name} {placeholder} 
  class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1">
  {/snippet}

{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Thank you for submitting! We will get back to you soon.</h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! {form?.error}.</h6>
  </div>
{/if}


<div style="background-image: url('/images/quotebg.webp')" 
class="bg-cover bg-no-repeat lg:h-[60vh] h-[35vh] flex flex-col justify-center items-center bg-[#2e86c7" >
   <h1 class="text-center text-dark-1">Get a Quote</h1>
</div>


<form
    class="lg:w-2/3 w-4/5 justify-self-center my-8 p-8rounded-xl font-sans grid lg:grid-cols-2 grid-cols-1 gap-4"
    method="POST" id="quoteForm" 
    use:enhance 
    {onsubmit}
>

        
  
   <div>
    {@render labels('First Name', 'firstName')}
    {@render inputs('John', 'firstName', 'text')}
    
    </div>
      <div>
      {@render labels('Last Name', 'lastName')}
      {@render inputs('Doe', 'lastName', 'text')}

    </div>
   <div>
          {@render labels('Work Email', 'email')}

        {@render inputs('john@example.com', 'email', 'email')}

    </div>
    
     <div>
      {@render labels('Phone Number', 'phone')}

      {@render inputs('+2510000000', 'phone', 'tel')}

    </div>
     
    <div>
      {@render labels('How many Team members do you need?', 'numberOfTeams')}

      {@render inputs('0', 'numberOfTeams', 'number')}
    </div>  
     <div>
      {@render labels('Do you have an existing support team?', 'existingTeam')}
      <div class="flex flex-row gap-2">
      <input type="radio" name="existingTeam" value="yes" class="form-radio text-light-blue-4 focus:ring-light-blue-4 scale-150">
    <span>Yes</span>
    <input type="radio" name="existingTeam" value="no" class="form-radio text-light-blue-4 focus:ring-light-blue-4 scale-150">
    <span>No</span>
    </div>
    </div>  

      <div>
      {@render labels('How many tickets per week do you want?', 'ticketsPerWeek')}

      {@render inputs('0', 'ticketsPerWeek', 'number')}
    </div>  
    
      <div>
      {@render labels('How soon are you looking to start?', 'startDate')}

      {@render inputs('DD-MM-YYYY', 'startDate', 'date')}
    </div>      

    

    
  
    <div>
    {@render labels('Can you explain what you need?', 'details')}
    
    <textarea
        id="details"
        name="details"
        rows="4"
        required
        placeholder=" Explain what you need..."
        class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1"
    ></textarea>
     </div>
  
</form>

  <button
        type="submit"
        form="quoteForm"
        class="{btnFilled} justify-self-center flex flex-row justify-center items-center mb-8 gap-2"
         
    >   {#if loading}
        <LoaderCircle class="animate-spin" />
        {/if}

        Get My Quote    </button>

