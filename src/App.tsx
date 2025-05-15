import { Accordion } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

function App() {

  return (
    <div className="flex items-start justify-start min-h-svh dark:bg-slate-950 bg-slate-100 p-8">
      <Accordion type="multiple" className="w-[350px] space-y-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition hover:underline">
            Personal Details
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden mt-2 transition-all duration-300 ease-in-out data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            Enter personal details here.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition hover:underline">
            Education
          </AccordionTrigger>
          <AccordionContent className=" overflow-hidden mt-2 transition-all duration-300 ease-in-out data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            Enter education here.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition hover:underline">
            Work Experience
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden mt-2 transition-all duration-300 ease-in-out data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            Enter work experience here.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default App