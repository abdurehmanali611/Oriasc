// components/ContactForm.tsx
'use client';

import SectionHeader from './SectionHeader';

export default function ContactForm() {
  
  return (
    <>
      {/* Contact Form Start */}
      <div className="w-full py-5">
        <div className="container mx-auto px-4 py-5 flex flex-col gap-10">
          <SectionHeader 
            subtitle="Get In Touch"
            title="Contact For Any Queries"
          />
          
        </div>
      </div>
      {/* Contact Form End */}
    </>
  );
}
