import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const FAQ = () => {
  return (
    <section className="px-4 mt-24 lg:px-0">
      <h1 className="text-5xl font-bold text-center text-transparent bg-gradient-to-tl from-primary-color to-slate-700 bg-clip-text">
        FAQ
      </h1>

      <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value="item-1" className="px-6 shadow-lg">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
