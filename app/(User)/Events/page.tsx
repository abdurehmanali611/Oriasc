import EventsList from "@/components/EventsList";
import { events } from "@/constants";

export default function Events() {
    return <div className="py-5">
        <EventsList events={events}/>
    </div>
}