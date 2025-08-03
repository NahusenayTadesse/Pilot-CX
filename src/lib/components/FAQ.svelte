<script lang="ts">
 import * as Accordion from "$lib/components/ui/accordion/index.js";

 let accordionItems = {
   "item-1": {
     question: "What kind of customer support does PilotCX offer?",
     answer: "We provide live chat and email support handled by trained agents who understand SaaS tools, workflows, and user expectations."
   },
   "item-2": {
     question: "How quickly can you get started with our product?",
     answer: "Our onboarding process is designed to be quick and efficient, allowing you to start using our product within hours, not days."
   },
   "item-3": {
     question: "Is PilotCX only for SaaS companies?",
     answer: "While we specialize in SaaS, our support services can be tailored to any tech company looking to enhance their customer experience."
   },
   "item-4": {
     question: "Will your team sound like part of our company?",
    answer: "Absolutely. Our agents are trained to match your brand’s tone and style, ensuring seamless communication that feels like an extension of your own team."
   }
 };
</script>
 <section class="flex flex-col items-center justify-center gap-8 p-8">
  <h2 class="text-dark-6 text-center"> <span>F</span>requently <span>A</span>sked <span>Q</span>uestions</h2>
  <p class="text-dark-4 text-center max-w-[600px]">
 If You have any more questions you can contact our team <span>Here</span> We will be happy to answer any inquires  </p>
<Accordion.Root type="single" class="w-full sm:max-w-[70%] flex flex-col gap-8" value="item-1">

 {#each Object.entries(accordionItems) as [value, { question, answer }] }
 <Accordion.Item value={value}>
    <Accordion.Trigger>{question}</Accordion.Trigger>
  <Accordion.Content class="flex flex-col gap-4 text-balance">
   <p>
    {answer}
   </p>
  </Accordion.Content>
 </Accordion.Item>
    {/each}
</Accordion.Root>
</section>


<style>

    span {
        color: var(--color-light-blue-4)
    }
</style>