<script>
	import { enhance } from "$app/forms";
	import { btnFilled, disabled } from "$lib/global.svelte";

	import { LoaderCircle,CircleCheck,CircleAlert } from "lucide-svelte";
	import { fly } from "svelte/transition";
        import { goto } from '$app/navigation';
        import { onMount } from 'svelte';
  import intlTelInput from 'intl-tel-input';
   import 'intl-tel-input/build/css/intlTelInput.css';



    let loading = $state(false);

    


    let {  form } = $props();




 let visible = $state(false);
 let errorVisible = $state(false);


     
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


  let inputElement = $state();
  let iti = $state();
  let countryCode = $state();


  onMount(() => {
    iti = intlTelInput(inputElement, {
      initialCountry: 'auto',
      separateDialCode: true,
      geoIpLookup: function (callback) {
        fetch('https://ipapi.co/json')
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback('us'));
      },
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
        
      
  
    });
    countryCode = iti.getSelectedCountryData().dialCode;
    
    // 2. Listen for the 'countrychange' event
      inputElement.addEventListener('countrychange', () => {
      countryCode = iti.getSelectedCountryData().dialCode;
      console.log(`Country changed, new dial code: ${countryCode}`) });
    
    return () => {
      iti.destroy();
    };
  });

  function onsubmit(){
        loading = true;
      // e.g. +251912345678
    }
  
  let phoneNumber = $state('');
 
  function isValidLocalNumber(phoneNumber) {
  if (!phoneNumber) {
    return '';
  }
  
  if (!/^\d+$/.test(phoneNumber)) {
    return 'Phone number must contain only digits.';
  }

  if (phoneNumber.length < 6) {
    return 'Phone number is too short.';
  }

  if (phoneNumber.length > 15) {
    return 'Phone number is too long.';
  }

  // If all checks pass, return empty string (no error)
  return '';
}

  function checkEmailDomain(email) {
  const commonDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
    'icloud.com', 'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com'
  ];

  if (!email ) {
    return "";
  }
  if(!email.includes('@')) {
    return "Please enter a valid email address"
  }

  const domain = email.trim().split('@')[1].toLowerCase();

  if (commonDomains.includes(domain)) {
    return `Emails from ${domain} are not allowed. Please use your custom domain email.`;
  }

  return '';
}
      // You can now use the 'fullNumber' variable for your form dat



 let email = $state('');

 function isValidContact(phoneNumber, email) {
  const phoneValidation = isValidLocalNumber(phoneNumber);
  const emailValidation = checkEmailDomain(email);
  
  return phoneValidation === '' && emailValidation === '';
}

 

 
</script>
{#snippet labels(labels, fors)}
  <label for = {fors} class="block mb-2 text-[17px] text-gray-700">{labels}</label>
{/snippet}
{#snippet inputs(placeholder, name, type)}
  <input {type} {name} {placeholder} required
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
        <input type='email'  name="email" placeholder='john@example.com' 
  class="w-full p-3 mb-5 border-1 border-gray-200 rounded-md
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1" 
   bind:value={email} 
   required
   onchange={()=>checkEmailDomain(email)}
   >
          {#if checkEmailDomain(email)}

        <p class="text-red-500">{checkEmailDomain(email)}</p> 
        {/if}

    
       

    </div>
    
     <div>
      {@render labels('Phone Number', 'phone')}
  <input 
    type="hidden" 
    name="country_code" 
    required
    bind:value={countryCode} 
  />
      <input type="tel"
       bind:this={inputElement} 
       bind:value={phoneNumber} 
       onchange = {()=>isValidLocalNumber(phoneNumber)}
       class="phone-input w-[100%] p-3 mb-5 border-1 border-gray-200 rounded-md
   bg-gray-50 text-base focus:ring-light-blue-4 focus:ring-1 focus:outline-none focus:bg-light-blue-1"  placeholder="00000000" name="phone"/>
   

   {#if isValidLocalNumber()}

        <p class="text-red-500">{isValidLocalNumber(phoneNumber)}</p> 
        {/if}
  </div>
     
    <div>
      {@render labels('How many Team members do you need?', 'numberOfTeams')}

      {@render inputs('0', 'numberOfTeams', 'number')}
    </div>  
     <div>
      {@render labels('Do you have an existing support team?', 'existingTeam')}
      <div class="flex flex-row gap-2">
      <input type="radio" required name="existingTeam" value="yes" class="form-radio text-light-blue-4 focus:ring-light-blue-4 scale-150">
    <span>Yes</span>
    <input type="radio" required name="existingTeam" value="no" class="form-radio text-light-blue-4 focus:ring-light-blue-4 scale-150">
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
        disabled={!isValidContact(phoneNumber, email)}
        class="{isValidContact(phoneNumber, email) ? btnFilled: disabled} justify-self-center flex flex-row justify-center items-center mb-8 gap-2"
         title = {isValidContact(phoneNumber, email) ? 'Get My Qoute': 'Please make sure every field is correct'}
    >   {#if loading}
        <LoaderCircle class="animate-spin" />
        {/if}

        Get My Quote    </button>

<style>
 :global(.iti) {
    width: 100% !important;
  }

:global(.iti__search-input) {
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-dark-6);
    font-size: 0.875rem;
    width: calc(100% - 1rem);
    margin: 0.5rem;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }

  :global(.iti__search-input:focus) {
    outline: none;
    border-color: var(--color-light-blue-4); /* Tailwind's light-blue-400 */
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.5); /* Tailwind ring-light-blue-4 */
  }

  :global(.iti__country-list) {
    max-height: 250px;
    border-radius: 0.375rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    background-color: white;
    font-size: 0.875rem;
  }

  :global(.iti__country) {
    padding: 0.5rem 1rem;
  }

  :global(.iti__country:hover),
  :global(.iti__country.iti__highlight) {
    background-color: #f0f9ff;
  }

  :global(.iti__flag) {
    transform: scale(1.25);
    transform-origin: left center;
  }
  
</style>