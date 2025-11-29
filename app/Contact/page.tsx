import ContactForm from "@/components/ContactForm"
import Hero from "@/components/Hero"

const metadata = {
    title: "Contact Us - ORIASC",
    description: "GET IN TOUCH WITH US"
}
export default function Contact() {
    return <div>
        <Hero title="Contact" breadcrumbs={[
            {label: "Pages"},
            {label: "Contact"}
        ]}/>
        <ContactForm />
    </div>
}