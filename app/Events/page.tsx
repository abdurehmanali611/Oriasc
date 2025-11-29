import EventsList from "@/components/EventsList";
import Hero from "@/components/Hero";
import { events } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};

export default function Events() {
    return <div>
        <Hero title="Events" breadcrumbs={[
            {label: "Pages"},
            {label: "Events"}
        ]}/>
        <EventsList events={events}/>
    </div>
}