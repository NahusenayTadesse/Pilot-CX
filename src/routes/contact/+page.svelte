<script>
	import { enhance } from "$app/forms";

	import { LoaderCircle,CircleCheck,CircleAlert } from "lucide-svelte";
	import { fly } from "svelte/transition";

    let loading = $state(false);

    let { form } = $props();


 let visible = $state(false);
 let errorVisible = $state(false);

function onsubmit(){
        loading = true;
     }
     
    $effect(() => {
    if (form?.success) {
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
      const timer = setTimeout(() => {
        errorVisible = false;
      }, 5000);

      return () => {
        clearTimeout(timer);
      }
    }


  });



 
</script>


{#if visible}
  <div class="bg-green-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
   
    <CircleCheck class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Thank you for submitting! We will get back to you soon.</h6>
   </div>
{/if}

{#if errorVisible}
  <div class="bg-red-600 w-[400px] flex flex-row flex-wrap text-white fixed bottom-2 right-1 rounded-md p-4" transition:fly={{ x: 200, duration: 500 }}>
    
    <CircleAlert class="text-white justify-self-center w-8 h-8" />
    <h6 class="text-white font-bold">Oops! Something went wrong. Please try again later.</h6>
  </div>
{/if}



<form
    class="max-w-lg mx-auto my-8 p-8 bg-white rounded-xl shadow-lg font-sans"
    method="POST" use:enhance
>
    <h2 class="mb-6 text-3xl font-bold text-gray-800 text-center">Get a Quote</h2>

        
  

    <label for="name" class="block mb-2 font-medium text-gray-700">Full Name</label>
    <input
        id="name"
        name="name"
        type="text"
        required
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="email" class="block mb-2 font-medium text-gray-700">Email Address</label>
    <input
        id="email"
        name="email"
        type="email"
        required
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="company" class="block mb-2 font-medium text-gray-700">Company Name</label>
    <input
        id="company"
        name="company"
        type="text"
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="phone" class="block mb-2 font-medium text-gray-700">Phone Number</label>
    <input
        id="phone"
        name="phone"
        type="tel"
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="service" class="block mb-2 font-medium text-gray-700">Service Needed</label>
    <select
        id="service"
        name="service"
        required
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    >
        <option value="" disabled selected>Select a service</option>
        <option value="customer-support">Customer Support Outsourcing</option>
        <option value="tech-support">Technical Support Outsourcing</option>
        <option value="back-office">Back Office Outsourcing</option>
        <option value="sales">Sales Outsourcing</option>
        <option value="other">Other</option>
    </select>

    <label for="budget" class="block mb-2 font-medium text-gray-700">Estimated Budget (USD)</label>
    <input
        id="budget"
        name="budget"
        type="number"
        min="0"
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="timeline" class="block mb-2 font-medium text-gray-700">Project Timeline</label>
    <input
        id="timeline"
        name="timeline"
        type="text"
        placeholder="e.g. 3 months, ASAP"
        class="w-full p-3 mb-5 border border-gray-200 rounded-md bg-gray-50 text-base"
    />

    <label for="details" class="block mb-2 font-medium text-gray-700">Project Details</label>
    <textarea
        id="details"
        name="details"
        rows="4"
        required
        placeholder="Describe your requirements, goals, and expectations"
        class="w-full p-3 mb-6 border border-gray-200 rounded-md bg-gray-50 text-base"
    ></textarea>

    <button
        type="submit"
        class="flex flex-row justify-center items-center gap-4 w-full p-3 bg-light-blue-4 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        {onsubmit}
    >   {#if loading}
        <LoaderCircle class="animate-spin" />
        {/if}

        Request Quote
    </button>
</form>
