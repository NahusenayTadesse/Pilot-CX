<script>

    let {data} = $props();

 
</script>
 
<div class="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center overflow-y-auto">
  {#each data.allquotes as quotes}
   <div class="flex flex-col p-4 rounded-lg shadow-md gap-2 bg-light-blue-1">
   <p>Name: {quotes?.firstName} {quotes?.lastName}</p>
   <a href="mailto:{quotes?.email}"><p>Email: {quotes?.email}</p></a>
   <a href="tel:{quotes?.email}"><p>Phone: {quotes?.phone}</p></a>
   
   <p>Submission Date: {new Date(quotes?.submittedAt).toLocaleDateString()}</p>
   <a href="/dashboard/quotes/{quotes.id}" class ="text-light-blue-4">Reply to Quote</a>
    

    </div>
  {/each}
</div>


	

