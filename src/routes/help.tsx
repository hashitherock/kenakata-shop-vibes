import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help centre — Kenakata" },
      { name: "description", content: "Answers about delivery, returns, payments and orders at Kenakata." },
      { property: "og:title", content: "Help centre — Kenakata" },
      { property: "og:description", content: "Delivery, returns and order questions answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Help,
});

const faqs = [
  { id: "delivery", q: "How long does delivery take?", a: "Orders in Dhaka usually arrive in 2–4 days; elsewhere in Bangladesh 3–6 days. Delivery is free over ৳3,000, otherwise ৳80." },
  { id: "returns", q: "What is the return policy?", a: "Unused items in original packaging can be returned within 7 days of delivery. Hygiene products cannot be returned once opened." },
  { id: "payment", q: "Which payment methods are accepted?", a: "This is a demo storefront — no payments are taken. A live store would typically support cards, mobile wallets and cash on delivery." },
  { id: "track", q: "How do I track my order?", a: "Order tracking is not available in this demo." },
];

function Help() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Help centre</h1>
      <p className="mt-2 text-muted-foreground">Quick answers to common questions.</p>
      <Accordion type="single" collapsible className="mt-8 rounded-3xl border bg-card px-6">
        {faqs.map((f) => (
          <AccordionItem key={f.id} value={f.id} id={f.id}>
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
