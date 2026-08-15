import { Suspense } from "react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <ContactForm />
    </Suspense>
  );
}
