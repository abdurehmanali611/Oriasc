import EventItem from "./EventItem";

// components/EventsList.tsx
interface Event {
  date: string;
  time: string;
  title: string;
  description: string;
  image: string;
  delay: string;
  slug?: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <>
      {/* Events List Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <h1 
            className="text-6xl font-bold font-sans mb-5 wow fadeIn" 
            data-wow-delay="0.1s"
          >
            Upcoming <span className="text-[#10b982]">Events</span>
          </h1>
          
          {events.map((event, index) => (
            <EventItem 
              key={index}
              date={event.date}
              time={event.time}
              title={event.title}
              description={event.description}
              image={event.image}
              delay={event.delay}
              slug={event.slug}
            />
          ))}
        </div>
      </div>
      {/* Events List End */}
    </>
  );
}
